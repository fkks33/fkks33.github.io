/**
 * サイゼリヤ・メニューコンシェルジュ - メインロジック
 */

// CSVメニューデータ（生のCSVをそのまま保持し、パースする）
const CSV_DATA = `item_data_id,item_data_name,item_data_price,item_data_mod_ini_cnt,item_data_mod_guid,item_data_notice,item_data_arc_type,item_data_drk_type,item_data_state,alcohol_check,item_data_messages_2,item_data_messages
1120,ﾗﾝﾁ)ﾐｰﾄｿｰｽﾎﾞﾛﾆｱ風,500,0,,,0,0,0,0,,
1116,ﾗﾝﾁ)ﾊﾟﾙﾏ風ｽﾊﾟｹﾞｯﾃｨ,500,0,,,0,0,0,0,,
1140,ﾗﾝﾁ)ﾃﾞｨｱﾎﾞﾗ風ﾊﾝﾊﾞｰｸﾞ,600,0,,,0,0,0,0,,
1135,ﾗﾝﾁ)ﾀﾗｺｿｰｽｼｼﾘｰ風,500,0,,,0,0,0,0,,
1141,ﾗﾝﾁ)ﾃﾞｨｱﾎﾞﾗ風ﾊﾝﾊﾞｰｸﾞ(ﾗｲｽ大),650,0,,,0,0,0,0,,
1145,ﾗﾝﾁ)ﾃﾞｨｱﾎﾞﾗ風ﾊﾝﾊﾞｰｸﾞ(ﾌｫｯｶ),600,0,,,0,0,0,0,,
1175,ﾗﾝﾁ)ｵﾆｵﾝﾊﾝﾊﾞｰｸﾞ(ﾌｫｯｶ),600,0,,,0,0,0,0,,
1170,ﾗﾝﾁ)ｵﾆｵﾝﾊﾝﾊﾞｰｸﾞ,600,0,,,0,0,0,0,,
1142,ﾗﾝﾁ)ﾃﾞｨｱﾎﾞﾗ風ﾊﾝﾊﾞｰｸﾞ(ﾗｲｽ小),550,0,,,0,0,0,0,,
1209,ﾁｷﾝのｻﾗﾀﾞ,350,0,,,0,0,2,0,,
1172,ﾗﾝﾁ)ｵﾆｵﾝﾊﾝﾊﾞｰｸﾞ(ﾗｲｽ小),550,0,,,0,0,0,0,,
1171,ﾗﾝﾁ)ｵﾆｵﾝﾊﾝﾊﾞｰｸﾞ(ﾗｲｽ大),650,0,,,0,0,0,0,,
1202,小ｴﾋﾞのｻﾗﾀﾞ,350,0,,,0,0,2,0,,
1205,わかめのｻﾗﾀﾞ,350,0,,,0,0,2,0,,
1307,たまねぎのｽﾞｯﾊﾟ,300,0,,,0,0,2,0,,
1301,ｺｰﾝｸﾘｰﾑｽｰﾌﾟ,150,0,,,0,0,2,0,,
1305,田舎風ﾐﾈｽﾄﾛｰﾈ,300,0,,,0,0,2,0,,
1401,辛味ﾁｷﾝ,300,0,,,0,0,2,0,,
1403,ほうれん草のｿﾃｰ,200,0,,,0,0,2,0,,
1402,ｱﾛｽﾃｨﾁｰﾆ,400,0,,,0,0,2,0,,
1407,ﾁｮﾘｿｰ,400,0,,,0,0,2,0,,
1405,ｴｽｶﾙｺﾞのｵｰﾌﾞﾝ焼き,400,0,,,0,0,2,0,,
1404,ﾎﾟｯﾌﾟｺｰﾝｼｭﾘﾝﾌﾟ,300,0,,,0,0,2,0,,
1406,小ｴﾋﾞのｶｸﾃﾙ,280,0,,,0,0,2,0,,
1408,蒸し鶏の香味ｿｰｽ,280,0,,,0,0,2,0,,
1410,ﾑｰﾙ貝のｶﾞｰﾘｯｸ焼き,400,0,,,0,0,2,0,,
1413,ｷｬﾛｯﾄﾗﾍﾟ,200,0,,,0,0,2,0,,
1417,ﾊﾞｯﾌｧﾛｰﾓｯﾂｧﾚﾗのｶﾌﾟﾚｰｾﾞ,430,0,,,0,0,2,0,,
1416,ﾎﾟﾃﾄのｸﾞﾘﾙ,300,0,,,0,0,2,0,,
1425,柔らか青豆の温ｻﾗﾀﾞ,200,0,,,0,0,2,0,,
1423,生ﾊﾑとﾓｯﾂｧﾚﾗ盛合せ,500,0,,,0,0,2,0,,
1422,生ﾊﾑ(ﾊﾓﾝ・ｾﾗｰﾉ),320,0,,,0,0,2,0,,
1452,(ﾀﾞﾌﾞﾙｻｲｽﾞ)ｱﾛｽﾃｨﾁｰﾆ,800,0,,,0,0,2,0,,
2101,ﾐﾗﾉ風ﾄﾞﾘｱ,300,0,,,0,0,2,0,,
2110,ﾀﾗｺとﾎﾟｯﾌﾟｺｰﾝｼｭﾘﾝﾌﾟのﾄﾞﾘｱ,400,0,,,0,0,2,0,,
2103,半熟卵のﾐﾗﾉ風ﾄﾞﾘｱ,350,0,,,0,0,2,0,,
2108,焼ﾁｰｽﾞﾐﾗﾉ風ﾄﾞﾘｱ,350,0,,,0,0,2,0,,
2115,ﾎﾟｯﾌﾟｺｰﾝｼｭﾘﾝﾌﾟとﾀﾗｺのｸﾘｰﾑｸﾞﾗﾀﾝ,430,0,,,0,0,2,0,,
2203,ﾊﾞｯﾌｧﾛｰﾓｯﾂｱﾚﾗのﾋﾟｻﾞ,400,0,,,0,0,0,0,,
2206,たっぷりｺｰﾝのﾋﾟｻﾞ,400,0,,,0,0,0,0,,
2208,ｿｰｾｰｼﾞﾋﾟｻﾞ,400,0,,,0,0,0,0,,
2204,野菜ときのこのﾋﾟｻﾞ,400,0,,,0,0,0,0,,
2306,ﾐｰﾄｿｰｽﾎﾞﾛﾆｱ風,400,0,,,0,0,2,0,,
2303,ﾍﾟﾍﾟﾛﾝﾁｰﾉ,300,0,,,0,0,2,0,,
2305,ｶﾙﾎﾞﾅｰﾗ,500,0,,,0,0,2,0,,
2304,ﾊﾟﾙﾏ風ｽﾊﾟｹﾞｯﾃｨ,400,0,,,0,0,2,0,,
2301,ﾀﾗｺｿｰｽｼｼﾘｰ風,400,0,,,0,0,2,0,,
2310,ｽ🇺🇵入り塩味ﾎﾞﾝｺﾞﾚ,500,0,,,0,0,2,0,,
2317,半熟卵ﾍﾟﾍﾟﾛﾝﾁｰﾉ,350,0,,,0,0,2,0,,
2318,半熟卵のｶﾙﾎﾞﾅｰﾗ,550,0,,,0,0,2,0,,
2320,小ｴﾋﾞのﾀﾗｺｿｰｽ,540,0,,,0,0,2,0,,
2316,半熟卵のﾐｰﾄｿｰｽ,450,0,,,0,0,2,0,,
2321,きのきのｸﾘｰﾑｽﾊﾟ,600,0,,,0,0,2,0,,
2328,ｲｶの墨入りｽﾊﾟｹﾞｯﾃｨ,500,0,,,0,0,2,0,,
2407,ﾃﾞｨｱﾎﾞﾗ風ﾊﾝﾊﾞｰｸﾞ,500,0,,,0,0,2,0,,
2402,若鶏のﾃﾞｨｱﾎﾞﾗ風,500,0,,,0,0,2,0,,
2406,ﾊﾝﾊﾞｰｸﾞｽﾃｰｷ,400,0,,,0,0,2,0,,
2403,ｲﾀﾘｱﾝﾊﾝﾊﾞｰｸﾞ,500,0,,,0,0,2,0,,
2419,ﾋﾞｰﾌｽﾃｰｷ,1090,0,,,0,0,0,0,,
2418,ﾐｯｸｽｸﾞﾘﾙ,650,0,,,0,0,2,0,,
2404,柔らかﾁｷﾝのﾁｰｽﾞ焼き,500,0,,,0,0,2,0,,
3101,ﾗｲｽ,150,0,,,0,0,2,0,,
3102,ﾗｰｼﾞﾗｲｽ,200,0,,,0,0,2,0,,
3103,ｽﾓｰﾙﾗｲｽ,100,0,,,0,0,2,0,,
3114,ﾁｰｽﾞﾌｫｯｶﾁｵ,250,0,,,0,0,2,0,,
3111,ｶﾞｰﾘｯｸﾌｫｯｶﾁｵ,200,0,,,0,0,2,0,,
3112,ｼﾅﾓﾝﾌｫｯｶﾁｵ,200,0,,,0,0,2,0,,
3110,ﾌｫｯｶﾁｵ,150,0,,,0,0,2,0,,
3201,ﾃｨﾗﾐｽｸﾗｼｺ,300,0,,,0,0,2,0,,
3206,ｲﾀﾘｱﾝﾌﾟﾘﾝ,250,0,,,0,0,2,0,,
3207,ﾁｮｺﾚｰﾄｹｰｷ,300,0,,,0,0,2,0,,
3205,ﾐﾙｸｼﾞｪﾗｰﾄ,250,0,,,0,0,2,0,,
3212,ﾌﾟﾘﾝとﾃｨﾗﾐｽｸﾗｼｺの盛合せ,500,0,,,0,0,2,0,,
3213,ﾄﾘﾌｱｲｽｸﾘｰﾑ,350,0,,,0,0,2,0,,
2325,ｱﾗﾋﾞｱｰﾀ(ﾍﾟﾝﾈ),430,0,,,0,0,2,0,,
3215,ｺｰﾋｰｾﾞﾘｰ&ﾐﾙｸｼﾞｪﾗｰﾄ,350,0,,,0,0,2,0,,
3221,ﾁｪﾘｰｿｰｽのﾃｨﾗﾐｽ,500,0,,,0,0,2,0,,
3216,ﾁｮｺｹｰｷ＆ﾐﾙｸｼﾞｪﾗｰﾄ,500,0,,,0,0,2,0,,
3214,ｼﾞｪﾗｰﾄ&ｼﾅﾓﾝﾌｫｯｶﾁｵ,450,0,,,0,0,2,0,,
3218,ﾁｪﾘｰｿｰｽのﾐﾙｸｼﾞｪﾗｰﾄ,450,0,,,0,0,2,0,,
3113,ﾀﾗｺﾌｫｯｶﾁｵ,250,0,,,0,0,2,0,,
3306,ｸﾞﾗｯﾊﾟ,300,0,,,3,0,2,1,,
3303,ｱｻﾋﾄﾞﾗｲｾﾞﾛ,250,0,,,3,0,2,1,,
3302,ｸﾞﾗｽﾋﾞｰﾙ,280,0,,,3,0,2,1,,
3301,中ｼﾞｮｯｷ,400,0,,,3,0,2,1,,
3304,氷結ﾚﾓﾝ,350,0,,,3,0,2,1,,
3419,ｷｬﾝﾃｨﾙﾌｨｰﾅﾘｾﾞﾙﾊﾞ,2200,2,グラスの数をご確認ください,,2,0,2,1,,
3407,赤ﾏｸﾞﾅﾑ1.5L,1100,2,グラスの数をご確認ください,,2,0,2,1,,
3402,白ｸﾞﾗｽﾜｲﾝ,100,0,,,3,0,2,1,,
3401,赤ｸﾞﾗｽﾜｲﾝ,100,0,,,3,0,2,1,,
3404,白ﾃﾞｶﾝﾀ小,200,2,グラスの数をご確認ください,,1,0,2,1,,
3412,ﾗﾝﾌﾞﾙｽｺﾛｾﾞ,1100,2,グラスの数をご確認ください,,2,0,2,1,,
3408,白ﾏｸﾞﾅﾑ1.5L,1100,2,グラスの数をご確認ください,,1,0,2,1,,
3406,白ﾃﾞｶﾝﾀ大,400,2,グラスの数をご確認ください,,1,0,2,1,,
3421,ﾌﾞﾘｭｾｯﾃﾉｰﾃ,1650,2,グラスの数をご確認ください,,1,0,0,1,,
3405,赤ﾃﾞｶﾝﾀ大,400,2,グラスの数をご確認ください,,2,0,2,1,,
3423,ｲﾝｶﾝﾄﾇﾗｸﾞｽ,1650,2,グラスの数をご確認ください,,1,0,0,1,,
3425,ｵｰﾘ,2600,2,グラスの数をご確認ください,,1,0,0,1,,
3428,ﾗﾇｯﾁｮﾊﾞﾙﾍﾞｰﾗ,1650,2,グラスの数をご確認ください,,2,0,0,1,,
3413,ﾄﾞﾝﾗﾌｧｴﾛ,1100,2,グラスの数をご確認ください,,1,0,2,1,,
3420,ﾗﾝﾌﾞﾙｽｺﾄﾞﾙﾁｪ,1100,2,グラスの数をご確認ください,,2,0,0,1,,
3416,ｷｬﾝﾃｨ,1100,2,グラスの数をご確認ください,,2,0,2,1,,
3424,ﾊﾞｹﾚｯﾄ,2200,2,グラスの数をご確認ください,,1,0,0,1,,
3403,赤ﾃﾞｶﾝﾀ小,200,2,グラスの数をご確認ください,,2,0,2,1,,
3415,ﾍﾞﾙﾃﾞｯｷｵ,1100,2,グラスの数をご確認ください,,1,0,2,1,,
3429,ｻﾘｰﾁｪｻﾚﾝﾃｨｰﾉﾘｾﾞﾙﾊﾞ,2200,2,グラスの数をご確認ください,,2,0,2,1,,
3414,ﾗﾝﾌﾞﾙｽｺｾｯｺ,1100,2,グラスの数をご確認ください,,2,0,2,1,,
3907,ﾁｮｺﾚｰﾄｹｰｷ(あとで),300,0,,,0,0,2,0,4,
3913,ﾄﾘﾌｱｲｽｸﾘｰﾑ(あとで),350,0,,,0,0,2,0,4,
3905,ﾐﾙｸｼﾞｪﾗｰﾄ(あとで),250,0,,,0,0,2,0,4,
3918,ﾁｪﾘｰｿｰｽのﾐﾙｸｼﾞｪﾗｰﾄ(あとで),450,0,,,0,0,2,0,4,
3914,ｼﾞｪﾗｰﾄ&ｼﾅﾓﾝﾌｫｯｶﾁｵ(あとで),450,0,,,0,0,2,0,4,
3916,ﾁｮｺｹｰｷ＆ﾐﾙｸｼﾞｪﾗｰﾄ(あとで),500,0,,,0,0,2,0,4,
3912,ﾌﾟﾘﾝとﾃｨﾗﾐｽｸﾗｼｺの盛合せ(あとで),500,0,,,0,0,2,0,4,
3915,ｺｰﾋｰｾﾞﾘｰ&ﾐﾙｸｼﾞｪﾗｰﾄ(あとで),350,0,,,0,0,2,0,4,
3906,ｲﾀﾘｱﾝﾌﾟﾘﾝ(あとで),250,0,,,0,0,2,0,4,
3901,ﾃｨﾗﾐｽｸﾗｼｺ(あとで),300,0,,,0,0,2,0,4,
3921,ﾁｪﾘｰｿｰｽのﾃｨﾗﾐｽ(あとで),500,0,,,0,0,2,0,4,
4301,ﾄｯﾋﾟﾝｸﾞ半熟卵,50,0,,,0,0,2,0,,
4304,ﾄｯﾋﾟﾝｸﾞ野菜ｿｰｽ,100,0,,,0,0,2,0,,
4307,ﾄｯﾋﾟﾝｸﾞ粉ﾁｰｽﾞ(ｸﾞﾗﾝﾓﾗﾋﾞｱ),100,0,,,0,0,2,0,,
4306,やみつきｽﾊﾟｲｽ,50,0,,,0,0,2,0,,
5102,ｷｯｽﾞﾄﾞﾘﾝｸﾊﾞｰ100,100,0,,小学生以下の方のみ注文いただけます。,0,4,2,0,1,
5103,単品ﾄﾞﾘﾝｸﾊﾞｰ300,300,0,,,0,1,2,0,1,
5101,ｾｯﾄﾄﾞﾘﾝｸﾊﾞｰ200,200,0,,,0,2,2,0,1,
5302,(TO)ｲﾀﾘｱﾝﾌﾟﾘﾝ,240,0,,,0,0,2,0,,
5301,(TO)冷凍辛味ﾁｷﾝ1.5kg,2200,0,,,0,0,2,0,,
5305,(TO)ﾄﾞﾚｯｼﾝｸﾞ,500,0,,,0,0,2,0,,
5306,(TO)ｵﾘｰﾌﾞｵｲﾙ,1200,0,,,0,0,2,0,,
6136,ｸﾞﾗｽ,0,0,,,0,0,2,0,,`;

// パースされたメニュー全データ
let allMenuItems = [];

// カテゴリ定義
const CATEGORIES = {
    LUNCH: 'lunch',       // ランチ特別枠
    SALAD: 'salad',       // サラダ
    SOUP: 'soup',         // スープ
    APPETIZER: 'appetizer', // 前菜・おつまみ
    MAIN_CARB: 'main_carb', // 主食 (パスタ・ドリア・ピザ)
    MAIN_PROTEIN: 'main_protein', // 主菜 (肉料理)
    BREAD_RICE: 'bread_rice', // パン・ライス
    DESSERT: 'dessert',   // デザート
    ALCOHOL: 'alcohol',   // アルコール
    DRINK_BAR: 'drink_bar', // ドリンクバー
    OTHER: 'other'        // その他除外品
};

// カテゴリ表示名と絵文字
const CATEGORY_META = {
    [CATEGORIES.SALAD]: { name: 'サラダ', emoji: '🥗', desc: '健康的なベジタブルファースト' },
    [CATEGORIES.SOUP]: { name: 'スープ', emoji: '🥣', desc: '温かいスープでほっこり' },
    [CATEGORIES.APPETIZER]: { name: '前菜・おつまみ', emoji: '🍢', desc: 'みんなでシェアできる一品' },
    [CATEGORIES.MAIN_CARB]: { name: '主食', emoji: '🍝', desc: 'ドリア・パスタ・ピザなど' },
    [CATEGORIES.MAIN_PROTEIN]: { name: 'メイン料理', emoji: '🥩', desc: '大満足のジューシーな肉料理' },
    [CATEGORIES.BREAD_RICE]: { name: 'ライス・フォッカ', emoji: '🍞', desc: 'お肉料理のお供に' },
    [CATEGORIES.DESSERT]: { name: 'デザート', emoji: '🍮', desc: '食後の甘いお楽しみ' },
    [CATEGORIES.ALCOHOL]: { name: 'アルコール', emoji: '🍷', desc: 'お食事をさらに楽しく' },
    [CATEGORIES.DRINK_BAR]: { name: 'ドリンクバー', emoji: '🥤', desc: 'おかわり自由のドリンク' }
};

/**
 * CSVの1行をパースする簡易CSVパーサー
 */
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());
    return result;
}

/**
 * 初期化時にCSVデータを解析し、メモリ上に展開する
 */
function initMenuData() {
    const lines = CSV_DATA.split('\n');
    const headers = parseCSVLine(lines[0]);
    
    allMenuItems = [];
    
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const columns = parseCSVLine(lines[i]);
        
        // ヘッダーのカラム名と一致するオブジェクトを作成
        const item = {};
        headers.forEach((header, index) => {
            item[header] = columns[index];
        });
        
        // 型変換と整形
        const id = parseInt(item.item_data_id, 10);
        const name = item.item_data_name;
        // 「ｽ🇺🇵入り...」という誤字がCSVにある場合の補正
        const cleanName = name.replace('ｽ🇺🇵入り', 'ｽｰﾌﾟ入り');
        const price = parseInt(item.item_data_price, 10);
        const isAlcohol = parseInt(item.alcohol_check, 10) === 1;
        const drkType = parseInt(item.item_data_drk_type, 10);
        
        // カテゴリ分類
        let category = CATEGORIES.OTHER;
        const idStr = String(id);
        
        if (cleanName.startsWith('(TO)') || cleanName.includes('冷凍') || cleanName.includes('ﾄﾞﾚｯｼﾝｸﾞ') || cleanName.includes('ｵﾘｰﾌﾞｵｲﾙ')) {
            category = CATEGORIES.OTHER; // テイクアウト除外
        } else if (cleanName.startsWith('ﾄｯﾋﾟﾝｸﾞ') || cleanName === 'やみつきｽﾊﾟｲｽ') {
            category = CATEGORIES.OTHER; // トッピング除外
        } else if (idStr.startsWith('61')) {
            category = CATEGORIES.OTHER; // グラス等除外
        } else if (cleanName.endsWith('(あとで)')) {
            category = CATEGORIES.OTHER; // 重複を避けるため「あとで」デザートは除外（通常版のみを使用）
        } else if (idStr.startsWith('11')) {
            category = CATEGORIES.LUNCH; // ランチ専用
        } else if (idStr.startsWith('12')) {
            category = CATEGORIES.SALAD;
        } else if (idStr.startsWith('13')) {
            category = CATEGORIES.SOUP;
        } else if (idStr.startsWith('14') || idStr === '2325') { // 2325はアラビアータ(ペンネ)だが前菜枠としても適する（またはパスタ）
            category = idStr === '2325' ? CATEGORIES.MAIN_CARB : CATEGORIES.APPETIZER;
        } else if (idStr.startsWith('21') || idStr.startsWith('22') || idStr.startsWith('23')) {
            category = CATEGORIES.MAIN_CARB;
        } else if (idStr.startsWith('24')) {
            category = CATEGORIES.MAIN_PROTEIN;
        } else if (idStr.startsWith('31')) {
            category = CATEGORIES.BREAD_RICE;
        } else if (idStr.startsWith('32')) {
            category = CATEGORIES.DESSERT;
        } else if (idStr.startsWith('33') || idStr.startsWith('34')) {
            category = CATEGORIES.ALCOHOL;
        } else if (idStr.startsWith('51')) {
            category = CATEGORIES.DRINK_BAR;
        }
        
        // 登録対象のみ追加
        if (category !== CATEGORIES.OTHER) {
            allMenuItems.push({
                id: id,
                name: cleanName,
                price: price,
                category: category,
                isAlcohol: isAlcohol,
                drkType: drkType,
                notice: item.item_data_notice || ''
            });
        }
    }
    
    console.log(`Parsed ${allMenuItems.length} valid menu items.`);
}

/**
 * 提案メニュー生成アルゴリズム (モンテカルロアプローチ)
 * @param {Object} params - 予算, 人数, ドリンク設定, オプション
 * @returns {Object} 提案結果
 */
function generateMenuProposal(params) {
    const {
        budget,          // 総予算
        people,          // 人数
        drinkOption,     // 'none' | 'drinkbar' | 'alcohol'
        includeLunch,    // ランチメニューを含めるか
        includeDessert,  // デザートを含めるか
        allowDuplicate   // 同一メニューの重複を許可するか
    } = params;

    // プールの選定
    const pool = allMenuItems.filter(item => {
        // ランチメニューのフィルタリング
        if (item.category === CATEGORIES.LUNCH) {
            return includeLunch;
        }
        return true;
    });

    let bestProposal = null;
    let bestScore = -1;
    
    // 試行回数 (モンテカルロシミュレーション)
    const iterations = 1500;
    
    for (let t = 0; t < iterations; t++) {
        const currentProposal = [];
        let currentCost = 0;
        
        // 1. ドリンクの処理
        if (drinkOption === 'drinkbar') {
            // セットドリンクバー (ID: 5101, 200円) を人数分追加
            const dbItem = pool.find(item => item.id === 5101);
            if (dbItem) {
                currentProposal.push({ ...dbItem, quantity: people });
                currentCost += dbItem.price * people;
            }
        } else if (drinkOption === 'alcohol') {
            // アルコールの予算割合（総予算の約25%〜45%をアルコールに割り当てる）
            const targetAlcoholBudget = budget * (0.25 + Math.random() * 0.20);
            let alcCost = 0;
            const alcPool = pool.filter(item => item.category === CATEGORIES.ALCOHOL);
            
            if (alcPool.length > 0) {
                // 人数が多い場合はボトルやデカンタ大を優先、少人数の場合はグラスやデカンタ小を優先
                const bigAlcohol = alcPool.filter(item => item.price >= 400);
                const lightAlcohol = alcPool.filter(item => item.price < 400);
                
                let limitCount = 0;
                while (alcCost < targetAlcoholBudget && limitCount < 10) {
                    limitCount++;
                    let selectedAlc = null;
                    
                    if (people >= 3 && Math.random() > 0.4 && bigAlcohol.length > 0) {
                        // 大人数ならマグナムボトルやデカンタ大
                        selectedAlc = bigAlcohol[Math.floor(Math.random() * bigAlcohol.length)];
                    } else if (lightAlcohol.length > 0) {
                        selectedAlc = lightAlcohol[Math.floor(Math.random() * lightAlcohol.length)];
                    }
                    
                    if (selectedAlc) {
                        // すでにリストにあるか確認
                        const existing = currentProposal.find(i => i.id === selectedAlc.id);
                        if (existing) {
                            if (allowDuplicate || selectedAlc.price < 400) { // 安いアルコール（グラス）なら個数を増やす
                                existing.quantity++;
                                alcCost += selectedAlc.price;
                                currentCost += selectedAlc.price;
                            }
                        } else {
                            currentProposal.push({ ...selectedAlc, quantity: 1 });
                            alcCost += selectedAlc.price;
                            currentCost += selectedAlc.price;
                        }
                    }
                }
            }
        }
        
        // 2. フード・デザートの組み合わせ構築
        // 人数に応じた「理想的な構成テンプレート」
        // 主食スロット、主菜スロット、サラダスロット、前菜スロット、スープスロット、デザートスロット
        const tempProposal = [];
        
        // サラダの選出 (人数に応じて適切なボリューム)
        const saladPool = pool.filter(item => item.category === CATEGORIES.SALAD);
        if (saladPool.length > 0) {
            // 1-2人の場合は1個、3-4人は2個、5人以上は3個程度
            const targetSalads = Math.max(1, Math.min(3, Math.ceil(people / 2)));
            for (let i = 0; i < targetSalads; i++) {
                const s = saladPool[Math.floor(Math.random() * saladPool.length)];
                addOrIncrement(tempProposal, s);
            }
        }
        
        // スープの選出 (お好みで、最大人数分)
        const soupPool = pool.filter(item => item.category === CATEGORIES.SOUP);
        if (soupPool.length > 0 && Math.random() > 0.3) {
            const targetSoups = Math.floor(Math.random() * (people + 1));
            for (let i = 0; i < targetSoups; i++) {
                const s = soupPool[Math.floor(Math.random() * soupPool.length)];
                addOrIncrement(tempProposal, s);
            }
        }
        
        // 前菜・おつまみの選出
        const appPool = pool.filter(item => item.category === CATEGORIES.APPETIZER);
        if (appPool.length > 0) {
            // 人数Nに対して、N-1 〜 N+2品程度
            const targetApps = Math.max(1, people - 1 + Math.floor(Math.random() * 3));
            for (let i = 0; i < targetApps; i++) {
                const a = appPool[Math.floor(Math.random() * appPool.length)];
                addOrIncrement(tempProposal, a);
            }
        }
        
        // メイン（主食＋主菜）の選出
        // 1人あたり「主食1品」か「主菜1品＋パンライス1品」がベスト
        const carbPool = pool.filter(item => item.category === CATEGORIES.MAIN_CARB || item.category === CATEGORIES.LUNCH);
        const proteinPool = pool.filter(item => item.category === CATEGORIES.MAIN_PROTEIN);
        const breadPool = pool.filter(item => item.category === CATEGORIES.BREAD_RICE);
        
        for (let p = 0; p < people; p++) {
            // 主食を選ぶか、主菜＋パンライスを選ぶか
            if (Math.random() > 0.4 && carbPool.length > 0) {
                // 主食（パスタ、ピザ、ドリア）
                const c = carbPool[Math.floor(Math.random() * carbPool.length)];
                addOrIncrement(tempProposal, c);
            } else {
                // 主菜（肉料理）
                if (proteinPool.length > 0) {
                    const pr = proteinPool[Math.floor(Math.random() * proteinPool.length)];
                    addOrIncrement(tempProposal, pr);
                    
                    // 肉料理にはライスやフォッカチオを添える
                    if (breadPool.length > 0 && Math.random() > 0.1) {
                        const b = breadPool[Math.floor(Math.random() * breadPool.length)];
                        addOrIncrement(tempProposal, b);
                    }
                } else if (carbPool.length > 0) {
                    const c = carbPool[Math.floor(Math.random() * carbPool.length)];
                    addOrIncrement(tempProposal, c);
                }
            }
        }
        
        // デザートの選出
        const dessertPool = pool.filter(item => item.category === CATEGORIES.DESSERT);
        if (includeDessert && dessertPool.length > 0 && Math.random() > 0.2) {
            // 予算が余ることを想定し、0〜人数分のデザートを追加
            const targetDesserts = Math.floor(Math.random() * (people + 1));
            for (let i = 0; i < targetDesserts; i++) {
                const d = dessertPool[Math.floor(Math.random() * dessertPool.length)];
                addOrIncrement(tempProposal, d);
            }
        }
        
        // 一時提案を本提案に追加し、合計金額を計算
        tempProposal.forEach(item => {
            currentProposal.push(item);
            currentCost += item.price * item.quantity;
        });
        
        // 3. スコアリングシステム
        if (currentCost > budget) {
            continue; // 予算オーバーは即失格
        }
        
        const score = calculateScore({
            proposal: currentProposal,
            totalCost: currentCost,
            budget,
            people,
            drinkOption,
            allowDuplicate,
            includeDessert
        });
        
        if (score > bestScore) {
            bestScore = score;
            bestProposal = JSON.parse(JSON.stringify(currentProposal)); // ディープコピー
        }
    }
    
    // 試行の結果、有効な提案が見つからなかった場合（予算が極端に低いなど）、最低限の提案を組み立てる
    if (!bestProposal) {
        bestProposal = getFallbackProposal(pool, budget, people, drinkOption);
    }
    
    // 結果のソート (カテゴリ順に並べると見栄えが良くなる)
    const categoryOrder = [
        CATEGORIES.DRINK_BAR,
        CATEGORIES.ALCOHOL,
        CATEGORIES.SALAD,
        CATEGORIES.SOUP,
        CATEGORIES.APPETIZER,
        CATEGORIES.LUNCH,
        CATEGORIES.MAIN_CARB,
        CATEGORIES.MAIN_PROTEIN,
        CATEGORIES.BREAD_RICE,
        CATEGORIES.DESSERT
    ];
    
    bestProposal.sort((a, b) => {
        return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
    });
    
    const totalCost = bestProposal.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // バランス統計の計算
    const stats = calculateStats(bestProposal, people);
    
    return {
        items: bestProposal,
        totalCost: totalCost,
        budget: budget,
        people: people,
        perPerson: Math.round(totalCost / people),
        remaining: budget - totalCost,
        score: bestScore,
        stats: stats
    };
}

// 補助：アイテムを追加または数量を増やす
function addOrIncrement(proposalArray, item) {
    const existing = proposalArray.find(i => i.id === item.id);
    if (existing) {
        existing.quantity++;
    } else {
        proposalArray.push({ ...item, quantity: 1 });
    }
}

/**
 * 提案メニューのスコアを厳密に評価する
 */
function calculateScore(data) {
    const { proposal, totalCost, budget, people, drinkOption, allowDuplicate, includeDessert } = data;
    
    let score = 0;
    
    // 1. 予算充足度 (満点: 35点)
    // 予算ギリギリ（90%〜100%）に収まるほど高得点。超えたらそもそも失格。
    const costRatio = totalCost / budget;
    if (costRatio >= 0.90 && costRatio <= 1.0) {
        score += 35;
    } else if (costRatio >= 0.75) {
        score += 25;
    } else if (costRatio >= 0.50) {
        score += 15;
    } else {
        score += 5;
    }
    
    // 2. ボリューム・満腹感 (満点: 35点)
    // 主食(MAIN_CARB, LUNCH)と主菜(MAIN_PROTEIN)の合計ボリュームが適切か
    let mainCount = 0;
    let saladCount = 0;
    let soupCount = 0;
    let appCount = 0;
    let dessertCount = 0;
    let duplicateCount = 0;
    let uniqueItems = 0;
    
    proposal.forEach(item => {
        uniqueItems++;
        if (item.quantity > 1) {
            duplicateCount += (item.quantity - 1);
        }
        
        if (item.category === CATEGORIES.MAIN_CARB || item.category === CATEGORIES.MAIN_PROTEIN || item.category === CATEGORIES.LUNCH) {
            mainCount += item.quantity;
        } else if (item.category === CATEGORIES.SALAD) {
            saladCount += item.quantity;
        } else if (item.category === CATEGORIES.SOUP) {
            soupCount += item.quantity;
        } else if (item.category === CATEGORIES.APPETIZER) {
            appCount += item.quantity;
        } else if (item.category === CATEGORIES.DESSERT) {
            dessertCount += item.quantity;
        }
    });
    
    // 主食＋主菜の理想数は人数とほぼ等しい (1人1品強が目安)
    const mainRatio = mainCount / people;
    if (mainRatio >= 0.9 && mainRatio <= 1.3) {
        score += 35;
    } else if (mainRatio >= 0.7 && mainRatio <= 1.5) {
        score += 20;
    } else {
        score += 5;
    }
    
    // 3. 栄養・サラダのバランス (満点: 15点)
    // ベジタブルが最低限入っているか
    if (saladCount >= 1) {
        score += 10;
        // 人数にふさわしい量ならさらに加点
        if (saladCount >= Math.ceil(people / 2)) {
            score += 5;
        }
    }
    
    // 4. 多様性（重複ペナルティ） (満点: 10点)
    if (!allowDuplicate) {
        if (duplicateCount === 0) {
            score += 10;
        } else {
            // 重複が多いと大幅に減点
            score += Math.max(0, 10 - duplicateCount * 3);
        }
    } else {
        // 重複許可されていても、色々な種類がある方が楽しいので少し加点
        if (duplicateCount === 0) {
            score += 5;
        }
    }
    
    // 5. アルコールとおつまみの相性ボーナス (満点: 5点)
    if (drinkOption === 'alcohol') {
        const hasGoodSnack = proposal.some(item => {
            // アルコールに合う定番おつまみ（辛味チキン、エスカルゴ、チョリソー、生ハム、モッツァレラなど）
            const goodIds = [1401, 1405, 1407, 1423, 1422, 1417, 1410];
            return goodIds.includes(item.id);
        });
        if (hasGoodSnack) {
            score += 5;
        }
    }
    
    // 6. デザートボーナス (満点: 5点)
    if (includeDessert && dessertCount >= 1) {
        score += 5;
    }
    
    return score;
}

/**
 * 予算が少なすぎる場合のフォールバック提案作成
 */
function getFallbackProposal(pool, budget, people, drinkOption) {
    const proposal = [];
    let currentCost = 0;
    
    // ドリンクバー優先
    if (drinkOption === 'drinkbar') {
        const dbItem = pool.find(item => item.id === 5101); // セット
        const singleDbItem = pool.find(item => item.id === 5103); // 単品
        
        const db = dbItem || singleDbItem;
        if (db && db.price * people <= budget) {
            proposal.push({ ...db, quantity: people });
            currentCost += db.price * people;
        }
    }
    
    // 安い主食を詰める (ミラノ風ドリア 300円、ペペロンチーノ 300円)
    const cheapFoods = pool.filter(item => 
        (item.category === CATEGORIES.MAIN_CARB || item.category === CATEGORIES.SALAD || item.category === CATEGORIES.APPETIZER) 
        && item.price <= 350
    ).sort((a, b) => a.price - b.price);
    
    for (const food of cheapFoods) {
        if (currentCost + food.price <= budget) {
            proposal.push({ ...food, quantity: 1 });
            currentCost += food.price;
        }
    }
    
    return proposal;
}

/**
 * 提案されたメニューのバランス統計を計算
 */
function calculateStats(items, people) {
    let carbCost = 0;
    let proteinCost = 0;
    let vegCost = 0;
    let otherCost = 0;
    
    items.forEach(item => {
        const cost = item.price * item.quantity;
        if (item.category === CATEGORIES.MAIN_CARB || item.category === CATEGORIES.BREAD_RICE) {
            carbCost += cost;
        } else if (item.category === CATEGORIES.MAIN_PROTEIN || item.id === 1401 || item.id === 1402 || item.id === 1452 || item.id === 1410) {
            // 肉料理、辛味チキン、アロスティチーニ、ムール貝はプロテイン
            proteinCost += cost;
        } else if (item.category === CATEGORIES.SALAD || item.category === CATEGORIES.SOUP || item.id === 1403 || item.id === 1413 || item.id === 1425) {
            // サラダ、スープ、ほうれん草、青豆、キャロットラペはベジタブル
            vegCost += cost;
        } else {
            otherCost += cost;
        }
    });
    
    const total = carbCost + proteinCost + vegCost + otherCost || 1;
    
    // 各項目のパーセンテージ
    const carbPct = Math.round((carbCost / total) * 100);
    const proteinPct = Math.round((proteinCost / total) * 100);
    const vegPct = Math.round((vegCost / total) * 100);
    const otherPct = 100 - (carbPct + proteinPct + vegPct);
    
    // スコアに基づく評価メッセージ
    let evalMsg = '';
    if (vegPct >= 20 && proteinPct >= 20 && carbPct >= 20) {
        evalMsg = 'サラダ、お肉、主食が完璧に揃った黄金バランスです！最高の組み合わせ！';
    } else if (vegPct < 10) {
        evalMsg = '少し緑黄色野菜が不足気味かも。お好みでサラダや青豆を追加してみてくださいね。';
    } else if (proteinPct < 15) {
        evalMsg = '炭水化物が多めです。お肉料理やチキンを追加すると、さらに満足度がアップします！';
    } else {
        evalMsg = '非常にオーソドックスで、満足感の高いバランスの取れたコースです。';
    }
    
    return {
        carb: carbPct,
        protein: proteinPct,
        vegetable: vegPct,
        other: otherPct,
        msg: evalMsg
    };
}

/**
 * 特定の料理を同カテゴリの別の料理に入れ替える (部分シャッフル)
 * @param {Array} currentItems - 現在提案中の全アイテムリスト
 * @param {number} swapItemId - 入れ替えたいアイテムID
 * @param {Object} params - 提案時のパラメータ
 * @returns {Array} スワップ後の新しいアイテムリスト（予算オーバー時はnull）
 */
function swapMenuItem(currentItems, swapItemId, params) {
    const { budget, includeLunch, includeDessert } = params;
    
    // 現在のアイテムリストのディープコピー
    const newItems = JSON.parse(JSON.stringify(currentItems));
    const itemIndex = newItems.findIndex(i => i.id === swapItemId);
    if (itemIndex === -1) return null;
    
    const itemToSwap = newItems[itemIndex];
    
    // 同一カテゴリかつ、異なるIDのプールを構築
    const pool = allMenuItems.filter(item => {
        if (item.id === swapItemId) return false;
        
        // 同一カテゴリ判定 (MAIN_CARB と LUNCH は主食として互換とする)
        const isCarbCompat = (itemToSwap.category === CATEGORIES.MAIN_CARB || itemToSwap.category === CATEGORIES.LUNCH) && 
                             (item.category === CATEGORIES.MAIN_CARB || item.category === CATEGORIES.LUNCH);
                             
        if (isCarbCompat) {
            if (item.category === CATEGORIES.LUNCH && !includeLunch) return false;
            return true;
        }
        
        return item.category === itemToSwap.category;
    });
    
    if (pool.length === 0) return null; // 入れ替え候補がない
    
    // シャッフルして予算を満たす最初の候補を見つける
    // ランダムにプールをシャッフル
    const shuffledPool = pool.sort(() => Math.random() - 0.5);
    
    // 現在の他のアイテムの合計価格を算出
    let otherCost = 0;
    newItems.forEach((item, index) => {
        if (index !== itemIndex) {
            otherCost += item.price * item.quantity;
        }
    });
    
    // 予算を満たし、現在のリストに含まれていないものを探す
    for (const candidate of shuffledPool) {
        // すでにリストにあるか確認
        const isAlreadySelected = newItems.some((item, index) => index !== itemIndex && item.id === candidate.id);
        if (isAlreadySelected) continue;
        
        const candidateCost = candidate.price * itemToSwap.quantity;
        if (otherCost + candidateCost <= budget) {
            // 入れ替え成功！
            newItems[itemIndex] = {
                ...candidate,
                quantity: itemToSwap.quantity
            };
            return newItems;
        }
    }
    
    // リストにすでにあっても重複許可されているか、他の選択肢がない場合は数量統合や無理やり入れ替え
    for (const candidate of shuffledPool) {
        const candidateCost = candidate.price * itemToSwap.quantity;
        if (otherCost + candidateCost <= budget) {
            newItems[itemIndex] = {
                ...candidate,
                quantity: itemToSwap.quantity
            };
            return newItems;
        }
    }
    
    return null; // 予算に収まる候補がなかった
}

/**
 * 注文リストからクリップボードコピー用のテキストを生成
 */
function generateOrderText(result) {
    let text = `===================================\n`;
    text += ` 🍷 サイゼリヤ・メニュー提案リスト 🍷\n`;
    text += `===================================\n`;
    text += `【設定】人数: ${result.people}人 / 予算: ${result.budget}円\n`;
    text += `【結果】合計金額: ${result.totalCost}円 (1人あたり約${result.perPerson}円)\n`;
    text += `        お釣り: ${result.remaining}円\n\n`;
    text += `■ 注文メニュー一覧:\n`;
    
    result.items.forEach(item => {
        const meta = CATEGORY_META[item.category] || { emoji: '✨', name: 'メニュー' };
        text += `${meta.emoji} [${item.id}] ${item.name}\n`;
        text += `   価格: ${item.price}円  ×  個数: ${item.quantity}  =  ${item.price * item.quantity}円\n`;
        if (item.notice) {
            text += `   ※備考: ${item.notice}\n`;
        }
    });
    
    text += `\n【栄養バランス】\n`;
    text += ` 🔶 炭水化物・主食 : ${result.stats.carb}%\n`;
    text += ` 🥩 タンパク質・肉 : ${result.stats.protein}%\n`;
    text += ` 🥗 ビタミン・野菜 : ${result.stats.vegetable}%\n`;
    text += ` 🍮 その他デザート : ${result.stats.other}%\n\n`;
    text += `💡 メッセージ:\n${result.stats.msg}\n`;
    text += `===================================`;
    
    return text;
}

// データ初期化を実行
initMenuData();

// ==========================================================================
// UI Controller / DOM Interaction
// ==========================================================================

let currentProposalResult = null; // 現在提案中の結果を保持

document.addEventListener('DOMContentLoaded', () => {
    // DOM要素の取得
    const budgetInput = document.getElementById('input-budget');
    const budgetBadge = document.getElementById('budget-badge');
    const peopleInput = document.getElementById('input-people');
    const btnPeopleMinus = document.getElementById('btn-people-minus');
    const btnPeoplePlus = document.getElementById('btn-people-plus');
    const btnGenerate = document.getElementById('btn-generate');
    
    const accordionToggle = document.getElementById('accordion-toggle');
    
    const panelEmpty = document.getElementById('panel-empty');
    const panelLoading = document.getElementById('panel-loading');
    const panelResult = document.getElementById('panel-result');
    
    const valTotalCost = document.getElementById('val-total-cost');
    const valPerPerson = document.getElementById('val-per-person');
    const valRemaining = document.getElementById('val-remaining');
    
    const textBudgetRatio = document.getElementById('text-budget-ratio');
    const barBudgetRatio = document.getElementById('bar-budget-ratio');
    const alcoholNotice = document.getElementById('banner-alcohol-notice');
    
    const pctCarb = document.getElementById('pct-carb');
    const pctProtein = document.getElementById('pct-protein');
    const pctVeg = document.getElementById('pct-veg');
    const pctOther = document.getElementById('pct-other');
    
    const barCarb = document.getElementById('bar-carb');
    const barProtein = document.getElementById('bar-protein');
    const barVeg = document.getElementById('bar-veg');
    const barOther = document.getElementById('bar-other');
    
    const textBalanceMsg = document.getElementById('text-balance-msg');
    const menuCardsList = document.getElementById('menu-cards-list');
    
    const btnShuffleAll = document.getElementById('btn-shuffle-all');
    const btnCopyOrder = document.getElementById('btn-copy-order');
    const toastNotif = document.getElementById('toast-notif');

    // 1. 予算表示の動的更新
    budgetInput.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        budgetBadge.textContent = `¥${val.toLocaleString()}`;
    });

    // 2. 人数カウンターの制御
    btnPeopleMinus.addEventListener('click', () => {
        let val = parseInt(peopleInput.value, 10);
        if (val > 1) {
            val--;
            peopleInput.value = val;
        }
    });

    btnPeoplePlus.addEventListener('click', () => {
        let val = parseInt(peopleInput.value, 10);
        if (val < 20) {
            val++;
            peopleInput.value = val;
        }
    });

    // 3. アコーディオンの制御
    accordionToggle.addEventListener('click', () => {
        accordionToggle.classList.toggle('active');
    });

    // 4. 提案の生成とアニメーション演出
    function generateNew() {
        const budget = parseInt(budgetInput.value, 10);
        const people = parseInt(peopleInput.value, 10);
        
        // ラジオボタンの選択値取得
        const drinkOption = document.querySelector('input[name="drink-opt"]:checked').value;
        
        // オプションフラグの取得
        const includeLunch = document.getElementById('opt-lunch').checked;
        const includeDessert = document.getElementById('opt-dessert').checked;
        const allowDuplicate = document.getElementById('opt-duplicate').checked;

        // UI表示の切り替え (ローディング中)
        panelEmpty.style.display = 'none';
        panelResult.style.display = 'none';
        panelLoading.style.display = 'flex';

        // 擬似的な読み込みディレイでスロット演出
        setTimeout(() => {
            const result = generateMenuProposal({
                budget,
                people,
                drinkOption,
                includeLunch,
                includeDessert,
                allowDuplicate
            });

            currentProposalResult = result;
            renderProposal(result);

            panelLoading.style.display = 'none';
            panelResult.style.display = 'block';
        }, 600);
    }

    btnGenerate.addEventListener('click', generateNew);
    btnShuffleAll.addEventListener('click', generateNew);

    // 5. 提案結果の描画
    function renderProposal(result) {
        valTotalCost.textContent = `¥${result.totalCost.toLocaleString()}`;
        valPerPerson.textContent = `¥${result.perPerson.toLocaleString()}`;
        valRemaining.textContent = `¥${result.remaining.toLocaleString()}`;

        // 予算メーターの更新
        const ratio = Math.round((result.totalCost / result.budget) * 100);
        textBudgetRatio.textContent = `${ratio}%`;
        barBudgetRatio.style.width = `${ratio}%`;

        // カラークラスのリセットと適用
        barBudgetRatio.className = 'meter-bar-inner';
        if (ratio >= 95) {
            barBudgetRatio.classList.add('danger');
        } else if (ratio >= 85) {
            barBudgetRatio.classList.add('warning');
        }

        // アルコールボトルの注意書き表示
        const hasBottle = result.items.some(item => item.notice && item.notice.includes('グラス'));
        if (hasBottle) {
            alcoholNotice.style.display = 'flex';
        } else {
            alcoholNotice.style.display = 'none';
        }

        // 栄養バランスの更新
        pctCarb.textContent = `${result.stats.carb}%`;
        pctProtein.textContent = `${result.stats.protein}%`;
        pctVeg.textContent = `${result.stats.vegetable}%`;
        pctOther.textContent = `${result.stats.other}%`;

        barCarb.style.width = `${result.stats.carb}%`;
        barProtein.style.width = `${result.stats.protein}%`;
        barVeg.style.width = `${result.stats.vegetable}%`;
        barOther.style.width = `${result.stats.other}%`;

        textBalanceMsg.textContent = result.stats.msg;

        // メニューカードの描画
        menuCardsList.innerHTML = '';
        result.items.forEach(item => {
            const meta = CATEGORY_META[item.category] || { name: 'その他', emoji: '✨' };
            const card = document.createElement('div');
            card.className = 'menu-card animated-item';
            
            // 部分シャッフル可能なカテゴリか (ドリンクバー等は除外)
            const isSwappable = ![CATEGORIES.DRINK_BAR].includes(item.category);
            const swapBtnHtml = isSwappable 
                ? `<button type="button" class="btn-card-action" data-id="${item.id}" title="このメニューだけを入れ替える">🔄</button>` 
                : '';

            card.innerHTML = `
                <div class="card-emoji">${meta.emoji}</div>
                <div class="card-details">
                    <span class="card-category-badge">${meta.name}</span>
                    <span class="card-name">[${item.id}] ${item.name}</span>
                    <span class="card-price-calc">
                        ¥${item.price.toLocaleString()}  ×  <span class="highlight">${item.quantity}</span>
                    </span>
                    ${item.notice ? `<span style="font-size:0.75rem; color:var(--color-yellow); margin-top:0.2rem;">※ ${item.notice}</span>` : ''}
                </div>
                <div class="card-total-cost">
                    <span class="card-subtotal">¥${(item.price * item.quantity).toLocaleString()}</span>
                </div>
                <div class="card-actions">
                    ${swapBtnHtml}
                </div>
            `;
            menuCardsList.appendChild(card);
        });

        // 部分シャッフルボタンのイベント紐付け
        const swapButtons = menuCardsList.querySelectorAll('.btn-card-action');
        swapButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idToSwap = parseInt(e.currentTarget.getAttribute('data-id'), 10);
                
                // パラメータの取得
                const includeLunch = document.getElementById('opt-lunch').checked;
                const includeDessert = document.getElementById('opt-dessert').checked;
                
                const newItems = swapMenuItem(result.items, idToSwap, {
                    budget: result.budget,
                    includeLunch,
                    includeDessert
                });

                if (newItems) {
                    // 結果データの再計算と再描画
                    const totalCost = newItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
                    result.items = newItems;
                    result.totalCost = totalCost;
                    result.perPerson = Math.round(totalCost / result.people);
                    result.remaining = result.budget - totalCost;
                    result.stats = calculateStats(newItems, result.people);
                    
                    // 再描画
                    renderProposal(result);
                    
                    // 部分シャッフル成功のトースト
                    showToast('🔄 メニューの一部を入れ替えました！');
                } else {
                    showToast('⚠️ 予算内に収まる入れ替え候補が見つかりませんでした');
                }
            });
        });
    }

    // 6. コピー機能
    btnCopyOrder.addEventListener('click', () => {
        if (!currentProposalResult) return;
        
        const orderText = generateOrderText(currentProposalResult);
        
        navigator.clipboard.writeText(orderText).then(() => {
            showToast('📋 注文リストをクリップボードにコピーしました！');
        }).catch(err => {
            console.error('Copy failed:', err);
            showToast('❌ コピーに失敗しました。手動でコピーしてください。');
        });
    });

    // トースト通知の表示
    function showToast(msg) {
        toastNotif.innerHTML = `<span>💡</span> ${msg}`;
        toastNotif.classList.add('active');
        setTimeout(() => {
            toastNotif.classList.remove('active');
        }, 2500);
    }
});
