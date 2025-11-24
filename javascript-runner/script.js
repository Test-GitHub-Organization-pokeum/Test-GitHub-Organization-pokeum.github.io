const btn = document.getElementById('run');
const codeEl = document.getElementById('code');
const output = document.getElementById('output');

const originalLog = console.log;
console.log = function (...args) {
    output.textContent += args.join(' ') + '\n';
    originalLog.apply(console, args);
};

btn.addEventListener('click', () => {
    output.textContent = '';
    const code = codeEl.value;
    try {
        eval(code);
    } catch (e) {
        output.textContent += 'Error: ' + e.message;
    }
});