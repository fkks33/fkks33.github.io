//ダイヤ配列（0 : 運休, 1 : 平日, 2 : 土曜日）
const dia_0 = [0];
const dia_fo_1 = [635, 670, 705, 770, 780, 790, 835, 855, 895, 905, 925, 980, 990, 1035, 1050, 1090];
const dia_of_1 = [650, 675, 750, 760, 765, 790, 810, 825, 885, 905, 915, 925, 975, 1010, 1020, 1065, 1120];
const dia_fs_1 = [775, 905, 915, 935, 985, 1010, 1020, 1040, 1085, 1100, 1125, 1155, 1170, 1190, 1210, 1280];
const dia_sf_1 = [835, 845, 920, 955, 965, 990, 1035, 1060, 1070, 1095, 1140, 1150, 1215, 1240, 1250, 1270];
const dia_fo_2 = [630, 690, 755];
const dia_of_2 = [650, 710, 775];
const dia_fs_2 = [600, 720, 795, 900];
const dia_sf_2 = [660, 780, 840, 1020];
let dia_fo_wednesday; //水曜日用

function write(id, str) {
    document.getElementById(id).innerHTML = str;
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

//現在時刻を秒に換算して返す
function getCurrentTime() {
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();
    let t =  h * 3600 + m * 60 + s;
    return t;
}

//秒表記の時間を「hhmmss」にする
function hhmmss(sec) {
    let h = sec / 3600;
    h = Math.floor(h);
    h = addZero(h);
    let m = (sec - 3600 * h) / 60;
    m = Math.floor(m);
    m = addZero(m);
    let s = sec - 3600 * h - 60 * m;
    s = addZero(s);
    let t = `${h} : ${m} : ${s}`;
    return t;
}

//引数は（現在時刻（秒）, 基準ダイヤ, 発順（0が先発で））
function getNext(now, dia, order) {
    let str = "";
    //現在時刻を分に（秒は切り捨て）
    let h = now / 3600;
    h = Math.floor(h);
    let m = (now - 3600 * h) / 60;
    m = Math.floor(m);
    t = h * 60 + m;
    for(let i = 0; i < dia.length; i++) {
        //参照するものが配列を超えていないか
        if(i + order >= dia.length) {
            break;
        }
        if(t < dia[i]) {
            //発車時刻
            let dep_t = dia[i + order];
            let dep_h = dep_t / 60;
            dep_h = Math.floor(dep_h);
            let dep_m = dep_t - dep_h * 60;
            dep_m = addZero(dep_m);
            str = `${dep_h} : ${dep_m}`;
            break;
        }
    }
    return str;
}

function getRemain(now, dia, order) {
    let str = "";
    for(let i = 0; i < dia.length; i++) {
        //参照できるか
        if(i + order >= dia.length) {
            break;
        }
        if(now < dia[i] * 60) {
            let t = dia[i + order] * 60 - now;
            let h = t / 3600;
            h = Math.floor(h);
            let m = (t - 3600 * h) / 60;
            m = Math.floor(m);
            let s = t - 3600 * h - 60 * m;
            str = `${h}h ${m}m ${s}s`;
            break;
        }
    }
    return str;
}

//繰り返す動作
const sunday = function() {
    currentTime = getCurrentTime();
    write("currentTimeDiv", hhmmss(currentTime));
    //日曜日はテスト用
    console.log("Hello world");
}

const weekday = function() {
    currentTime = getCurrentTime();
    write("currentTimeDiv", hhmmss(currentTime));
    //深草大宮
    write("FukaOmiya_1st_Departure", getNext(currentTime, dia_fo_1, 0));
    write("FukaOmiya_2nd_Departure", getNext(currentTime, dia_fo_1, 1));
    write("FukaOmiya_3rd_Departure", getNext(currentTime, dia_fo_1, 2));
    write("FukaOmiya_1st_Remain", getRemain(currentTime, dia_fo_1, 0));
    write("FukaOmiya_2nd_Remain", getRemain(currentTime, dia_fo_1, 1));
    write("FukaOmiya_3rd_Remain", getRemain(currentTime, dia_fo_1, 2));
    //大宮深草
    write("OmiyaFuka_1st_Departure", getNext(currentTime, dia_of_1, 0));
    write("OmiyaFuka_2nd_Departure", getNext(currentTime, dia_of_1, 1));
    write("OmiyaFuka_3rd_Departure", getNext(currentTime, dia_of_1, 2));
    write("OmiyaFuka_1st_Remain", getRemain(currentTime, dia_of_1, 0));
    write("OmiyaFuka_2nd_Remain", getRemain(currentTime, dia_of_1, 1));
    write("OmiyaFuka_3rd_Remain", getRemain(currentTime, dia_of_1, 2));
    //深草瀬田
    write("FukaSeta_1st_Departure", getNext(currentTime, dia_fs_1, 0));
    write("FukaSeta_2nd_Departure", getNext(currentTime, dia_fs_1, 1));
    write("FukaSeta_3rd_Departure", getNext(currentTime, dia_fs_1, 2));
    write("FukaSeta_1st_Remain", getRemain(currentTime, dia_fs_1, 0));
    write("FukaSeta_2nd_Remain", getRemain(currentTime, dia_fs_1, 1));
    write("FukaSeta_3rd_Remain", getRemain(currentTime, dia_fs_1, 2));
    //瀬田深草
    write("SetaFuka_1st_Departure", getNext(currentTime, dia_sf_1, 0));
    write("SetaFuka_2nd_Departure", getNext(currentTime, dia_sf_1, 1));
    write("SetaFuka_3rd_Departure", getNext(currentTime, dia_sf_1, 2));
    write("SetaFuka_1st_Remain", getRemain(currentTime, dia_sf_1, 0));
    write("SetaFuka_2nd_Remain", getRemain(currentTime, dia_sf_1, 1));
    write("SetaFuka_3rd_Remain", getRemain(currentTime, dia_sf_1, 2));
}

const wednesday = function() {
    currentTime = getCurrentTime();
    write("currentTimeDiv", hhmmss(currentTime));
    //深草大宮
    write("FukaOmiya_1st_Departure", getNext(currentTime, dia_fo_wednesday, 0));
    write("FukaOmiya_2nd_Departure", getNext(currentTime, dia_fo_wednesday, 1));
    write("FukaOmiya_3rd_Departure", getNext(currentTime, dia_fo_wednesday, 2));
    write("FukaOmiya_1st_Remain", getRemain(currentTime, dia_fo_wednesday, 0));
    write("FukaOmiya_2nd_Remain", getRemain(currentTime, dia_fo_wednesday, 1));
    write("FukaOmiya_3rd_Remain", getRemain(currentTime, dia_fo_wednesday, 2));
    //大宮深草
    write("OmiyaFuka_1st_Departure", getNext(currentTime, dia_of_1, 0));
    write("OmiyaFuka_2nd_Departure", getNext(currentTime, dia_of_1, 1));
    write("OmiyaFuka_3rd_Departure", getNext(currentTime, dia_of_1, 2));
    write("OmiyaFuka_1st_Remain", getRemain(currentTime, dia_of_1, 0));
    write("OmiyaFuka_2nd_Remain", getRemain(currentTime, dia_of_1, 1));
    write("OmiyaFuka_3rd_Remain", getRemain(currentTime, dia_of_1, 2));
    //深草瀬田
    write("FukaSeta_1st_Departure", getNext(currentTime, dia_fs_1, 0));
    write("FukaSeta_2nd_Departure", getNext(currentTime, dia_fs_1, 1));
    write("FukaSeta_3rd_Departure", getNext(currentTime, dia_fs_1, 2));
    write("FukaSeta_1st_Remain", getRemain(currentTime, dia_fs_1, 0));
    write("FukaSeta_2nd_Remain", getRemain(currentTime, dia_fs_1, 1));
    write("FukaSeta_3rd_Remain", getRemain(currentTime, dia_fs_1, 2));
    //瀬田深草
    write("SetaFuka_1st_Departure", getNext(currentTime, dia_sf_1, 0));
    write("SetaFuka_2nd_Departure", getNext(currentTime, dia_sf_1, 1));
    write("SetaFuka_3rd_Departure", getNext(currentTime, dia_sf_1, 2));
    write("SetaFuka_1st_Remain", getRemain(currentTime, dia_sf_1, 0));
    write("SetaFuka_2nd_Remain", getRemain(currentTime, dia_sf_1, 1));
    write("SetaFuka_3rd_Remain", getRemain(currentTime, dia_sf_1, 2));
}

const saturday = function() {
    currentTime = getCurrentTime();
    write("currentTimeDiv", hhmmss(currentTime));
    //深草大宮
    write("FukaOmiya_1st_Departure", getNext(currentTime, dia_fo_2, 0));
    write("FukaOmiya_2nd_Departure", getNext(currentTime, dia_fo_2, 1));
    write("FukaOmiya_3rd_Departure", getNext(currentTime, dia_fo_2, 2));
    write("FukaOmiya_1st_Remain", getRemain(currentTime, dia_fo_2, 0));
    write("FukaOmiya_2nd_Remain", getRemain(currentTime, dia_fo_2, 1));
    write("FukaOmiya_3rd_Remain", getRemain(currentTime, dia_fo_2, 2));
    //大宮深草
    write("OmiyaFuka_1st_Departure", getNext(currentTime, dia_of_2, 0));
    write("OmiyaFuka_2nd_Departure", getNext(currentTime, dia_of_2, 1));
    write("OmiyaFuka_3rd_Departure", getNext(currentTime, dia_of_2, 2));
    write("OmiyaFuka_1st_Remain", getRemain(currentTime, dia_of_2, 0));
    write("OmiyaFuka_2nd_Remain", getRemain(currentTime, dia_of_2, 1));
    write("OmiyaFuka_3rd_Remain", getRemain(currentTime, dia_of_2, 2));
    //深草瀬田
    write("FukaSeta_1st_Departure", getNext(currentTime, dia_fs_2, 0));
    write("FukaSeta_2nd_Departure", getNext(currentTime, dia_fs_2, 1));
    write("FukaSeta_3rd_Departure", getNext(currentTime, dia_fs_2, 2));
    write("FukaSeta_1st_Remain", getRemain(currentTime, dia_fs_2, 0));
    write("FukaSeta_2nd_Remain", getRemain(currentTime, dia_fs_2, 1));
    write("FukaSeta_3rd_Remain", getRemain(currentTime, dia_fs_2, 2));
    //瀬田深草
    write("SetaFuka_1st_Departure", getNext(currentTime, dia_sf_2, 0));
    write("SetaFuka_2nd_Departure", getNext(currentTime, dia_sf_2, 1));
    write("SetaFuka_3rd_Departure", getNext(currentTime, dia_sf_2, 2));
    write("SetaFuka_1st_Remain", getRemain(currentTime, dia_sf_2, 0));
    write("SetaFuka_2nd_Remain", getRemain(currentTime, dia_sf_2, 1));
    write("SetaFuka_3rd_Remain", getRemain(currentTime, dia_sf_2, 2));
}

//main
let currentTime;
let d = new Date();
let day = d.getDay(); //曜日
switch (day) {
    case 0:
        //日曜日
        write("pattern", "日曜日（運休）");
        setInterval(sunday, 1000);
        break;
    case 3:
        //水曜日
        write("pattern", "平日ダイヤ（水）");
        dia_fo_wednesday = dia_fo_1;
        dia_fo_wednesday.unshift(525);
        setInterval(wednesday, 1000);
        break;
    case 6:
        //土曜日
        write("pattern", "土曜日ダイヤ");
        setInterval(saturday, 1000);
        break;
    default:
        //水曜日除く平日
        write("pattern", "平日ダイヤ");
        setInterval(weekday, 1000);
        break;
}
