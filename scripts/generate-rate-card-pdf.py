from __future__ import annotations

import shutil
import subprocess
import tempfile
import time
import urllib.request
from pathlib import Path

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public/downloads/grille-tarifaire-isaure-lohest.pdf"
PORT = 4331
DOCUMENT_URL = f"http://127.0.0.1:{PORT}/grille-tarifaire-isaure-lohest.html"


def chrome_executable() -> str:
    candidates = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        shutil.which("google-chrome"),
        shutil.which("chromium"),
        shutil.which("chromium-browser"),
    ]
    for candidate in candidates:
        if candidate and Path(candidate).is_file():
            return candidate
    raise RuntimeError("Google Chrome ou Chromium est requis pour générer le PDF.")


def wait_for_preview(timeout: float = 20) -> None:
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        try:
            with urllib.request.urlopen(DOCUMENT_URL, timeout=1) as response:
                if response.status == 200:
                    return
        except Exception:
            time.sleep(0.25)
    raise RuntimeError("Le serveur de prévisualisation Astro n'a pas démarré à temps.")


def stop_process(process: subprocess.Popen[bytes]) -> None:
    if process.poll() is not None:
        return
    process.terminate()
    try:
        process.wait(timeout=5)
    except subprocess.TimeoutExpired:
        process.kill()
        process.wait(timeout=5)


def build() -> None:
    subprocess.run(["npm", "run", "build"], cwd=ROOT, check=True)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    preview = subprocess.Popen(
        ["npm", "run", "preview", "--", "--port", str(PORT), "--host", "127.0.0.1"],
        cwd=ROOT,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )

    try:
        wait_for_preview()
        with tempfile.TemporaryDirectory(prefix="grille-tarifaire-") as temp_dir:
            temp_path = Path(temp_dir)
            generated_pdf = temp_path / OUTPUT.name
            chrome = subprocess.Popen(
                [
                    chrome_executable(),
                    "--headless=new",
                    "--disable-gpu",
                    "--no-pdf-header-footer",
                    "--run-all-compositor-stages-before-draw",
                    "--virtual-time-budget=3000",
                    f"--user-data-dir={temp_path / 'chrome-profile'}",
                    f"--print-to-pdf={generated_pdf}",
                    DOCUMENT_URL,
                ],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )

            try:
                deadline = time.monotonic() + 30
                while time.monotonic() < deadline:
                    if generated_pdf.exists() and generated_pdf.stat().st_size > 50_000:
                        break
                    if chrome.poll() is not None:
                        break
                    time.sleep(0.25)
            finally:
                stop_process(chrome)

            if not generated_pdf.exists():
                raise RuntimeError("Chrome n'a pas produit le PDF attendu.")

            reader = PdfReader(generated_pdf)
            if len(reader.pages) != 4:
                raise RuntimeError(f"Le PDF généré contient {len(reader.pages)} pages au lieu de 4.")

            shutil.copy2(generated_pdf, OUTPUT)
    finally:
        stop_process(preview)

    print(OUTPUT)


if __name__ == "__main__":
    build()
