const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

// Load AvenxComponent by stripping export (simulating what the compiler does for bundling)
const componentCode = fs.readFileSync(path.join(__dirname, '../lib/runtime/AvenxComponent.js'), 'utf-8')
    .replace(/export /g, '');

// Create a sandbox to "eval" the class into the current scope
const AvenxComponent = (function() {
    const exports = {};
    eval(componentCode + "\nexports.AvenxComponent = AvenxComponent;");
    return exports.AvenxComponent;
})();

function benchmark() {
    const iterations = 10000;
    
    const template = `
    <div class="user-card">
        <h2>{{ name }}</h2>
        <p>Age: {{ age }}</p>
        <p>Status: {{ age >= 18 ? 'Adult' : 'Minor' }}</p>
        <p>Double Age: {{ doubleAge }}</p>
    </div>
    `;

    const initialState = { name: 'John Doe', age: 25 };
    const computed = { doubleAge: 'age * 2' };
    
    const component = new AvenxComponent(initialState, computed, {}, template, {});

    console.log(`Running AvenxComponent.render() benchmark with ${iterations} iterations...`);

    // Warmup
    for (let i = 0; i < 100; i++) {
        component.render();
    }

    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
        component.render();
    }
    const end = performance.now();

    const totalTime = end - start;
    const avgTime = totalTime / iterations;

    console.log(`Total time: ${totalTime.toFixed(2)}ms`);
    console.log(`Average time per render: ${avgTime.toFixed(4)}ms`);
    console.log(`Ops/sec: ${Math.round(1000 / avgTime)}`);
}

benchmark();
