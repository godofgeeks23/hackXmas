function updateClock() {
    var dt = new Date();
    document.getElementById("datetime").innerHTML = dt.toLocaleString();
    var delta = Math.floor(moment.duration(moment().add(1, 'day').startOf('day').diff(moment())).asSeconds());
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    var seconds = delta % 60;
    document.getElementById("hoursleftinday").innerHTML = `${hours} hours, ${minutes} minutes, ${seconds} seconds left in today.`;
    setTimeout(updateClock, 1000);
}
updateClock();
