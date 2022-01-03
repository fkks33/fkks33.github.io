let kohunArray = [
    ["仁徳天皇陵", 486, 1],
    ["履中天皇陵", 365, 1],
    ["ニサンザイ", 300, 1],
    ["御廟山", 203, 1],
    ["大塚山", 168, 0],
    ["乳岡", 155, 0],
    ["反正天皇陵", 148, 1],
    ["いたすけ", 146, 1],
    ["黒姫山", 114, 0],
    ["長山", 110, 0],
    ["長塚", 106, 1],
    ["永山", 100, 1],
    ["丸保山", 87, 1],
    ["御廟表塚", 85, 0],
    ["城ノ山", 77, 0],
    ["銭塚", 72, 1],
    ["定の山", 69, 0],
    ["竜佐山", 61, 1],
    ["文殊塚", 59, 0],
    ["収塚", 59, 1],
    ["平井塚", 58, 0],
    ["旗塚", 58, 1],
    ["孫太夫", 56, 1],
    ["こうじ山", 51, 0],
    ["大安寺山", 62, 1],
    ["グワショウ坊", 61, 0],
    ["茶山", 56, 1],
    ["七観山", 56, 0],
    ["カトンボ山", 50, 0]
];

let message = "Welcome to 古墳ガチャ!! (堺市内限定版)"; //最初に表示される文字列
function print(m) {
    message = `${message}<br />${m}`;
    document.getElementById("display").innerHTML = `<p>${message}</p>`;
}

function getRandomInt(min, max) { //戻り値はmin以上max未満
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function gacha(n) {
    for (let i = 0; i < n; i++) {
        rand = getRandomInt(0, kohunArray.length);
        if (n === 1) { //単発ガチャ
            print(`"${kohunArray[rand][0]}古墳"`);
            print(`　全長 : ${kohunArray[rand][1]}m`);
            if (kohunArray[rand][2] === 1) {
                print(`　　世界文化遺産　構成資産`);
            }
            print(`　<a href="https://twitter.com/intent/tweet?text=${kohunArray[rand][0]}古墳を引き当てた!! %23古墳ガチャ https://mado10.web.app/documents/kohun/sakai/" target="_blank">（結果をツイート）</a>　<a href="https://duckduckgo.com/?q=${kohunArray[rand][0]}古墳" target="_blank">（検索）</a>`);
        } else {　//10連
            print(`(${i + 1}) : ${kohunArray[rand][0]}古墳 ...全長${kohunArray[rand][1]}m`);
        }

    }
}

function hiku(n) {
    print("");
    if ((ishi - (n * 250)) >= 0) { //石が足りる場合
        gacha(n); //ガチャる
        print("- - - - - - - - - -");
        ishi = ishi - (250 * n);
        print(`石の残高 : ${ishi}コ (前回${ishi + (250 * n)} - 今回${250 * n})`);
    } else { //石が足りない場合
        print(`エラー : ${-(ishi - (n * 250))}コの石が足りないよ!!`);
    }
}

function nRen() {
    let n = prompt("何回ひきます？");
    hiku(n);
}

function showAll() {
    print("");
    for (let i = 0; i < kohunArray.length; i++) {
        print(`${kohunArray[i][0]}`);
    }
    print("- - - - - - - - - -"); //チャージ
    let charge = (getRandomInt(150, 200) * 10);
    ishi = ishi + charge;
    print(`石の残高 : ${ishi}コ (前回${ishi - charge} + 今回${charge})`);
}


let ishi = (getRandomInt(300, 400) * 10); //最初に持っている石

print("");
print("〈このガチャについて〉");
print(`・1回250コの石でガチャがひけます。`);
print(`・石の増やし方は自分で考えてください。`);
print(`・登場する古墳は<a href="https://www.city.sakai.lg.jp/kanko/rekishi/dkofun/ranking/shinai.html">古墳大きさランキング（堺市内版）</a>を参考にしました。手打ちのため、誤りがあるかもしれません。`);
print(`・これは暇人による個人の制作部です。`)
print(`・最終更新日 : 令和2年2月7日`);
print("");
print("");
print(`あなたの所持石は ${ishi}コ です。`);
