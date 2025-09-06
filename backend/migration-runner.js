const { exec } = require('child_process');

function runMigrations() {
  return new Promise((resolve, reject) => {
    console.log('Running migrations (via npx typeorm-ts-node-commonjs migration:run)...');

    // Ejecuta la CLI y conecta la salida al stdout/stderr
    const child = exec('npx typeorm-ts-node-commonjs migration:run --dataSource src/data-source.ts', {
      maxBuffer: 1024 * 1024 * 20
    });

    child.stdout && child.stdout.pipe(process.stdout);
    child.stderr && child.stderr.pipe(process.stderr);

    child.on('error', (err) => {
      console.error('Failed to spawn migration process:', err);
      reject(err);
    });

    child.on('close', (code, signal) => {
      if (signal) {
        const msg = `Migration process terminated by signal ${signal}`;
        console.error(msg);
        return reject(new Error(msg));
      }
      if (code === 0) {
        console.log('Migrations completed successfully.');
        return resolve();
      }
      const msg = `Migration process exited with code ${code}`;
      console.error(msg);
      reject(new Error(msg));
    });
  });
}

(async () => {
  try {
    await runMigrations();
    // corta cualquier listener restante y fuerza salida limpia
    console.log('Exiting migration runner with code 0');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    // devuelve código de error para que Render lo marque
    process.exit(1);
  }
})();