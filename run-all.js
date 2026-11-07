import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';
const nodeCmd = isWindows ? 'node.exe' : 'node';

// Detect Python executable (venv or system python)
const venvPythonWin = path.join(__dirname, 'venv', 'Scripts', 'python.exe');
const venvPythonUnix = path.join(__dirname, 'venv', 'bin', 'python');
let pythonCmd = 'python';

if (fs.existsSync(venvPythonWin)) {
  pythonCmd = venvPythonWin;
} else if (fs.existsSync(venvPythonUnix)) {
  pythonCmd = venvPythonUnix;
}

const services = [
  {
    name: 'AI SERVICE',
    cmd: pythonCmd,
    args: ['app.py'],
    cwd: path.join(__dirname, 'ai-service'),
    color: '\x1b[35m', // Magenta
    shell: false
  },
  {
    name: 'BACKEND   ',
    cmd: nodeCmd,
    args: ['server.js'],
    cwd: path.join(__dirname, 'backend'),
    color: '\x1b[36m', // Cyan
    shell: false
  },
  {
    name: 'FRONTEND  ',
    cmd: npmCmd,
    args: ['run', 'dev'],
    cwd: path.join(__dirname, 'frontend'),
    color: '\x1b[32m', // Green
    shell: isWindows
  }
];

// ========================================================
// PORT CONFIGURATION:
// CURRENT CONFIGURATION:
//   - Frontend (Vite):      http://localhost:5175
//   - Backend (Express):    http://localhost:5005
//   - AI Service (Flask):   http://localhost:5001
//
// ORIGINAL CONFIGURATION:
//   - Frontend:             http://localhost:5173
//   - Backend:              http://localhost:5000
//   - AI Service:           http://localhost:5001
// ========================================================

const resetColor = '\x1b[0m';
const activeProcesses = [];

console.log('\x1b[1m\x1b[34m========================================================\x1b[0m');
console.log('\x1b[1m🌾 Starting SugarCane Smart Farming Platform Services...\x1b[0m');
console.log('   🌐 Frontend:   \x1b[32mhttp://localhost:5175\x1b[0m  (Original: 5173)');
console.log('   ⚙️  Backend:    \x1b[36mhttp://localhost:5005\x1b[0m  (Original: 5000)');
console.log('   🤖 AI Service: \x1b[35mhttp://localhost:5001\x1b[0m  (Original: 5001)');
console.log('\x1b[1m\x1b[34m========================================================\x1b[0m\n');

services.forEach((srv) => {
  const prefix = `${srv.color}[${srv.name}]${resetColor} `;
  console.log(`${prefix}Launching in ${srv.cwd}...`);

  const proc = spawn(srv.cmd, srv.args, {
    cwd: srv.cwd,
    shell: srv.shell,
    env: { ...process.env, FORCE_COLOR: '1' }
  });

  activeProcesses.push({ name: srv.name, proc });

  proc.stdout.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach((l) => {
      if (l.trim()) console.log(`${prefix}${l}`);
    });
  });

  proc.stderr.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach((l) => {
      if (l.trim()) console.error(`${prefix}${l}`);
    });
  });

  proc.on('close', (code) => {
    console.log(`${prefix}Exited with code ${code}`);
  });
});

function shutdown() {
  console.log('\n\x1b[33mShutting down all services...\x1b[0m');
  activeProcesses.forEach(({ name, proc }) => {
    try {
      if (isWindows && proc.pid) {
        spawn('taskkill', ['/pid', String(proc.pid), '/f', '/t']);
      } else {
        proc.kill('SIGINT');
      }
    } catch (_) {}
  });
  setTimeout(() => process.exit(0), 1000);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
