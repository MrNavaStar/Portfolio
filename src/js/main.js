import {Termynal} from "./termynal"

var test = new Termynal('.termynal', {
    typeDelay: 40,
    lineDelay: 700,
    progressLength: 10,
    lineData: [
        { type: 'input', prompt: 'ethan@portfolio:~$', value: 'cd Documents' },
        { type: 'input', prompt: 'ethan@portfolio:~$', value: './projects.sh' },
        { type: 'progress', progressChar: '.' },
        { type: 'clear' },
        { type: '3d'}
    ]
});

new Termynal('.termynal2', {
    startDelay: 3000,
    typeDelay: 40,
    lineDelay: 700,
    lineData: [
        { type: 'input', prompt: 'ethan@portfolio:~$', value: 'neoftech' },
        { type: 'clear' },
        { value: '<img class="manImg" src="img.png" height="200" width="200"></img>' },
    ]
});

new Termynal('.termynal3', {
    startDelay: 4000,
    typeDelay: 40,
    lineDelay: 700,
    lineData: [
        { type: 'input', prompt: 'ethan@portfolio:~$', value: 'npm uninstall react' },
        { value: "Are you sure you want to <a href='google.com'> test </a> uninstall \'react\'?" },
        { type: 'input',  typeDelay: 1000, prompt: '(y/n)', value: 'y' },
        { type: 'progress', progressChar: '·' },
        { value: 'Uninstalled \'react\'' },
    ]
});
