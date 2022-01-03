var kohunArr = [
    ["仁徳天皇陵古墳", "堺市", 486], //1
    ["応神天皇陵古墳", "羽曳野市", 425],
    ["履中天皇陵古墳", "堺市", 365],
    ["造山古墳", "岡山市", 350],
    ["河内大塚山古墳", "羽曳野・松原市", 335],
    ["五条野丸山古墳", "橿原市", 310],
    ["ニサンザイ古墳", "堺市", 300],
    ["渋谷向山古墳", "天理市", 300],
    ["仲姫命陵古墳", "藤井寺市", 290],
    ["作山古墳", "総社市", 286],
    ["箸墓古墳", "桜井市", 280], //11
    ["五社神古墳", "奈良市", 275],
    ["ウワナベ古墳", "奈良市", 255],
    ["市庭古墳", "奈良市", 250],
    ["メスリ山古墳", "桜井市", 250],
    ["仲哀天皇陵古墳", "藤井寺市", 242],
    ["行燈山古墳", "天理市", 242],
    ["室大墓古墳", "奈良市", 238],
    ["允恭天皇陵古墳", "藤井寺市", 230],
    ["宝来山古墳", "奈良市", 227],
    ["太田茶臼山古墳", "茨木市", 226], //21
    ["墓山古墳", "羽曳野市", 225],
    ["巣山古墳", "北葛城郡", 220],
    ["ヒシアゲ古墳", "奈良市", 219],
    ["西殿塚古墳", "天理市", 219],
    ["佐紀石塚山古墳", "奈良市", 218],
    ["川合大塚山古墳", "北葛城郡", 215],
    ["築山古墳", "大和高田市", 210],
    ["西陵古墳", "泉南郡", 210],
    ["太田天神山古墳", "太田市", 210],
    ["津堂城山古墳", "藤井寺市", 208], //31
    ["桜井茶臼山古墳", "桜井市", 207],
    ["陵山古墳", "奈良市", 207],
    ["コナベ古墳", "奈良市", 204],
    ["御廟山古墳", "堺市", 203],
    ["摩湯山古墳", "岸和田市", 200],
    ["白鳥陵古墳", "羽曳野市", 200],
    ["新木山古墳", "北葛城郡", 200],
    ["島の山古墳", "磯城郡", 200],
    ["神明山古墳", "京丹後市", 200], //40
    ["両宮山古墳", "赤磐市", 200],
];

var amount = 41; //古墳の総数

function gacha1Func() {
    var randomNum = Math.floor(Math.random() * amount);
    //Twitter
    var text = "「" + kohunArr[randomNum][0] + "古墳」を引き当てた！！" + " %23古墳ガチャ https://mado10.web.app/documents/kohun/";
    document.getElementById("tweetBtn").innerHTML = "<a href='https://twitter.com/intent/tweet?text=" + text + "' target='_blank'>結果をツイートする</a>";

    document.getElementById("result10").innerHTML = null;
    document.getElementById("result").innerHTML =
        "<h3>" + kohunArr[randomNum][0] + "</h3>" +
        "<table><tr><td>所在地 :</td><td>" + kohunArr[randomNum][1] + "</td></tr></table>" +
        "<table><tr><td>墳丘の全長 :</td><td>" + kohunArr[randomNum][2] + "m</td></tr></table><br />";
}

function gacha10Func() {
    var gachaResVar = document.getElementById("result10");
    document.getElementById("result10").innerHTML = null;
    for (var i = 0; i < 10; i++) {
        var row = gachaResVar.insertRow(-1);
        var cell = row.insertCell(-1);
        var randomNum = Math.floor(Math.random() * amount);
        alert((i + 1) + "回目 : " + kohunArr[randomNum][0]);
        document.getElementById("tweetBtn").innerHTML = null;
        document.getElementById("result").innerHTML = null;
        cell.textContent = kohunArr[randomNum][0] + " （" + kohunArr[randomNum][1] + "）";
    }
}
