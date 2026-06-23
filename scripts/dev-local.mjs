import { spawn } from 'node:child_process';
import net from 'node:net';

const root = new URL('..', import.meta.url);
const processes = [];
const mailPort = Number(process.env.PORT || 8787);
const sitePort = Number(process.env.DEV_PORT || 4330);

const run = (name, command, args, options = {}) => {
  const child = spawn(command, args, {
    cwd: root,
    stdio: 'inherit',
    shell: false,
    ...options,
  });

  processes.push(child);

  child.on('exit', (code, signal) => {
    if (shuttingDown) return;
    if (code === 0 || signal === 'SIGTERM') return;

    console.error(`[dev:local] ${name} stopped unexpectedly (${signal ?? `code ${code}`}).`);
    shutdown(code ?? 1);
  });

  return child;
};

let shuttingDown = false;

const shutdown = (exitCode = 0) => {
  if (shuttingDown) return;
  shuttingDown = true;

  for (const child of processes) {
    if (!child.killed) child.kill('SIGTERM');
  }

  setTimeout(() => process.exit(exitCode), 300);
};

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

const isPortOpen = (port) =>
  new Promise((resolve) => {
    const socket = net.connect({ host: 'localhost', port });
    socket.once('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.once('error', () => {
      socket.destroy();
      resolve(false);
    });
    socket.setTimeout(500, () => {
      socket.destroy();
      resolve(false);
    });
  });

if (await isPortOpen(mailPort)) {
  console.log(`[dev:local] mail-service already listening on :${mailPort}; reusing it.`);
} else {
  run('mail-service', 'npm', ['--prefix', 'mail-service', 'run', 'start:local']);
}

if (await isPortOpen(sitePort)) {
  console.log(`[dev:local] Astro already listening on :${sitePort}; reusing it.`);
} else {
  run('astro', 'npm', ['run', 'dev:site']);
}
