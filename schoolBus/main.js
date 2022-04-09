function addZero(n) {
    let s;
    if(n < 10) {
        s = `0${n}`;
    } else {
        s = n;
    }
    return s;
}

//現在時刻を表示
const currentTime = function() {
    let current = new Date();
    let currentHour = current.getHours();
    let currentMinute = current.getMinutes();
    let currentSecond = current.getSeconds();

    let currentHourStr = "", currentMinuteStr = "", currentSecondStr = "";
    currentHourStr = addZero(currentHour);
    currentMinuteStr = addZero(currentMinute);
    currentSecondStr = addZero(currentSecond);

    document.getElementById("currentTimeDisplay").innerHTML = `${currentHourStr} : ${currentMinuteStr} : ${currentSecondStr}`;
}
setInterval(currentTime, 1000);