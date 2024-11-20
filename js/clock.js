const clock = document.getElementById("clock");

let options = {
        timeZone: 'America/Denver',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    },
    formatter = new Intl.DateTimeFormat([], options);

setInterval(function() {
    clock.innerText = formatter.format(new Date())
}, 1000);