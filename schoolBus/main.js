//ダイヤ配列（0 : 運休, 1 : 平日, 2 : 土曜日）
const dia_0 = [0];
const dia_fo_1 = [635, 670, 705, 770, 780, 790, 835, 855, 895, 905, 925, 1035, 1050, 1090];
const dia_of_1 = [650, 675, 750, 760, 765, 790, 810, 825, 885, 905, 915, 925, 975, 1010, 1020, 1065, 1120];
const dia_fs_1 = [775, 905, 915, 935, 985, 1010, 1020, 1040, 1085, 1100, 1125, 1155, 1170, 1190, 1210, 1280];
const dia_sf_1 = [835, 845, 920, 955, 965, 990, 1035, 1060, 1070, 1095, 1140, 1150, 1215, 1240, 1250, 1270];
const dia_fo_2 = [630, 690, 755];
const dia_of_2 = [650, 710, 775];
const dia_fs_2 = [600, 720, 795, 900];
const dia_sf_2 = [660, 780, 840, 1020];
let wed_fo; //水曜日用

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

//パターン
function pattern(p) {
    document.getElementById("diaPattern").innerHTML = `${p}`;
}

//「次のバス」を表示（引数 : 現在時刻, ダイヤ, 表示先divのid）
function next(time, dia, id) {
    for(let i = 0; i < dia.length; i++) {
        if(time < dia[i]) {
            let h = dia[i] / 60;
            h = Math.floor(h);
            let m = dia[i] - (h * 60);
            h = addZero(h);
            m = addZero(m);
            document.getElementById(id).innerHTML = `${h} : ${m}`;
            break;
        } else {
            document.getElementById(id).innerHTML = `☆本日の運転は終了しました☆`;
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
            h = addZero(h);
            m = addZero(m);
            s = addZero(s);
            document.getElementById(id).innerHTML = `${h}h ${m}m ${s}s`;
            break;
        } else {
            document.getElementById(id).innerHTML = ``;
        }
    }
}

//引数が0~9なら先頭に0をつけてStringで返す
function addZero(n) {
    let s;
    if(n < 10) {
        s = `0${n}`;
    } else {
        s = `${n}`;
    }
    return s;
}

//繰り返す動作
const weekday = function() {
    next(getCurrent_M(), dia_fo_1, "foNext");
    remain(getCurrent_S(), dia_fo_1, "foRemain");
    next(getCurrent_M(), dia_of_1, "ofNext");
    remain(getCurrent_S(), dia_of_1, "ofRemain");
    next(getCurrent_M(), dia_fs_1, "fsNext");
    remain(getCurrent_S(), dia_fs_1, "fsRemain");
    next(getCurrent_M(), dia_sf_1, "sfNext");
    remain(getCurrent_S(), dia_sf_1, "sfRemain");
}

const wednesday = function() {
    next(getCurrent_M(), wed_fo, "foNext");
    remain(getCurrent_S(), wed_fo, "foRemain");
    next(getCurrent_M(), dia_of_1, "ofNext");
    remain(getCurrent_S(), dia_of_1, "ofRemain");
    next(getCurrent_M(), dia_fs_1, "fsNext");
    remain(getCurrent_S(), dia_fs_1, "fsRemain");
    next(getCurrent_M(), dia_sf_1, "sfNext");
    remain(getCurrent_S(), dia_sf_1, "sfRemain");
}

const saturday = function() {
    next(getCurrent_M(), dia_fo_2, "foNext");
    remain(getCurrent_S(), dia_fo_2, "foRemain");
    next(getCurrent_M(), dia_of_2, "ofNext");
    remain(getCurrent_S(), dia_of_2, "ofRemain");
    next(getCurrent_M(), dia_fs_2, "fsNext");
    remain(getCurrent_S(), dia_fs_2, "fsRemain");
    next(getCurrent_M(), dia_sf_2, "sfNext");
    remain(getCurrent_S(), dia_sf_2, "sfRemain");
}

//main
let d = new Date();
let day = d.getDay(); //曜日
switch (day) {
    case 0:
        //日曜日
        pattern("日曜日（運休）");
        break;
    case 3:
        //水曜日
        pattern("平日ダイヤ（水）");
        wed_fo = dia_fo_1;
        wed_fo.unshift(525);
        diaCheck(wed_fo); 
        setInterval(wednesday, 1000);
        break;
    case 6:
        //土曜日
        pattern("土曜日ダイヤ");
        setInterval(saturday, 1000);
        break;
    default:
        //水曜日除く平日
        pattern("平日ダイヤ");
        setInterval(weekday, 1000);
        break;
}