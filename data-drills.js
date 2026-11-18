/* 面试专项训练数据：口译 / 综合知识问答 / 应变题 / 北京城市概况德语陈述 */

/* ===== 一、口译训练：dir = zh2de（中译德）或 de2zh（德译中） ===== */
window.INTERP = [
  { cat: '景点讲解', dir: 'zh2de', zh: '欢迎来到北京。北京是中华人民共和国的首都，也是一座有三千多年建城史的历史文化名城。', de: { a: 'i01', t: 'Willkommen in Beijing! Beijing ist die Hauptstadt der Volksrepublik China und eine historisch und kulturell bedeutende Stadt mit einer über dreitausendjährigen Stadtgeschichte.' } },
  { cat: '景点讲解', dir: 'zh2de', zh: '故宫又称紫禁城，是明清两代的皇宫，1987年被列入世界文化遗产名录。', de: { a: 'i02', t: 'Die Verbotene Stadt, auch Purpurne Verbotene Stadt genannt, war der Kaiserpalast der Ming- und Qing-Dynastie. Im Jahr 1987 wurde sie in die UNESCO-Welterbeliste aufgenommen.' } },
  { cat: '景点讲解', dir: 'zh2de', zh: '天坛是明清皇帝祭天、祈求丰收的场所，祈年殿全部为木结构，没有用一根钉子。', de: { a: 'i03', t: 'Der Himmelstempel war die Stätte, an der die Kaiser der Ming- und Qing-Dynastie dem Himmel opferten und für eine gute Ernte beteten. Die Halle des Gebets für gute Ernten ist eine reine Holzkonstruktion – ohne einen einzigen Nagel.' } },
  { cat: '景点讲解', dir: 'zh2de', zh: '颐和园是中国现存规模最大、保存最完整的皇家园林，1998年被列入世界遗产名录。', de: { a: 'i04', t: 'Der Sommerpalast ist der größte und am besten erhaltene kaiserliche Garten Chinas. Seit 1998 gehört er zum UNESCO-Weltkulturerbe.' } },
  { cat: '景点讲解', dir: 'zh2de', zh: '八达岭长城是明长城中保存最完好的一段。俗话说：“不到长城非好汉。”', de: { a: 'i05', t: 'Die Große Mauer bei Badaling ist der am besten erhaltene Abschnitt der Ming-Mauer. Ein bekanntes Sprichwort sagt: Wer nicht auf die Große Mauer gestiegen ist, ist kein wahrer Held.' } },
  { cat: '景点讲解', dir: 'zh2de', zh: '明十三陵位于北京西北约五十公里处，是明朝十三位皇帝的陵墓群。', de: { a: 'i06', t: 'Die Ming-Gräber liegen etwa fünfzig Kilometer nordwestlich von Beijing; dort ruhen dreizehn Kaiser der Ming-Dynastie.' } },
  { cat: '传统文化', dir: 'zh2de', zh: '春节是中国最重要的传统节日，家人团聚、吃年夜饭、贴春联。', de: { a: 'i07', t: 'Das Frühlingsfest ist das wichtigste traditionelle Fest Chinas: Die Familie kommt zusammen, man isst das Neujahrsessen und klebt Frühlingssprüche an die Tür.' } },
  { cat: '传统文化', dir: 'zh2de', zh: '京剧是中国的国粹，已有两百多年历史，表现手段包括唱、念、做、打。', de: { a: 'i08', t: 'Die Peking-Oper ist ein nationaler Kulturschatz Chinas mit einer über zweihundertjährigen Geschichte. Ihre Ausdrucksmittel sind Gesang, Rezitation, Bewegung und Kampfkunst.' } },
  { cat: '传统文化', dir: 'zh2de', zh: '中国有五十六个民族，汉族人口最多，各民族都有自己的风俗习惯。', de: { a: 'i09', t: 'China hat sechsundfünfzig Nationalitäten. Die Han-Chinesen stellen die größte Gruppe dar, und jede Nationalität hat ihre eigenen Bräuche.' } },
  { cat: '传统文化', dir: 'zh2de', zh: '胡同和四合院是北京传统民居的代表，体现了老北京的生活方式。', de: { a: 'i10', t: 'Die Hutong-Gassen und die Siheyuan-Höfe sind die typischen traditionellen Wohnformen Beijings; sie spiegeln die alte Lebensweise der Stadt wider.' } },
  { cat: '城市概况', dir: 'zh2de', zh: '北京常住人口两千一百多万，是全国的政治中心、文化中心和国际交往中心。', de: { a: 'i11', t: 'Beijing hat über einundzwanzig Millionen Einwohner. Es ist das politische, kulturelle und internationale Zentrum des Landes.' } },
  { cat: '城市概况', dir: 'zh2de', zh: '北京中轴线南起永定门，北至钟鼓楼，全长七点八公里，2024年列入世界遗产。', de: { a: 'i12', t: 'Die zentrale Achse Beijings verläuft vom Yongding-Tor im Süden bis zum Glocken- und Trommelturm im Norden über 7,8 Kilometer. Im Jahr 2024 wurde sie UNESCO-Weltkulturerbe.' } },
  { cat: '服务与应急', dir: 'zh2de', zh: '各位游客请注意，今天下午三点在停车场入口集合，请不要迟到。', de: { a: 'i13', t: 'Achtung, liebe Gäste: Wir treffen uns heute um 15 Uhr am Eingang des Parkplatzes. Bitte seien Sie pünktlich.' } },
  { cat: '服务与应急', dir: 'zh2de', zh: '如果您身体不舒服，请立刻告诉我，我会马上联系医院和旅行社。', de: { a: 'i14', t: 'Wenn Sie sich nicht wohl fühlen, sagen Sie mir bitte sofort Bescheid. Ich kontaktiere dann umgehend ein Krankenhaus und das Reisebüro.' } },
  { cat: '时政经济', dir: 'zh2de', zh: '中国坚持对外开放，欢迎各国游客来华旅游，推动文明交流互鉴。', de: { a: 'i15', t: 'China hält an der Öffnung nach außen fest, heißt Touristen aus aller Welt willkommen und fördert den Austausch und das gegenseitige Lernen zwischen den Kulturen.' } },
  { cat: '时政经济', dir: 'zh2de', zh: '绿色发展强调保护生态环境、节约资源，实现可持续发展。', de: { a: 'i16', t: 'Die grüne Entwicklung betont den Schutz der Umwelt und die Schonung der Ressourcen, um eine nachhaltige Entwicklung zu verwirklichen.' } },

  { cat: '景点讲解', dir: 'de2zh', zh: '北京是一座历史悠久、又拥有现代化天际线的城市。', de: { a: 'i17', t: 'Beijing ist eine Stadt mit einer langen Geschichte und einer modernen Skyline.' } },
  { cat: '景点讲解', dir: 'de2zh', zh: '故宫位于北京市中心，每年吸引数百万游客。', de: { a: 'i18', t: 'Die Verbotene Stadt liegt im Herzen von Beijing und zieht jedes Jahr Millionen Besucher an.' } },
  { cat: '服务与应急', dir: 'de2zh', zh: '请不要离团，并保管好您的贵重物品。', de: { a: 'i19', t: 'Bitte bleiben Sie bei der Gruppe und passen Sie auf Ihre Wertsachen auf.' } },
  { cat: '传统文化', dir: 'de2zh', zh: '春节是中国家庭团聚最重要的时刻。', de: { a: 'i20', t: 'Das Frühlingsfest ist die wichtigste Zeit für die Familienzusammenführung in China.' } },
  { cat: '时政经济', dir: 'de2zh', zh: '中国旅游业发展迅速，越来越多的人选择国内游和出境游。', de: { a: 'i21', t: 'Der Tourismus in China entwickelt sich schnell. Immer mehr Menschen reisen innerhalb des Landes oder ins Ausland.' } },
  { cat: '景点讲解', dir: 'de2zh', zh: '联合国教科文组织已将多处中国遗址列入世界遗产名录。', de: { a: 'i22', t: 'Die UNESCO hat viele chinesische Stätten in die Welterbeliste aufgenommen.' } },
  { cat: '服务与应急', dir: 'de2zh', zh: '我们今天的行程包括天坛和颐和园。', de: { a: 'i23', t: 'Unser heutiges Programm umfasst den Himmelstempel und den Sommerpalast.' } },
  { cat: '服务与应急', dir: 'de2zh', zh: '如果您有问题，我很乐意为您解答。', de: { a: 'i24', t: 'Wenn Sie Fragen haben, helfe ich Ihnen gern weiter.' } }
];

/* ===== 二、综合知识问答：中文问题 + 德语回答要点 ===== */
window.FAQ = [
  { cat: '城市概况', q: '请用德语简要介绍北京（城市概况）。', qde: { a: 'q01-0', t: 'Bitte stellen Sie die Stadt Beijing kurz vor.' }, points: [
    { a: 'q01-1', t: 'Beijing ist die Hauptstadt der Volksrepublik China und das politische, kulturelle und internationale Zentrum des Landes.' },
    { a: 'q01-2', t: 'Die Stadt hat eine über dreitausendjährige Geschichte und war Hauptstadt der Yuan-, Ming- und Qing-Dynastie.' },
    { a: 'q01-3', t: 'Beijing hat rund einundzwanzig Millionen Einwohner und sechzehn Stadtbezirke.' },
    { a: 'q01-4', t: 'Berühmt sind die zentrale Achse, die Hutongs, die Peking-Oper und die Peking-Ente.' }
  ] },
  { cat: '城市概况', q: '北京有哪些世界遗产？', qde: { a: 'q02-0', t: 'Welche UNESCO-Welterbestätten gibt es in Beijing?' }, points: [
    { a: 'q02-1', t: 'In Beijing gibt es mehrere UNESCO-Welterbestätten.' },
    { a: 'q02-2', t: 'Dazu gehören die Verbotene Stadt, die Große Mauer, der Himmelstempel und der Sommerpalast.' },
    { a: 'q02-3', t: 'Außerdem die Ming-Gräber, die Peking-Mensch-Stätte Zhoukoudian und der Große Kanal.' },
    { a: 'q02-4', t: 'Seit 2024 ist auch die zentrale Achse von Beijing UNESCO-Weltkulturerbe.' }
  ] },
  { cat: '城市概况', q: '什么是北京中轴线？', qde: { a: 'q03-0', t: 'Was versteht man unter der zentralen Achse von Beijing?' }, points: [
    { a: 'q03-1', t: 'Die zentrale Achse ist eine rund 7,8 Kilometer lange Achse von Süden nach Norden durch die Altstadt.' },
    { a: 'q03-2', t: 'Sie verläuft vom Yongding-Tor im Süden bis zum Glocken- und Trommelturm im Norden.' },
    { a: 'q03-3', t: 'An ihr liegen wichtige Bauwerke wie der Tiananmen-Platz, die Verbotene Stadt und der Hügel der Langlebigkeit.' },
    { a: 'q03-4', t: 'Sie zeigt das altchinesische Prinzip der symmetrischen Stadtplanung.' }
  ] },
  { cat: '六大景点', q: '故宫是什么时候建造的？有多大规模？', qde: { a: 'q04-0', t: 'Wann wurde die Verbotene Stadt erbaut? Wie groß ist sie?' }, points: [
    { a: 'q04-1', t: 'Die Verbotene Stadt wurde von 1406 bis 1420 unter Kaiser Yongle der Ming-Dynastie erbaut.' },
    { a: 'q04-2', t: 'Fast fünfhundert Jahre lang residierten hier vierundzwanzig Kaiser der Ming- und Qing-Dynastie.' },
    { a: 'q04-3', t: 'Der Komplex ist 720.000 Quadratmeter groß und hat fast neuntausend Zimmer.' },
    { a: 'q04-4', t: 'Seit 1925 ist er ein Museum, seit 1987 UNESCO-Weltkulturerbe.' }
  ] },
  { cat: '六大景点', q: '天坛的作用是什么？祈年殿有什么特点？', qde: { a: 'q05-0', t: 'Welche Funktion hatte der Himmelstempel? Was ist an der Halle des Gebets für gute Ernten besonders?' }, points: [
    { a: 'q05-1', t: 'Im Himmelstempel opferten die Kaiser der Ming- und Qing-Dynastie dem Himmel und beteten für eine gute Ernte.' },
    { a: 'q05-2', t: 'Die Halle des Gebets für gute Ernten ist achtunddreißig Meter hoch und dreißig Meter im Durchmesser.' },
    { a: 'q05-3', t: 'Ihr Dach wird von achtundzwanzig Holzsäulen getragen, ganz ohne einen einzigen Nagel.' },
    { a: 'q05-4', t: 'Die vier mittleren Säulen stehen für die vier Jahreszeiten, die zwölf inneren für die Monate.' }
  ] },
  { cat: '六大景点', q: '颐和园的长廊和十七孔桥有什么特别之处？', qde: { a: 'q06-0', t: 'Was ist am Langen Korridor und an der Siebzehn-Bogen-Brücke im Sommerpalast besonders?' }, points: [
    { a: 'q06-1', t: 'Der Lange Korridor ist 728 Meter lang und die längste bemalte Galerie der Welt.' },
    { a: 'q06-2', t: 'Auf seinen Balken sieht man über vierzehntausend traditionelle Gemälde.' },
    { a: 'q06-3', t: 'Die Siebzehn-Bogen-Brücke hat 544 steinerne Löwen – mehr als die Marco-Polo-Brücke.' },
    { a: 'q06-4', t: 'Drei Viertel der Anlage sind Wasser; der Kunming-See ist der Mittelpunkt.' }
  ] },
  { cat: '六大景点', q: '长城的历史作用是什么？', qde: { a: 'q07-0', t: 'Welche historische Rolle spielte die Große Mauer?' }, points: [
    { a: 'q07-1', t: 'Die Mauer diente der Verteidigung gegen die Nomadenvölker aus dem Norden.' },
    { a: 'q07-2', t: 'Auf den Signaltürmen wurde bei Gefahr Feuer oder Rauch entzündet, um Nachrichten schnell weiterzugeben.' },
    { a: 'q07-3', t: 'Alle Abschnitte aller Epochen zusammen sind über einundzwanzigtausend Kilometer lang.' },
    { a: 'q07-4', t: 'Der Abschnitt bei Badaling stammt aus der Ming-Dynastie und ist der bekannteste.' }
  ] },
  { cat: '六大景点', q: '明十三陵的风水格局如何？', qde: { a: 'q08-0', t: 'Wie ist die Anlage der Ming-Gräber nach den Regeln des Feng Shui gestaltet?' }, points: [
    { a: 'q08-1', t: 'Das Tal ist an drei Seiten von Bergen umgeben und öffnet sich nach Süden.' },
    { a: 'q08-2', t: 'Nach der Lehre des Feng Shui ist das ein idealer Ort der Ruhe und des Schutzes.' },
    { a: 'q08-3', t: 'Hier liegen dreizehn Kaiser, dreiundzwanzig Kaiserinnen sowie Prinzen und Prinzessinnen.' },
    { a: 'q08-4', t: 'Dingling ist das einzige Grab, das bisher archäologisch ausgegraben wurde.' }
  ] },
  { cat: '六大景点', q: '天安门广场周边有哪些重要建筑？', qde: { a: 'q09-0', t: 'Welche wichtigen Gebäude stehen rund um den Tiananmen-Platz?' }, points: [
    { a: 'q09-1', t: 'Im Norden steht das Tiananmen, im Westen die Große Halle des Volkes.' },
    { a: 'q09-2', t: 'Im Osten liegt das Nationalmuseum Chinas, im Süden die Gedenkhalle für Vorsitzenden Mao.' },
    { a: 'q09-3', t: 'In der Mitte steht das Denkmal für die Volkshelden aus dem Jahr 1958.' },
    { a: 'q09-4', t: 'Der Platz ist rund vierundvierzig Hektar groß und damit der größte innerstädtische Platz der Welt.' }
  ] },
  { cat: '其他景点', q: '请用德语各说一句：恭王府、雍和宫、孔庙和国子监、奥林匹克公园。', qde: { a: 'q10-0', t: 'Bitte sagen Sie jeweils einen Satz zum Prinz-Gong-Palast, zum Yonghe-Tempel, zum Konfuziustempel mit der Kaiserlichen Akademie und zum Olympiapark.' }, points: [
    { a: 'q10-1', t: 'Der Hof des Prinzen Gong ist der am besten erhaltene Prinzenpalast aus der Qing-Dynastie in Beijing.' },
    { a: 'q10-2', t: 'Der Yonghe-Tempel ist der größte und wichtigste lamaistische Tempel Beijings.' },
    { a: 'q10-3', t: 'Der Konfuziustempel und die Kaiserliche Akademie waren die höchste Bildungsstätte des alten China.' },
    { a: 'q10-4', t: 'Im Olympiapark stehen das Nationalstadion „Vogelnest" und das Nationale Schwimmzentrum „Wasserwürfel".' }
  ] },
  { cat: '其他景点', q: '北海、景山、什刹海怎么介绍？', qde: { a: 'q11-0', t: 'Wie stellt man den Beihai-Park, den Jingshan-Park und Shichahai vor?' }, points: [
    { a: 'q11-1', t: 'Der Beihai-Park ist einer der ältesten kaiserlichen Gärten Chinas; bekannt ist die Weiße Pagode.' },
    { a: 'q11-2', t: 'Vom Jingshan-Hügel hat man den besten Blick über die Verbotene Stadt.' },
    { a: 'q11-3', t: 'Shichahai ist ein beliebtes Viertel mit Seen, Hutongs und vielen Bars.' },
    { a: 'q11-4', t: 'Diese Orte liegen alle an oder nahe der zentralen Achse.' }
  ] },
  { cat: '传统文化', q: '请用德语介绍京剧。', qde: { a: 'q12-0', t: 'Bitte stellen Sie die Peking-Oper vor.' }, points: [
    { a: 'q12-1', t: 'Die Peking-Oper entstand vor über zweihundert Jahren und gilt als nationaler Kulturschatz.' },
    { a: 'q12-2', t: 'Sie verbindet Gesang, Rezitation, Bewegung und Kampfkunst.' },
    { a: 'q12-3', t: 'Die Rollen sind in vier Typen unterteilt: Sheng, Dan, Jing und Chou.' },
    { a: 'q12-4', t: 'Die farbigen Gesichtsmasken zeigen den Charakter der Figur.' }
  ] },
  { cat: '传统文化', q: '中国传统节日有哪些？春节怎么介绍？', qde: { a: 'q13-0', t: 'Welche traditionellen chinesischen Feste gibt es? Wie stellt man das Frühlingsfest vor?' }, points: [
    { a: 'q13-1', t: 'Wichtige Feste sind das Frühlingsfest, das Laternenfest, das Qingming-Fest, das Drachenbootfest und das Mittherbstfest.' },
    { a: 'q13-2', t: 'Das Frühlingsfest ist das wichtigste Fest; die Familie kommt zum Neujahrsessen zusammen.' },
    { a: 'q13-3', t: 'Man klebt Frühlingssprüche, zündet Feuerwerkskörper und die Kinder bekommen rote Umschläge.' },
    { a: 'q13-4', t: 'Das Fest dauert traditionell fünfzehn Tage bis zum Laternenfest.' }
  ] },
  { cat: '传统文化', q: '北京烤鸭和中国饮食文化怎么讲？', qde: { a: 'q14-0', t: 'Wie stellt man die Peking-Ente und die chinesische Esskultur vor?' }, points: [
    { a: 'q14-1', t: 'Die Peking-Ente ist das bekannteste Gericht der Stadt; sie wird in einem speziellen Ofen gebraten.' },
    { a: 'q14-2', t: 'Man isst sie mit Pfannkuchen, Frühlingszwiebeln und süßer Bohnensauce.' },
    { a: 'q14-3', t: 'Die chinesische Küche hat viele regionale Richtungen, zum Beispiel die kantonesische und die Sichuan-Küche.' },
    { a: 'q14-4', t: 'Bei Tisch ist es üblich, dass der Gastgeber dem Gast Speisen anbietet.' }
  ] },
  { cat: '传统文化', q: '什么是非物质文化遗产？举例说明。', qde: { a: 'q15-0', t: 'Was ist immaterielles Kulturerbe? Nennen Sie bitte Beispiele.' }, points: [
    { a: 'q15-1', t: 'Das immaterielle Kulturerbe umfasst Fertigkeiten und Bräuche, die von Generation zu Generation weitergegeben werden.' },
    { a: 'q15-2', t: 'Dazu gehören die Kalligrafie, der Papierschnitt, die Peking-Oper und die traditionelle Medizin.' },
    { a: 'q15-3', t: 'China hat viele Einträge auf der UNESCO-Liste des immateriellen Kulturerbes.' },
    { a: 'q15-4', t: 'Der Schutz dieser Traditionen ist heute eine wichtige Aufgabe.' }
  ] },
  { cat: '其他景点', q: '介绍一下北京的博物馆资源。', qde: { a: 'q16-0', t: 'Bitte stellen Sie die Museen in Beijing vor.' }, points: [
    { a: 'q16-1', t: 'Das Palastmuseum in der Verbotenen Stadt ist eines der größten Museen der Welt.' },
    { a: 'q16-2', t: 'Das Nationalmuseum Chinas zeigt über eine Million Exponate von der Bronzezeit bis heute.' },
    { a: 'q16-3', t: 'Daneben gibt es das Kunstmuseum, das Naturkundemuseum und das Wissenschaftsmuseum.' },
    { a: 'q16-4', t: 'Viele Museen sind heute bei Touristen sehr beliebt und oft kostenlos.' }
  ] },
  { cat: '条例与规范', q: '《北京市旅游条例》对导游有哪些要求？', qde: { a: 'q17-0', t: 'Welche Anforderungen stellt die Tourismusverordnung der Stadt Beijing an Reiseleiter?' }, points: [
    { a: 'q17-1', t: 'Der Reiseleiter muss die Gruppe sicher führen und die Rechte der Touristen achten.' },
    { a: 'q17-2', t: 'Er darf keine zusätzlichen Gebühren verlangen und keine Einkäufe erzwingen.' },
    { a: 'q17-3', t: 'Bei Notfällen muss er sofort Hilfe organisieren und das Reisebüro informieren.' },
    { a: 'q17-4', t: 'Er soll die Umwelt schützen und zivilisiertes Reisen fördern.' }
  ] },
  { cat: '条例与规范', q: '导游服务规范的主要内容是什么？', qde: { a: 'q18-0', t: 'Was sind die wichtigsten Inhalte der Servicestandards für Reiseleiter?' }, points: [
    { a: 'q18-1', t: 'Der Reiseleiter begrüßt die Gäste, stellt sich vor und erklärt das Programm.' },
    { a: 'q18-2', t: 'Er hält die Zeit ein, bleibt bei der Gruppe und trägt Verantwortung für die Sicherheit.' },
    { a: 'q18-3', t: 'Am Ende verabschiedet er sich und wünscht eine gute Weiterreise.' },
    { a: 'q18-4', t: 'Freundlichkeit, Pünktlichkeit und Fachwissen sind die wichtigsten Eigenschaften.' }
  ] },
  { cat: '时政', q: '2026 年文旅相关的时政热点有哪些关键词？', qde: { a: 'q19-0', t: 'Welche Schlagwörter sind 2026 für Kultur und Tourismus aktuell?' }, points: [
    { a: 'q19-1', t: 'Wichtige Themen sind die Integration von Kultur und Tourismus sowie der qualitativ hochwertige Tourismus.' },
    { a: 'q19-2', t: 'China erleichtert die Einreise für ausländische Touristen, zum Beispiel durch visumfreie Aufenthalte.' },
    { a: 'q19-3', t: 'Digitale Angebote wie Online-Buchungen und intelligente Museen werden gefördert.' },
    { a: 'q19-4', t: 'Auch die grüne Entwicklung und der Schutz des Kulturerbes sind zentrale Themen.' }
  ] },
  { cat: '时政', q: '红色旅游资源怎么介绍？', qde: { a: 'q20-0', t: 'Wie stellt man die Ressourcen des Roten Tourismus vor?' }, points: [
    { a: 'q20-1', t: 'Roter Tourismus führt zu Stätten der Revolution und der Parteigeschichte.' },
    { a: 'q20-2', t: 'In Beijing gehören dazu der Tiananmen-Platz und das Nationalmuseum.' },
    { a: 'q20-3', t: 'Solche Stätten dienen der politischen Bildung und dem Gedenken.' },
    { a: 'q20-4', t: 'Viele dieser Orte sind heute kostenlos zugänglich.' }
  ] },

  /* ---- 以下为 2026 官方参考资料新增板块（中轴线 / 大运河 / 恭王府 / 雍和宫 / 奥林匹克 / 周口店 / 北海景山 / 孔庙国子监 / 世界遗产 / 非遗 / 胡同 / 老字号 / 博物馆 / 景点数字） ---- */
  { cat: '中轴线', q: '北京中轴线的起止、长度、申遗时间？', qde: { a: 'q21-0', t: 'Wo beginnt und endet die zentrale Achse von Beijing? Wie lang ist sie, und wann wurde sie Weltkulturerbe?' }, points: [
    { a: 'q21-1', t: 'Die zentrale Achse Beijings verläuft vom Yongding-Tor im Süden bis zum Glocken- und Trommelturm im Norden.' },
    { a: 'q21-2', t: 'Sie ist 7,8 Kilometer lang und damit die längste städtische Nord-Süd-Achse der Welt.' },
    { a: 'q21-3', t: 'Im Juli 2024 wurde sie in die UNESCO-Welterbeliste aufgenommen.' },
    { a: 'q21-4', t: 'Zum Welterbe gehören fünfzehn einzelne Bestandteile.' }
  ] },
  { cat: '中轴线', q: '中轴线体现了什么理念？有哪些主要建筑？', qde: { a: 'q22-0', t: 'Welche Idee verkörpert die zentrale Achse? Welche Bauwerke liegen an ihr?' }, points: [
    { a: 'q22-1', t: 'Die Achse verkörpert die chinesische Idee von Mitte und Harmonie.' },
    { a: 'q22-2', t: 'Sie folgt den Regeln des klassischen Buches der Riten von Zhou für den Bau einer Hauptstadt.' },
    { a: 'q22-3', t: 'Von Süden nach Norden liegen das Yongding-Tor, das Zhengyang-Tor, Tiananmen, die Verbotene Stadt und der Jingshan-Hügel.' },
    { a: 'q22-4', t: 'An den Seiten stehen der Ahnentempel, der Altar für Erde und Getreide, der Himmelstempel und der Altar für die Landwirtschaft.' }
  ] },
  { cat: '中轴线', q: '钟鼓楼、万宁桥、中轴线北延？', qde: { a: 'q23-0', t: 'Was wissen Sie über den Glocken- und Trommelturm, die Wanning-Brücke und die nördliche Verlängerung der Achse?' }, points: [
    { a: 'q23-1', t: 'Glocken- und Trommelturm gaben früher die Zeit an: abends die Trommel, morgens die Glocke.' },
    { a: 'q23-2', t: 'Die Wanning-Brücke ist die älteste Brücke an der Achse und stammt aus der Yuan-Dynastie.' },
    { a: 'q23-3', t: 'Dort kreuzt der kaiserliche Kanal die Achse.' },
    { a: 'q23-4', t: 'Die Achse wurde zweimal nach Norden verlängert: für die Asienspiele 1990 und für die Olympischen Spiele 2008.' }
  ] },
  { cat: '大运河', q: '中国大运河的申遗时间、规模与组成？', qde: { a: 'q24-0', t: 'Wann wurde der Große Kanal Weltkulturerbe? Wie groß ist er und woraus besteht er?' }, points: [
    { a: 'q24-1', t: 'Der Große Kanal Chinas wurde am 22. Juni 2014 UNESCO-Weltkulturerbe.' },
    { a: 'q24-2', t: 'Er ist rund dreitausendzweihundert Kilometer lang und verbindet fünf Flusssysteme.' },
    { a: 'q24-3', t: 'Das Welterbe besteht aus dem Sui-Tang-Kanal, dem Peking-Hangzhou-Kanal und dem Ost-Zhejiang-Kanal.' },
    { a: 'q24-4', t: 'Er gilt als der längste und älteste künstliche Kanal der Welt.' }
  ] },
  { cat: '大运河', q: '通惠河是谁开挖的？北京段有什么？', qde: { a: 'q25-0', t: 'Wer ließ den Tonghui-Kanal anlegen? Was gibt es am Pekinger Abschnitt?' }, points: [
    { a: 'q25-1', t: 'Der Tonghui-Kanal wurde in der Yuan-Dynastie von dem Wissenschaftler Guo Shoujing angelegt.' },
    { a: 'q25-2', t: 'Dadurch konnten Schiffe mit Getreide bis in das Stadtinnere fahren.' },
    { a: 'q25-3', t: 'In Beijing gehören Abschnitte des Tonghui-Kanals in der Altstadt zum Welterbe.' },
    { a: 'q25-4', t: 'Die Nanxin-Speicher sind die am besten erhaltenen kaiserlichen Getreidespeicher der Stadt.' }
  ] },
  { cat: '恭王府', q: '恭王府的主人是谁？为什么叫"半部清代史"？', qde: { a: 'q26-0', t: 'Wem gehörte der Prinz-Gong-Palast? Warum nennt man ihn eine halbe Geschichte der Qing-Dynastie?' }, points: [
    { a: 'q26-1', t: 'Der Prinz-Gong-Palast hatte drei berühmte Besitzer: den Minister Heshen, Prinz Qing und schließlich Prinz Gong.' },
    { a: 'q26-2', t: 'Seinen heutigen Namen verdankt er Prinz Gong.' },
    { a: 'q26-3', t: 'Der Geograph Hou Renzhi sagte: Ein Prinz-Gong-Palast ist die halbe Geschichte der Qing-Dynastie.' },
    { a: 'q26-4', t: 'Er ist der einzige vollständig erhaltene und öffentlich zugängliche Prinzenpalast der Qing-Zeit in China.' }
  ] },
  { cat: '恭王府', q: '恭王府的布局与"三绝"？', qde: { a: 'q27-0', t: 'Wie ist der Prinz-Gong-Palast angelegt? Was sind seine drei Besonderheiten?' }, points: [
    { a: 'q27-1', t: 'Die Anlage umfasst rund sechzigtausend Quadratmeter und besteht aus dem Wohnbereich und dem Garten.' },
    { a: 'q27-2', t: 'Der Garten trägt den Namen Garten der gesammelten Schönheit.' },
    { a: 'q27-3', t: 'Drei Besonderheiten sind das westliche Tor, die große Opernbühne und die Fu-Stele mit der Kalligrafie von Kaiser Kangxi.' },
    { a: 'q27-4', t: 'Das nördliche Abschlussgebäude ist über hundertachtzig Meter lang und hat über hundert Räume.' }
  ] },
  { cat: '雍和宫', q: '雍和宫的历史与教派？', qde: { a: 'q28-0', t: 'Welche Geschichte und welche Schule des Buddhismus hat der Yonghe-Tempel?' }, points: [
    { a: 'q28-1', t: 'Ursprünglich war der Yonghe-Tempel die Residenz des späteren Kaisers Yongzheng.' },
    { a: 'q28-2', t: 'Im Jahr 1744 wurde er in ein Kloster des tibetischen Buddhismus umgewandelt.' },
    { a: 'q28-3', t: 'Er gehört zur Gelug-Schule, die von dem Meister Tsongkhapa gegründet wurde.' },
    { a: 'q28-4', t: 'Der Tempel war auch ein wichtiges Bindeglied zu Tibet und zur Mongolei.' }
  ] },
  { cat: '雍和宫', q: '雍和宫的"木雕三绝"和万福阁？', qde: { a: 'q29-0', t: 'Was sind die drei Holz schnitzkunst-Wunder und die Halle der Zehntausend Glückszeichen im Yonghe-Tempel?' }, points: [
    { a: 'q29-1', t: 'Die drei berühmten Holzschnitzereien sind der Berg der fünfhundert Arhats aus Rosenholz, die Maitreya-Statue und der Schrein aus Nanmu-Holz.' },
    { a: 'q29-2', t: 'Die Maitreya-Statue wurde aus einem einzigen Stück Sandelholz geschnitzt.' },
    { a: 'q29-3', t: 'Sie steht in der Halle der Zehntausend Segnungen, dem größten Gebäude der Anlage.' },
    { a: 'q29-4', t: 'Ihren Namen verdankt die Halle den unzähligen kleinen Buddhafiguren an den Wänden.' }
  ] },
  { cat: '奥林匹克', q: '为什么说北京是"双奥之城"？', qde: { a: 'q30-0', t: 'Warum nennt man Beijing die Stadt der zwei Olympiaden?' }, points: [
    { a: 'q30-1', t: 'Beijing ist die einzige Stadt der Welt, die sowohl Sommer- als auch Winterspiele ausgerichtet hat.' },
    { a: 'q30-2', t: 'Die Sommerspiele fanden 2008 statt, die Winterspiele 2022.' },
    { a: 'q30-3', t: 'Die Winterspiele wurden in drei Zonen ausgetragen: Beijing, Yanqing und Zhangjiakou.' },
    { a: 'q30-4', t: 'Das Maskottchen der Winterspiele hieß Bing Dwen Dwen.' }
  ] },
  { cat: '奥林匹克', q: '鸟巢和水立方各有什么特点？', qde: { a: 'q31-0', t: 'Was kennzeichnet das Vogelnest und den Wasserwürfel?' }, points: [
    { a: 'q31-1', t: 'Das Nationalstadion wird wegen seiner Stahlstruktur das Vogelnest genannt.' },
    { a: 'q31-2', t: 'Es war das Hauptstadion der Sommerspiele 2008 und bietet rund achtzigtausend Zuschauern Platz.' },
    { a: 'q31-3', t: 'Das Nationale Schwimmzentrum heißt wegen seiner Fassade der Wasserwürfel.' },
    { a: 'q31-4', t: 'Für die Winterspiele 2022 wurde es zum Eiswürfel umgebaut; dort wurde Curling gespielt.' }
  ] },
  { cat: '周口店', q: '周口店北京人遗址怎么介绍？', qde: { a: 'q32-0', t: 'Bitte stellen Sie die Fundstätte des Peking-Menschen in Zhoukoudian vor.' }, points: [
    { a: 'q32-1', t: 'Zhoukoudian liegt im Südwesten von Beijing und ist eine der wichtigsten Fundstätten der Menschheit.' },
    { a: 'q32-2', t: 'Der Peking-Mensch lebte dort vor etwa siebenhunderttausend bis zweihunderttausend Jahren.' },
    { a: 'q32-3', t: 'Im Jahr 1929 entdeckte Pei Wenzhong den ersten vollständigen Schädel.' },
    { a: 'q32-4', t: 'Die Fundstätte wurde 1987 in die UNESCO-Welterbeliste aufgenommen.' }
  ] },
  { cat: '北海景山', q: '北海和景山有哪些主要看点？', qde: { a: 'q33-0', t: 'Welche Sehenswürdigkeiten haben der Beihai-Park und der Jingshan-Park?' }, points: [
    { a: 'q33-1', t: 'Der Beihai-Park ist einer der ältesten kaiserlichen Gärten Chinas.' },
    { a: 'q33-2', t: 'Auf der Insel Qionghua steht die weiße Pagode im tibetischen Stil aus dem Jahr 1651.' },
    { a: 'q33-3', t: 'Berühmt ist auch die Neun-Drachen-Mauer aus glasierter Keramik.' },
    { a: 'q33-4', t: 'Vom Jingshan-Hügel im Osten hat man den besten Blick über die Verbotene Stadt.' }
  ] },
  { cat: '北海景山', q: '景山五亭与崇祯帝的典故？', qde: { a: 'q34-0', t: 'Was wissen Sie über die fünf Pavillons auf dem Jingshan und über Kaiser Chongzhen?' }, points: [
    { a: 'q34-1', t: 'Auf dem Jingshan-Hügel stehen fünf Pavillons in einer Reihe von Ost nach West.' },
    { a: 'q34-2', t: 'Der mittlere Pavillon Wanchun ist der höchste Punkt an der zentralen Achse.' },
    { a: 'q34-3', t: 'Dort hat man einen herrlichen Blick über die ganze Altstadt.' },
    { a: 'q34-4', t: 'Im Jahr 1644 endete hier die Ming-Dynastie: Der letzte Kaiser Chongzhen nahm sich am Osthang des Hügels das Leben.' }
  ] },
  { cat: '孔庙国子监', q: '孔庙和国子监是什么地方？', qde: { a: 'q35-0', t: 'Was sind der Konfuziustempel und die Kaiserliche Akademie?' }, points: [
    { a: 'q35-1', t: 'Der Konfuziustempel und die Kaiserliche Akademie liegen nebeneinander in der Guozijian-Straße.' },
    { a: 'q35-2', t: 'Nach der alten Regel steht der Tempel links und die Schule rechts.' },
    { a: 'q35-3', t: 'Hier wurden Konfuzius verehrt und die höchsten Beamten des Reiches ausgebildet.' },
    { a: 'q35-4', t: 'Das Zentrum der Akademie ist die Piyong-Halle, in der der Kaiser selbst Vorlesungen hielt.' }
  ] },
  { cat: '孔庙国子监', q: '孔庙里的石碑和"十三经"？', qde: { a: 'q36-0', t: 'Was hat es mit den Steinstelen und den Dreizehn Klassikern im Konfuziustempel auf sich?' }, points: [
    { a: 'q36-1', t: 'Im Hof stehen Steinstelen mit den Namen aller erfolgreichen Prüflinge aus drei Dynastien.' },
    { a: 'q36-2', t: 'Sie verzeichnen über fünfzigtausend Gelehrte.' },
    { a: 'q36-3', t: 'Die Steininschriften der dreizehn konfuzianischen Klassiker wurden von Jiang Heng in zwölf Jahren geschrieben.' },
    { a: 'q36-4', t: 'Insgesamt sind es fast zweihundert Stelen mit über sechshunderttausend Schriftzeichen.' }
  ] },
  { cat: '世界遗产', q: '北京有几处世界文化遗产？分别是哪些？', qde: { a: 'q37-0', t: 'Wie viele Weltkulturerbestätten hat Beijing? Welche sind es?' }, points: [
    { a: 'q37-1', t: 'Beijing besitzt heute acht Welterbestätten.' },
    { a: 'q37-2', t: 'Dazu gehören die Verbotene Stadt, die Große Mauer und die Fundstätte Zhoukoudian, alle seit 1987.' },
    { a: 'q37-3', t: 'Der Himmelstempel und der Sommerpalast kamen 1998 hinzu, die Ming-Gräber im Jahr 2003.' },
    { a: 'q37-4', t: 'Der Große Kanal folgt 2014 und die zentrale Achse im Jahr 2024.' }
  ] },
  { cat: '非遗', q: '中国有哪些世界非物质文化遗产？', qde: { a: 'q38-0', t: 'Welches immaterielle Kulturerbe Chinas steht auf der UNESCO-Liste?' }, points: [
    { a: 'q38-1', t: 'Das immaterielle Kulturerbe umfasst Fertigkeiten und Bräuche, die über Generationen weitergegeben werden.' },
    { a: 'q38-2', t: 'Dazu gehören die Kunqu-Oper, die Guqin-Musik und die Peking-Oper.' },
    { a: 'q38-3', t: 'Auch die traditionelle chinesische Medizin mit Akupunktur steht auf der Liste.' },
    { a: 'q38-4', t: 'In den letzten Jahren kamen das Mondfest, das Taijiquan, die Teekultur und das Frühlingsfest hinzu.' }
  ] },
  { cat: '非遗', q: '京剧的四大名旦和四大行当？', qde: { a: 'q39-0', t: 'Wer sind die vier großen Dan, und welches sind die vier Rollenfächer der Peking-Oper?' }, points: [
    { a: 'q39-1', t: 'Die vier berühmten Darstellerinnen der Peking-Oper waren Mei Lanfang, Cheng Yanqiu, Shang Xiaoyun und Xun Huisheng.' },
    { a: 'q39-2', t: 'Die Rollen sind in vier Typen unterteilt: Sheng, Dan, Jing und Chou.' },
    { a: 'q39-3', t: 'Sheng sind die Männerrollen, Dan die Frauenrollen.' },
    { a: 'q39-4', t: 'Jing sind Helden mit bemaltem Gesicht, Chou sind die komischen Rollen.' }
  ] },
  { cat: '胡同四合院', q: '北京胡同之最和四合院的形制？', qde: { a: 'q40-0', t: 'Welche Superlative gibt es bei den Hutongs? Wie ist ein Siheyuan-Hof aufgebaut?' }, points: [
    { a: 'q40-1', t: 'Der längste Hutong ist Dongjiaominxiang mit etwa drei Kilometern.' },
    { a: 'q40-2', t: 'Der schmalste ist der Qianshi-Hutong mit nur etwa vierzig Zentimetern Breite.' },
    { a: 'q40-3', t: 'Ein Siheyuan ist ein Hofhaus mit vier Gebäuden rings um einen quadratischen Innenhof.' },
    { a: 'q40-4', t: 'Die Rangstufe des Besitzers erkennt man an der Form des Tores und am Windschirmwall.' }
  ] },
  { cat: '老字号', q: '北京有哪些著名老字号？', qde: { a: 'q41-0', t: 'Welche bekannten alten Traditionsmarken gibt es in Beijing?' }, points: [
    { a: 'q41-1', t: 'Die bekannteste alte Firma ist Quanjude mit der Peking-Ente, gegründet 1864.' },
    { a: 'q41-2', t: 'Die Apotheke Tongrentang gibt es seit 1669 und ist für ihre strenge Qualität berühmt.' },
    { a: 'q41-3', t: 'Neiliansheng gilt als das erste Schuhhaus Chinas, Ruifuxiang ist für Seide bekannt.' },
    { a: 'q41-4', t: 'Liubiju stellt seit über vierhundert Jahren eingelegtes Gemüse her.' }
  ] },
  { cat: '博物馆', q: '北京有哪些重要博物馆？', qde: { a: 'q42-0', t: 'Welche wichtigen Museen gibt es in Beijing?' }, points: [
    { a: 'q42-1', t: 'Der Internationale Museumstag ist jedes Jahr der 18. Mai.' },
    { a: 'q42-2', t: 'Das Nationalmuseum am Tiananmen-Platz zeigt die Geschichte Chinas von den Anfängen bis heute.' },
    { a: 'q42-3', t: 'Das Hauptstadtmuseum ist vor allem der Geschichte Beijings gewidmet.' },
    { a: 'q42-4', t: 'Daneben gibt es das Wissenschafts- und Technikmuseum, das Kunstmuseum und das Eisenbahnmuseum.' }
  ] },
  { cat: '六大景点', q: '天安门广场有哪些关键数字？', qde: { a: 'q43-0', t: 'Welche wichtigen Zahlen gibt es zum Tiananmen-Platz?' }, points: [
    { a: 'q43-1', t: 'Der Tiananmen-Platz ist achthundertachtzig Meter lang und fünfhundert Meter breit.' },
    { a: 'q43-2', t: 'Seine Fläche beträgt vierhundertvierzigtausend Quadratmeter; er fasst bis zu einer Million Menschen.' },
    { a: 'q43-3', t: 'Damit ist er der größte innerstädtische Platz der Welt.' },
    { a: 'q43-4', t: 'In der Mitte steht das Denkmal für die Volkshelden, im Süden die Gedenkhalle für Mao Zedong.' }
  ] },
  { cat: '六大景点', q: '长城有哪些关键数字和构造要点？', qde: { a: 'q44-0', t: 'Welche wichtigen Zahlen und Konstruktionsmerkmale hat die Große Mauer?' }, points: [
    { a: 'q44-1', t: 'Die Ming-Mauer reicht von Hushan in Liaoning bis Jiayuguan in Gansu.' },
    { a: 'q44-2', t: 'Ihre Länge wurde 2009 mit achttausendachthunderteinundfünfzig Kilometern angegeben.' },
    { a: 'q44-3', t: 'In Beijing selbst sind rund sechshundert Kilometer erhalten, verteilt über sechs Bezirke.' },
    { a: 'q44-4', t: 'Wichtig sind die Wachtürme zum Wohnen und Lagern sowie die Signalfeuer für die Nachrichtenübermittlung.' }
  ] }
];

/* ===== 三、应变题：情景 + 德语应答模板（STAR 结构） ===== */
window.SOS = [
  { s: '游客迟到，全团等候超过约定时间。', cat: '团队管理', steps: [
    { a: 's01-1', t: 'Entschuldigung, ich habe die Situation verstanden: Ein Gast fehlt noch, die Gruppe muss warten.' },
    { a: 's01-2', t: 'Zuerst rufe ich den Gast an oder lasse ihn über die Hotelrezeption suchen.' },
    { a: 's01-3', t: 'Dann informiere ich die anderen Gäste und biete eine kurze Pause an.' },
    { a: 's01-4', t: 'Zum Schluss passe ich das Programm an und hole die verlorene Zeit auf.' }
  ] },
  { s: '游客在景点走失。', cat: '安全', steps: [
    { a: 's02-1', t: 'Ich verstehe: Ein Gast hat die Gruppe verloren. Sicherheit hat jetzt Vorrang.' },
    { a: 's02-2', t: 'Erstens lasse ich die Gruppe an einem festen Punkt warten, zweitens rufe ich den Gast an.' },
    { a: 's02-3', t: 'Drittens informiere ich die Sicherheit des Parks und lasse über Lautsprecher suchen.' },
    { a: 's02-4', t: 'Danach melde ich den Vorfall dem Reisebüro und dokumentiere alles.' }
  ] },
  { s: '游客突发疾病（如心脏病、中暑）。', cat: '安全', steps: [
    { a: 's03-1', t: 'Ich sehe, dass ein Gast dringend Hilfe braucht; die Gesundheit geht vor.' },
    { a: 's03-2', t: 'Zuerst beruhige ich den Gast und lasse ihn sich setzen oder hinlegen.' },
    { a: 's03-3', t: 'Dann rufe ich den Notarzt unter 120 und informiere das Reisebüro.' },
    { a: 's03-4', t: 'Ich begleite den Gast ins Krankenhaus und kümmere mich um die übrige Gruppe.' }
  ] },
  { s: '游客遗失护照或贵重物品。', cat: '服务', steps: [
    { a: 's04-1', t: 'Ich verstehe: Ein Gast hat seinen Pass beziehungsweise Wertsachen verloren.' },
    { a: 's04-2', t: 'Zuerst suchen wir gemeinsam an den letzten Stationen und fragen beim Fundbüro nach.' },
    { a: 's04-3', t: 'Dann melde ich den Verlust der Polizei und helfe bei der Meldung.' },
    { a: 's04-4', t: 'Anschließend begleite ich den Gast zur Botschaft oder zum Konsulat für Ersatzpapiere.' }
  ] },
  { s: '景区临时关闭或天气恶劣，行程必须变更。', cat: '行程变更', steps: [
    { a: 's05-1', t: 'Ich habe verstanden: Das geplante Programm kann heute nicht stattfinden.' },
    { a: 's05-2', t: 'Erstens informiere ich die Gäste offen über den Grund, zweitens schlage ich eine Alternative vor.' },
    { a: 's05-3', t: 'Drittens kläre ich die Kosten mit dem Reisebüro und biete eine faire Lösung an.' },
    { a: 's05-4', t: 'Zum Schluss frage ich nach der Meinung der Gäste und entscheide gemeinsam mit ihnen.' }
  ] },
  { s: '游客对餐饮不满，或有人食物过敏。', cat: '服务', steps: [
    { a: 's06-1', t: 'Ich verstehe: Ein Gast ist mit dem Essen nicht zufrieden beziehungsweise hat eine Allergie.' },
    { a: 's06-2', t: 'Bei einer Allergie frage ich sofort nach den Symptomen und rufe bei Bedarf einen Arzt.' },
    { a: 's06-3', t: 'Ich spreche mit dem Restaurant und lasse ein anderes Gericht zubereiten.' },
    { a: 's06-4', t: 'Danach entschuldige ich mich und achte bei den nächsten Mahlzeiten besonders darauf.' }
  ] },
  { s: '游客之间发生争执。', cat: '团队管理', steps: [
    { a: 's07-1', t: 'Ich sehe: Es gibt einen Streit zwischen zwei Gästen. Ruhe ist jetzt wichtig.' },
    { a: 's07-2', t: 'Zuerst trenne ich die beiden und bitte sie, ruhig zu bleiben.' },
    { a: 's07-3', t: 'Dann höre ich beiden Seiten zu und schlage einen Kompromiss vor.' },
    { a: 's07-4', t: 'Wenn nötig informiere ich das Reisebüro und dokumentiere den Vorfall.' }
  ] },
  { s: '游客要求增加购物点，或投诉强制购物。', cat: '规范', steps: [
    { a: 's08-1', t: 'Ich verstehe den Wunsch, aber Einkäufe sind im Programm genau festgelegt.' },
    { a: 's08-2', t: 'Ich erkläre höflich, dass wir die Regeln des Reisevertrags einhalten müssen.' },
    { a: 's08-3', t: 'Ich weise auf die Bestimmungen des Tourismusgesetzes und der Pekinger Tourismusverordnung hin.' },
    { a: 's08-4', t: 'Bei einer Beschwerde nehme ich sie ernst und melde sie dem Reisebüro.' }
  ] },
  { s: '旅游车故障或发生交通事故。', cat: '安全', steps: [
    { a: 's09-1', t: 'Ich verstehe: Unser Bus ist ausgefallen beziehungsweise es gab einen Unfall.' },
    { a: 's09-2', t: 'Zuerst bringe ich alle Gäste an einen sicheren Ort und prüfe, ob jemand verletzt ist.' },
    { a: 's09-3', t: 'Dann rufe ich Polizei, Notarzt und das Reisebüro an und lasse einen Ersatzbus kommen.' },
    { a: 's09-4', t: 'Während der Wartezeit betreue ich die Gruppe und erkläre das weitere Vorgehen.' }
  ] },
  { s: '火灾、地震等突发公共事件。', cat: '安全', steps: [
    { a: 's10-1', t: 'Ich sehe: Es besteht eine akute Gefahr, die Sicherheit der Gäste geht absolut vor.' },
    { a: 's10-2', t: 'Zuerst bewahre ich Ruhe und führe die Gruppe zum nächsten Notausgang.' },
    { a: 's10-3', t: 'Dann zähle ich die Gäste durch und suche nach fehlenden Personen.' },
    { a: 's10-4', t: 'Danach melde ich den Vorfall den Rettungskräften und dem Reisebüro und warte weitere Anweisungen ab.' }
  ] },
  { s: '游客提出敏感的政治或宗教问题。', cat: '沟通', steps: [
    { a: 's11-1', t: 'Ich danke für die Frage und bleibe höflich und sachlich.' },
    { a: 's11-2', t: 'Ich antworte neutral und berufe mich auf allgemein bekannte Fakten.' },
    { a: 's11-3', t: 'Wenn das Thema zu sensibel ist, sage ich offen: „Dazu kann ich keine fundierte Auskunft geben."' },
    { a: 's11-4', t: 'Dann lenke ich das Gespräch zurück zum kulturellen Thema unserer Reise.' }
  ] },
  { s: '儿童在景区走失。', cat: '安全', steps: [
    { a: 's12-1', t: 'Ich verstehe: Ein Kind wird vermisst. Wir handeln sofort und ruhig.' },
    { a: 's12-2', t: 'Zuerst sichere ich den Bereich und bitte die Eltern, am letzten Ort zu bleiben.' },
    { a: 's12-3', t: 'Dann informiere ich das Personal des Parks und lasse über die Lautsprecheransage suchen.' },
    { a: 's12-4', t: 'Parallel rufe ich die Sicherheit und, falls nötig, die Polizei unter 110.' }
  ] }
];

/* ===== 四、北京城市概况德语陈述（约 3 分钟，综合问答可直接复用） ===== */
window.CITY = [
  { a: 'c01', t: 'Meine Damen und Herren, ich möchte Ihnen kurz die Stadt Beijing vorstellen. Beijing ist die Hauptstadt der Volksrepublik China und das politische, kulturelle und internationale Zentrum des Landes.' },
  { a: 'c02', t: 'Die Stadt hat eine über dreitausendjährige Geschichte. Sie war Hauptstadt der Yuan-, Ming- und Qing-Dynastie. Heute leben hier rund einundzwanzig Millionen Menschen in sechzehn Stadtbezirken.' },
  { a: 'c03', t: 'Das Wahrzeichen der alten Stadt ist die zentrale Achse: eine 7,8 Kilometer lange Linie vom Yongding-Tor im Süden bis zum Glocken- und Trommelturm im Norden. Seit 2024 ist sie UNESCO-Weltkulturerbe. An ihr liegen der Tiananmen-Platz, die Verbotene Stadt und der Jingshan-Hügel.' },
  { a: 'c04', t: 'Beijing besitzt mehrere Welterbestätten: die Verbotene Stadt, die Große Mauer, den Himmelstempel, den Sommerpalast, die Ming-Gräber, die Peking-Mensch-Stätte Zhoukoudian und den Großen Kanal.' },
  { a: 'c05', t: 'Zur traditionellen Kultur gehören die Hutong-Gassen mit ihren Siheyuan-Höfen, die Peking-Oper und die berühmte Peking-Ente. Gleichzeitig ist Beijing heute eine moderne Metropole mit Wolkenkratzern, U-Bahn und internationalen Veranstaltungen.' },
  { a: 'c06', t: 'Kurz gesagt: Beijing ist eine Stadt, in der alte Geschichte und modernes Leben eng miteinander verbunden sind. Ich freue mich, Ihnen diese Stadt zu zeigen.' }
];

/* ===== 五、面试流程与评分（供「面试流程」模块使用） ===== */
window.PROCESS = [
  { step: '① 候考与身份核验', time: '约 10 分钟', desc: '携带身份证、准考证，按序候考；机考考场为独立机位，戴耳机面对摄像头。' },
  { step: '② 抽签确定景点', time: '—', desc: '从六个景点中随机抽 1 个：天安门及广场、故宫、天坛、颐和园、长城、明十三陵。' },
  { step: '③ 准备', time: '3 分钟', desc: '在屏幕上看到题目后可打草稿；建议只写 5 个关键词：景点名 + 年代 + 数字 + 结构词 + 结束语。' },
  { step: '④ 景点讲解', time: '约 8 分钟', desc: '德语全程讲解。结构：欢迎词 → 概况 → 2–3 个重点 → 文化内涵 → 结束语。语速每分钟 100–110 词。' },
  { step: '⑤ 综合知识问答', time: '约 3–5 分钟', desc: '北京城市概况、15 处景点知识、传统文化与民俗、《北京市旅游条例》、时政。' },
  { step: '⑥ 口译测试', time: '约 3–5 分钟', desc: '中译德、德译中各 1 题。听清全句再开口，生词用 "Es geht um …" 顺接，不要冷场。' },
  { step: '⑦ 结束与离场', time: '—', desc: '确认录音结束再起身；不要提前摘耳机或说出考场信息。' }
];

window.SCORING = [
  { item: '景点讲解', weight: '30%', tip: '结构完整 + 数字准确 + 全程德语；抽到哪篇都要能开口，六篇练到均匀。' },
  { item: '语言表达', weight: '25%', tip: '发音、语法、流利度。重点：数字年份、词尾 –en、ch/r 发音。' },
  { item: '口译', weight: '20%', tip: '中德双向。抓主干、补关键词，不追求逐字对应。' },
  { item: '综合知识问答', weight: '约 15%', tip: '每题答 2–4 句德语，先给结论再补一个细节。' },
  { item: '仪容仪表与应变', weight: '约 10%', tip: '正装或商务休闲，看镜头，语速平稳，微笑。' }
];
