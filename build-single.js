// 把备考站打包成单个 HTML 文件（CSS/JS/数据全部内联），便于发到手机直接打开
const fs = require('fs');
const path = require('path');

const DIR = '/Users/guoxl/Documents/Obsidian Vault/10-项目/导游考试备考/06-德语面试备考站';
const HOST = 'https://guoxinling.github.io/de-guide-exam/';

const read = f => fs.readFileSync(path.join(DIR, f), 'utf8');
let html = read('index.html');

// 内联 CSS
const css = read('style.css');
html = html.replace('<link rel="stylesheet" href="style.css">', '<style>\n' + css + '\n</style>');

// 内联 JS（顺序不能变）
const scripts = ['data-spots.js', 'data-spots-old.js', 'data-topics.js', 'data-terms.js', 'data-drills.js', 'data-shizheng.js', 'app.js'];
const inlined = scripts.map(f => {
  let code = read(f);
  // 避免内容里出现 </script> 破坏 HTML 结构
  code = code.replace(/<\/script/gi, '<\\/script');
  return '<script>\n' + code + '\n</script>';
}).join('\n');

// 注入音频基址（须在所有脚本之前）
const inject = '<script>window.AUDIO_BASE = "' + HOST + '";</script>\n';

html = html.replace(/<script src="[^"]+"><\/script>\s*/g, '');
html = html.replace('</body>', inject + inlined + '\n</body>');

const out = path.join(DIR, '德语面试备考-单文件版.html');
fs.writeFileSync(out, html, 'utf8');
console.log('生成:', out);
console.log('大小:', (fs.statSync(out).size / 1024).toFixed(0) + ' KB');
