// Récepteur de webhook Sanity, exécuté sur le VPS (service systemd portfolio-hook).
// POST /hooks/sanity avec l'en-tête « Authorization: Bearer <HOOK_SECRET> » → build + mise en ligne.
// Plusieurs publications rapprochées : une seule reconstruction en cours, une seule en attente.
import http from 'node:http';
import { spawn } from 'node:child_process';
import { timingSafeEqual } from 'node:crypto';

const SECRET = process.env.HOOK_SECRET;
if (!SECRET) throw new Error('HOOK_SECRET manquant');
const SCRIPT = '/opt/portfolio-build/scripts/vps/build-and-deploy.sh';
const CDN_DELAY_MS = 20_000; // laisse au CDN Sanity le temps de refléter la publication

let running = false;
let pending = false;
let timer = null;

function run() {
  running = true;
  const child = spawn(SCRIPT, [], { stdio: 'inherit' });
  child.on('exit', (code) => {
    console.log(`build terminé (code ${code})`);
    running = false;
    if (pending) { pending = false; schedule(); }
  });
}
function schedule() {
  if (running) { pending = true; return; }
  if (timer) return; // une publication est déjà en attente de build
  timer = setTimeout(() => { timer = null; run(); }, CDN_DELAY_MS);
}

const ok = (given) => {
  const a = Buffer.from(given), b = Buffer.from(`Bearer ${SECRET}`);
  return a.length === b.length && timingSafeEqual(a, b);
};

http.createServer((req, res) => {
  if (req.method !== 'POST' || req.url !== '/hooks/sanity') { res.writeHead(404).end(); return; }
  if (!ok(req.headers.authorization || '')) { res.writeHead(401).end(); return; }
  req.resume();
  schedule();
  res.writeHead(202).end('queued');
}).listen(8788, '127.0.0.1');
