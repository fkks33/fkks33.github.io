//ダイヤ配列（1 : 平日, 2 : 土曜日）
const dia_fo_1 = [];
const dia_of_1 = [];
const dia_fs_1 = [775, 905, 915, 935, 985, 1010, 1020, 1040, 1085, 1100, 1125, 1155, 1170, 1190, 1210, 1280];
const dia_sf_1 = [];

//ダイヤ検査用
function diaCheck(d) {
    for(let i = 0; i < d.length; i++) {
        let h = d[i] / 60;
        h = Math.floor(h);
        let m = d[i] - (h * 60);
        console.log(`${h} : ${m}`);
    }
}

//現在時刻を分に換算して返す
function getCurrent_M() {
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let t = h * 60 + m;
    // console.log("経過時間（分）：" + t);
    return t;
}

//現在時刻を秒に換算して返す
function getCurrent_S() {
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();
    let t =  h * 3600 + m * 60 + s;
    // console.log("経過時間（秒）：" + t);
    return t;
}

//「次のバス」を表示（引数 : 現在時刻, ダイヤ, 表示先divのid）
function next(time, dia, id) {
    for(let i = 0; i < dia.length; i++) {
        if(time < dia[i]) {
            let h = dia[i] / 60;
            h = Math.floor(h);
            let m = dia[i] - (h * 60);
            document.getElementById(id).innerHTML = `${h} : ${m}`;
            break;
        } else {
            document.getElementById(id).innerHTML = `本日の運行は終了しました`;
        }
    }
}

//「残り時間」を表示
function remain(time, dia, id) {
    for(let i = 0; i < dia.length; i++) {
        if(time < dia[i] * 60) {
            let t = dia[i] * 60 - time; //tは残り時間（秒）
            let h = t / 3600;
            h = Math.floor(h);
            let m = (t - 3600 * h) / 60;
            m = Math.floor(m);
            let s = t - 3600 * h - 60 * m;
            document.getElementById(id).innerHTML = `${h} : ${m} : ${s}`;
            break;
        } else {
            document.getElementById(id).innerHTML = ``;
        }
    }
}

//main
const interval = function() {
    next(getCurrent_M(), dia_fs_1, "fsNextDisplay");
    remain(getCurrent_S(), dia_fs_1, "fsRemainDisplay");
}

setInterval(interval, 1000);

//
function addZero(n) {
    let s;
    if(n < 10) {
        s = `0${n}`;
    } else {
        s = n;
    }
    return s;
}


/*
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
*/