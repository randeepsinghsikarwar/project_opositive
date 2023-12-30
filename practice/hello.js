const {spawn} = require('child_process');

const childPython = spawn('python', ['main.py', 'ram is a very bad boy']);

childPython.stdout.on('data', (data) => {
    const result = data.toString().trim();
    console.log(result);
});

childPython.on('error', (err)=> {
    console.log(err)
})

