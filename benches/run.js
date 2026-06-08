const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const benchesDir = __dirname;
const files = fs.readdirSync(benchesDir).filter(f => f.endsWith('.bench.js'));

console.log('--- Avenx-JS Benchmarks ---');
console.log(`Found ${files.length} benchmarks.\n`);

files.forEach(file => {
    console.log(`[Running] ${file}`);
    const result = spawnSync('node', [path.join(benchesDir, file)], { encoding: 'utf-8' });
    if (result.stdout) console.log(result.stdout);
    if (result.stderr) console.error(result.stderr);
    console.log('---------------------------');
});
