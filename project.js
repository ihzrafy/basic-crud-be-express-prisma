const { exec } = require('child_process');

const child = exec('npm run start', { cwd: __dirname, windowsHide: true });

child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);
