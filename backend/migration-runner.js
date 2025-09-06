const { exec } = require('child_process');

const migrationCommand = 'npx typeorm-ts-node-commonjs migration:run --dataSource src/data-source.ts';
const startCommand = 'npm run start';

exec(migrationCommand, (err, stdout, stderr) => {
  if (err) {
    console.error('Migration failed:', stderr);
    process.exit(1);
  }
  console.log('Migrations completed successfully:', stdout);

  exec(startCommand, (err, stdout, stderr) => {
    if (err) {
      console.error('Server failed to start:', stderr);
      process.exit(1);
    }
    console.log('Server is running:', stdout);
  });
});