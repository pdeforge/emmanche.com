// Simple Linux console emulator
const fs = { // virtual file system
    '/': ['home', 'tmp'],
    '/home': ['user'],
    '/home/user': [],
    '/tmp': []
};
let currentPath = '/home/user';
let files = {
    '/home/user/hello.txt': 'Hello world!',
};
function resolvePath(path) {
    if (!path) return currentPath;
    if (path.startsWith('/')) return path;
    if (path === '.') return currentPath;
    if (path === '..') return currentPath.split('/').slice(0, -1).join('/') || '/';
    return (currentPath === '/' ? '/' : currentPath + '/') + path;
}
function ls(args) {
    let path = resolvePath(args[0]);
    let dirs = fs[path] || [];
    let fileList = Object.keys(files).filter(f => f.startsWith(path + '/')).map(f => f.replace(path + '/', ''));
    return dirs.concat(fileList).join('  ');
}
function mkdir(args) {
    let path = resolvePath(args[0]);
    if (fs[path]) return 'mkdir: cannot create directory: File exists';
    fs[path] = [];
    let parent = path.split('/').slice(0, -1).join('/') || '/';
    if (fs[parent]) fs[parent].push(path.split('/').pop());
    return '';
}
function echo(args) {
    return args.join(' ');
}
function cat(args) {
    let path = resolvePath(args[0]);
    return files[path] || `cat: ${args[0]}: No such file`;
}
function pwd() {
    return currentPath;
}
function cd(args) {
    let path = resolvePath(args[0]);
    if (fs[path]) {
        currentPath = path;
        return '';
    }
    return `cd: ${args[0]}: No such directory`;
}
function help() {
    return 'ls  mkdir  echo  cat  pwd  cd  help  clear';
}
function clear() {
    document.getElementById('output').innerHTML = '';
    return '';
}
const commands = { ls, mkdir, echo, cat, pwd, cd, help, clear };
function handleCommand(input) {
    let [cmd, ...args] = input.trim().split(/\s+/);
    if (!cmd) return '';
    if (commands[cmd]) return commands[cmd](args);
    return `${cmd}: command not found`;
}
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('input-form');
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    output.innerHTML = '';
    form.addEventListener('submit', e => {
        e.preventDefault();
        const val = input.value;
        output.innerHTML += `<span class=\"prompt\">$</span> ${val}\n`;
        let result = handleCommand(val);
        if (result) output.innerHTML += result + '\n';
        input.value = '';
        output.scrollTop = output.scrollHeight;
    });
});
