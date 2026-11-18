(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };

  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  var prog = store.get('prog', { spots: {}, interp: {}, faq: {}, sos: {}, city: 0, sims: 0 });
  function saveProg() { store.set('prog', prog); }

  var audio = new Audio();
  audio.preload = 'auto';
  // 音频基址：单文件离线版由注入变量指定云端地址，部署版用相对路径
  var AUDIO_BASE = (typeof window.AUDIO_BASE !== 'undefined' && window.AUDIO_BASE) ? window.AUDIO_BASE : '';
  // 高音质开关：默认开启；只有用户手动关或连续多次失败才降级
  var FORCE_TTS = store.get('forceTTS', false);
  var audioFails = 0;

  // iOS/Safari 首次播放常被 autoplay 策略拒绝 → 用静音片段"解锁"音频通道
  var audioUnlocked = false;
  var SILENT = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';
  function unlockAudio() {
    if (audioUnlocked) return;
    try {
      var a = new Audio();
      a.src = SILENT;
      var p = a.play();
      if (p && p.catch) p.catch(function () {});
      audioUnlocked = true;
    } catch (e) {}
  }
  document.addEventListener('touchstart', unlockAudio, { once: true });
  document.addEventListener('click', unlockAudio, { once: true });

  function setSrcBadge(state, note) {
    var b = $('srcBadge'), t = $('toggleSrc'), hn = $('srcHint');
    if (!b) return;
    if (state === 'mp3') {
      b.className = 'srcbadge ok'; b.textContent = '⭐ 高音质（Microsoft Katja 神经语音）';
      if (t) t.textContent = '切换为系统语音';
    } else if (state === 'tts') {
      b.className = 'srcbadge warn'; b.textContent = '⚠️ 系统德语语音（机械音）';
      if (t) t.textContent = '切回高音质';
    } else {
      b.className = 'srcbadge'; b.textContent = '🔊 ' + (note || '音源待定');
      if (t) t.textContent = '切换为系统语音';
    }
    if (hn) hn.textContent = note || '';
  }

  var lastFallback = 0;
  function ttsFallback(text, why) {
    audioFails++;
    var now = Date.now();
    if (now - lastFallback > 400) { lastFallback = now; if (text) speak(text); }
    setSrcBadge('tts', why);
  }

  // 第三重保险：把音频下载成 Blob 再播（可绕开部分 iOS 的 autoplay 拦截）
  function blobPlay(url, text, rate) {
    try {
      audio.onerror = function () { ttsFallback(text, '音频加载失败（断网或链接失效），本次已用系统语音'); };
      fetch(url).then(function (r) {
        if (!r.ok) throw new Error('http ' + r.status);
        return r.blob();
      }).then(function (b) {
        audio.src = URL.createObjectURL(b);
        var p = audio.play();
        if (p && p.catch) {
          p.catch(function () { ttsFallback(text, '手机拒绝了音频播放（检查是否开了省电模式/静音开关）'); });
        } else { audioFails = 0; setSrcBadge('mp3'); }
        try { audio.playbackRate = rate || 0.95; } catch (e) {}
      }).catch(function () { ttsFallback(text, '音频加载失败（断网或链接失效），本次已用系统语音'); });
    } catch (e) { ttsFallback(text, '音频加载失败，本次已用系统语音'); }
  }

  function playUrl(url, text, rate) {
    if (FORCE_TTS) { speak(text); setSrcBadge('tts', '已手动切换为系统语音'); return; }
    try { audio.onerror = null; } catch (e) {}
    audio.src = url;
    // 注意：iOS 上在 play() 之前设 playbackRate 偶发失败，故放到 play() 之后
    // 只有真正的加载失败（404/断网）才降级本次
    audio.onerror = function () {
      blobPlay(url, text, rate);
    };
    var p = audio.play();
    if (p && p.catch) {
      p.catch(function () {
        // 多半是 iOS 的 autoplay 拦截 —— 解锁后立刻重试一次，绝不永久降级
        unlockAudio();
        setTimeout(function () {
          try {
            var p2 = audio.play();
            if (p2 && p2.catch) {
              p2.catch(function () { blobPlay(url, text, rate); });
            } else { audioFails = 0; setSrcBadge('mp3'); }
          } catch (e) { blobPlay(url, text, rate); }
        }, 80);
      });
    }
    try { audio.playbackRate = rate || 0.95; } catch (e) {}
  }
  audio.addEventListener('playing', function () { audioFails = 0; setSrcBadge('mp3'); });
  function stopAudio() { try { audio.pause(); } catch (e) {} }

  var synth = window.speechSynthesis;
  var deVoice = null;
  function pickVoice() {
    var vs = (synth && synth.getVoices()) || [];
    var de = vs.filter(function (v) { return /^de/i.test(v.lang) || /german|deutsch/i.test(v.name); });
    if (!de.length) return null;
    de.sort(function (a, b) { return ((b.quality === 'enhanced' || b.quality === 'premium') ? 1 : 0) - ((a.quality === 'enhanced' || a.quality === 'premium') ? 1 : 0); });
    return de[0];
  }
  if (synth) { pickVoice(); if (typeof synth.onvoiceschanged !== 'undefined') synth.onvoiceschanged = function () { deVoice = pickVoice(); }; }
  function speak(text) {
    if (!synth || !text) return;
    synth.cancel();
    var u = new SpeechSynthesisUtterance(text);
    if (!deVoice) deVoice = pickVoice();
    if (deVoice) u.voice = deVoice;
    u.lang = 'de-DE'; u.rate = 0.9;
    synth.speak(u);
  }
  function playGerman(id, text) {
    stopAudio();
    playUrl(AUDIO_BASE + 'audio/drills/' + id + '.mp3', text);
  }

  /* ---------- 路由 ---------- */
  var VIEWS = [
    { k: 'home', t: '首页' }, { k: 'process', t: '面试流程' }, { k: 'spots', t: '景点讲解' },
    { k: 'topics', t: '专题陈述' },
    { k: 'terms', t: '术语表达' }, { k: 'interp', t: '口译训练' }, { k: 'faq', t: '综合问答' },
    { k: 'sos', t: '应变题' }, { k: 'sim', t: '模拟面试' }
  ];
  var current = 'home';
  var tabs = $('tabs');
  VIEWS.forEach(function (v) {
    var b = document.createElement('button');
    b.textContent = v.t; b.dataset.k = v.k;
    b.onclick = function () { go(v.k); };
    tabs.appendChild(b);
  });
  function go(k) {
    current = k;
    VIEWS.forEach(function (v) {
      var el = $('v-' + v.k);
      if (el) el.classList.toggle('hidden', v.k !== k);
    });
    Array.prototype.forEach.call(tabs.children, function (b) { b.classList.toggle('on', b.dataset.k === k); });
    stopAudio(); if (synth) synth.cancel();
    if (k === 'home') renderHome();
    if (k === 'spots') renderSpots();
    if (k === 'topics') renderTopics();
    if (k === 'terms') renderTerms();
    if (k === 'interp') renderInterp();
    if (k === 'faq') renderFaq();
    if (k === 'sos') renderSos();
    if (k === 'sim') renderSim();
    window.scrollTo(0, 0);
    try { location.hash = k; } catch (e) {}
  }

  /* ---------- 首页 ---------- */
  function days(dstr) {
    var d = new Date(dstr + 'T00:00:00');
    var now = new Date(); now.setHours(0, 0, 0, 0);
    return Math.round((d - now) / 86400000);
  }
  function renderHome() {
    var written = days('2026-11-21');
    var oralDate = store.get('oralDate', '');
    var oral = oralDate ? days(oralDate) : null;
    var h = '';
    h += '<div class="countdown">';
    h += '<div class="box"><b>' + (written >= 0 ? written : '—') + '</b><span>天 · 笔试 11-21</span></div>';
    h += '<div class="box"><b>' + (oral !== null ? (oral >= 0 ? oral : '—') : '待定') + '</b><span>天 · 现场考试</span></div>';
    h += '</div>';

    h += '<div class="card"><h2>面试日期设置</h2><div class="row">';
    h += '<input type="date" id="oralDate" value="' + oralDate + '">';
    h += '<span class="sub">准考证出来后填入，首页自动倒计时</span></div></div>';

    var sDone = Object.keys(prog.spots).length;
    var iDone = Object.keys(prog.interp).length;
    var fDone = Object.keys(prog.faq).length;
    var dDone = Object.keys(prog.sos).length;
    h += '<div class="card"><h2>练习进度</h2>';
    h += '<table><tr><th>模块</th><th>已练</th><th>总量</th></tr>';
    h += '<tr><td>景点导游词</td><td>' + sDone + '</td><td>6</td></tr>';
    h += '<tr><td>专题陈述</td><td>—</td><td>' + (window.TOPICS || []).length + ' 篇</td></tr>';
    h += '<tr><td>口译句卡</td><td>' + iDone + '</td><td>' + (window.INTERP || []).length + '</td></tr>';
    h += '<tr><td>综合问答</td><td>' + fDone + '</td><td>' + (window.FAQ || []).length + '</td></tr>';
    h += '<tr><td>应变题</td><td>' + dDone + '</td><td>' + (window.SOS || []).length + '</td></tr>';
    h += '<tr><td>全流程模拟</td><td>' + (prog.sims || 0) + '</td><td>建议 ≥3 次</td></tr>';
    h += '</table></div>';

    h += '<div class="card"><h2>今日练习建议（每天 30–40 分钟）</h2><div style="font-size:14px;line-height:1.9">';
    h += '1. 听一篇导游词：景点讲解 → 逐句跟读 10 分钟<br>';
    h += '2. 口译句卡 5 句：先自己译，再看参考、听发音 10 分钟<br>';
    h += '3. 综合问答 3 题：遮住德语要点，先自己说 10 分钟<br>';
    h += '4. 加练：专题陈述（中轴线 / 大运河）整段过一遍<br>';
    h += '5. 周末加练：模拟面试一次（8 分钟计时 + 录音回看）';
    h += '</div><div class="row" style="margin-top:10px">';
    h += '<button class="btn" data-go="spots">去练导游词</button>';
    h += '<button class="btn ghost" data-go="interp">去练口译</button>';
    h += '<button class="btn ghost" data-go="sim">模拟面试</button>';
    h += '</div></div>';

    h += '<div class="card"><h2>先做这三件事</h2><div style="font-size:14px;line-height:1.9">';
    h += '① 在 iPhone Safari 打开本页 → 分享 → 添加到主屏幕（当 App 用）<br>';
    h += '② 设置 → 辅助功能 → 朗读内容 → 声音 → 德文，下载 Anna 增强版（系统语音备用）<br>';
    h += '③ 六篇导游词练到「抽哪篇都能开口」，不要只练熟故宫';
    h += '</div></div>';

    var v = $('v-home'); v.innerHTML = h;
    Array.prototype.forEach.call(v.querySelectorAll('[data-go]'), function (b) {
      b.onclick = function () { go(b.dataset.go); };
    });
    var od = $('oralDate');
    if (od) od.onchange = function () { store.set('oralDate', od.value); renderHome(); };
  }

  /* ---------- 面试流程 ---------- */
  function renderProcess() {
    var h = '<div class="card"><h2>机考现场流程</h2><table class="proc"><tr><th>环节</th><th>时长</th><th>说明</th></tr>';
    (window.PROCESS || []).forEach(function (p) {
      h += '<tr><td><b>' + p.step + '</b></td><td>' + p.time + '</td><td class="sub">' + p.desc + '</td></tr>';
    });
    h += '</table></div>';
    h += '<div class="card"><h2>评分权重</h2><table class="proc"><tr><th>项目</th><th>权重</th><th>拿分要点</th></tr>';
    (window.SCORING || []).forEach(function (s) {
      h += '<tr><td><b>' + s.item + '</b></td><td>' + s.weight + '</td><td class="sub">' + s.tip + '</td></tr>';
    });
    h += '</table></div>';
    h += '<div class="card" style="border-left:4px solid #d97706;background:#fffbf3"><h2>🔊 各环节的题干呈现方式（关键）</h2><table class="proc"><tr><th>环节</th><th>题干怎么给你</th><th>你用什么答</th></tr>';
    h += '<tr><td><b>景点讲解</b></td><td class="sub">屏幕<b>中文显示</b>题目</td><td class="sub">德语讲解</td></tr>';
    h += '<tr><td><b>知识问答</b>（7题）</td><td class="sub"><b>德语语音播报</b>，屏幕无文字</td><td class="sub">德语回答</td></tr>';
    h += '<tr><td><b>口译·中译外</b></td><td class="sub">屏幕<b>中文显示</b></td><td class="sub">译成德语</td></tr>';
    h += '<tr><td><b>口译·外译中</b></td><td class="sub"><b>德语语音播报</b>，屏幕无文字</td><td class="sub">译成中文</td></tr>';
    h += '</table><div class="sub" style="margin-top:10px;line-height:1.9">语音题规则：点「开始播放」听一遍（<b>中途无法停止</b>）→ 播放结束后可再点反复播放 → <b>点「开始录制」后不能再听</b>，必须凭记忆作答。所以听力理解是死线：题没听懂，后面说得再好也没用。</div></div>';

    h += '<div class="card"><h2>机考特别提醒</h2><div style="font-size:14px;line-height:1.9">';
    h += '· 对着摄像头和麦克风讲，没有考官表情反馈，容易越讲越快——练习时刻意压住语速。<br>';
    h += '· 卡壳时用过渡句兜底：Es geht um … / Mit anderen Worten … / Kommen wir nun zu …<br>';
    h += '· 讲解必须有结构：欢迎词 → 概况 → 2–3 个重点 → 文化内涵 → 结束语。<br>';
    h += '· 数字和年份要准确：1420、1949、7,8 km、21.000 km 这类是评分点。<br>';
    h += '· 确认录音结束再起身，不要提前摘耳机。';
    h += '</div></div>';
    $('v-process').innerHTML = h;
  }

  /* ---------- 专题陈述（中轴线 · 大运河） ---------- */
  var curTopic = 0, topicMode = 'learn', tpIdx = -1, tpPlaying = false;
  function topicSents(t) {
    var out = [];
    (t.sections || []).forEach(function (sec) {
      (sec.s || []).forEach(function (x) { out.push(x); });
    });
    return out;
  }
  function renderTopics() {
    var box = $('v-topics');
    var h = '<div class="card"><h2>专题陈述 <span class="sub">（「请介绍一下……」整段题，2–3 分钟）</span></h2>';
    h += '<div class="spot-grid" id="tgrid">';
    (window.TOPICS || []).forEach(function (t, i) {
      h += '<div class="s' + (curTopic === i ? ' on' : '') + '" data-i="' + i + '"><b>' + t.emoji + ' ' + t.zh + '</b><i>' + t.de + '</i></div>';
    });
    h += '</div>';
    h += '<div class="sub" style="margin-top:10px;line-height:1.8">这两块不在六大景点抽签范围内，但属于知识问答高频考点，且时政性强，最可能出成整段陈述题。<br>结构：引入 → 概况 → 构成/重点 → 文化内涵 → 收尾，约 320 词。</div>';
    h += '</div><div id="topicDetail"></div>';
    box.innerHTML = h;
    Array.prototype.forEach.call($('tgrid').children, function (el) {
      el.onclick = function () { curTopic = +el.dataset.i; tpIdx = -1; tpPlaying = false; stopAudio(); renderTopics(); renderTopicDetail(); };
    });
    renderTopicDetail();
  }
  function renderTopicDetail() {
    var box = $('topicDetail');
    if (!box) return;
    var t = (window.TOPICS || [])[curTopic];
    if (!t) { box.innerHTML = ''; return; }
    var sents = topicSents(t);
    var h = '';

    h += '<div class="card"><h2>' + t.emoji + ' ' + t.zh + ' <span class="sub">' + t.de + '</span></h2>';
    h += '<div class="tag">' + t.level + '</div>';
    h += '<div class="sub" style="margin-top:8px;line-height:1.8">' + t.intro + '</div>';
    h += '<div class="row"><span class="chip' + (topicMode === 'learn' ? ' on' : '') + '" data-tm="learn">学习模式</span>';
    h += '<span class="chip' + (topicMode === 'recite' ? ' on' : '') + '" data-tm="recite">背诵模式</span>';
    h += '<button class="btn" id="tpPlay">▶ 连续朗读</button>';
    h += '<button class="btn gray" id="tpStop">停止</button>';
    h += '<label class="chip small"><input type="checkbox" id="tpShadow" style="vertical-align:-2px"> 跟读停顿 4s</label></div>';
    h += '<div class="sub" id="tpProg" style="margin-top:8px">共 ' + sents.length + ' 句</div></div>';

    h += '<div class="card"><h2>陈述全文' + (topicMode === 'recite' ? ' <span class="sub">（点击句子揭开德语）</span>' : ' <span class="sub">（点击句子发音）</span>') + '</h2>';
    (t.sections || []).forEach(function (sec) {
      h += '<div class="sechead">' + sec.zh + ' · ' + sec.de + '</div>';
      (sec.s || []).forEach(function (x, j) {
        var gi = sents.indexOf(x);
        h += '<div class="para' + (topicMode === 'recite' ? ' hide' : '') + '" data-ti="' + gi + '">';
        h += '<div class="de">' + x.t + '</div>';
        h += '<div class="sub" style="margin-top:4px">' + x.z + '</div></div>';
      });
    });
    h += '</div>';

    h += '<div class="card"><h2>核心词汇 <span class="sub">（点 🔊 发音）</span></h2><table><tr><th>德语</th><th>中文</th></tr>';
    (t.vocab || []).forEach(function (v) {
      h += '<tr><td class="de">' + v.d + ' <button class="speak" data-tv="' + v.d + '">🔊</button></td><td class="zh">' + v.z + '</td></tr>';
    });
    h += '</table></div>';

    h += '<div class="card"><h2>高频追问 <span class="sub">（先自己答，再看德语要点）</span></h2>';
    (t.faq || []).forEach(function (f, i) {
      h += '<div class="item"><div class="q"><b>Q' + (i + 1) + '：</b>' + f.q + '</div>';
      h += '<div class="sub" style="margin-top:4px">要点：' + f.a + '</div>';
      h += '<div class="para" style="margin-top:6px"><div class="de">' + f.t + ' <button class="speak" data-tq="' + t.id + 'q' + i + '">🔊</button></div></div></div>';
    });
    h += '</div>';

    h += '<div class="card"><h2>万能连接句 <span class="sub">（卡壳救场）</span></h2><table><tr><th>德语</th><th>中文</th></tr>';
    [['Kommen wir nun zu einem anderen wichtigen Punkt.', '下面讲另一个要点。'],
     ['Dazu ein paar Zahlen, die sich gut merken lassen.', '关于这点有几个好记的数字。'],
     ['Besonders erwähnenswert ist Folgendes.', '特别值得一提的是：'],
     ['Zusammenfassend kann man sagen:', '总的来说可以说：'],
     ['Entschuldigung, darf ich kurz überlegen?', '抱歉，我可以稍想一下吗？'],
     ['Soweit mein Überblick – ich beantworte gern Ihre Fragen.', '我的介绍就到这里，欢迎提问。']
    ].forEach(function (x) {
      h += '<tr><td class="de">' + x[0] + ' <button class="speak" data-tv="' + x[0] + '">🔊</button></td><td class="zh">' + x[1] + '</td></tr>';
    });
    h += '</table></div>';

    box.innerHTML = h;

    Array.prototype.forEach.call(box.querySelectorAll('[data-tm]'), function (el) {
      el.onclick = function () { topicMode = el.dataset.tm; stopAudio(); tpPlaying = false; renderTopicDetail(); };
    });
    Array.prototype.forEach.call(box.querySelectorAll('[data-tv]'), function (el) {
      el.onclick = function (e) { e.stopPropagation(); speak(el.dataset.tv); };
    });
    Array.prototype.forEach.call(box.querySelectorAll('[data-tq]'), function (el) {
      el.onclick = function (e) {
        e.stopPropagation();
        var key = el.dataset.tq;
        playTopicAudio(key, t.faq[+key.split('q')[1]].t);
      };
    });

    var paras = box.querySelectorAll('[data-ti]');
    function mark(n) {
      Array.prototype.forEach.call(paras, function (p) {
        p.classList.toggle('on', +p.dataset.ti === n);
      });
      $('tpProg').textContent = sents.length ? (n + 1) + ' / ' + sents.length + ' 句' : '';
    }
    function tpPlay(i) {
      if (topicMode === 'recite') { var p = paras[i]; if (p) p.classList.remove('hide'); }
      tpIdx = i; tpPlaying = true; mark(i);
      stopAudio();
      playUrl(AUDIO_BASE + 'audio/topics/' + t.id + '-' + i + '.mp3', sents[i].t, 0.9);
      audio.onended = function () {
        if (!tpPlaying) return;
        if ($('tpShadow') && $('tpShadow').checked) {
          setTimeout(function () { if (tpPlaying && tpIdx < sents.length - 1) tpPlay(tpIdx + 1); else tpPlaying = false; }, 4000);
        } else if (tpIdx < sents.length - 1) tpPlay(tpIdx + 1);
        else tpPlaying = false;
      };
    }
    Array.prototype.forEach.call(paras, function (p) {
      p.onclick = function () {
        if (topicMode === 'recite') { p.classList.remove('hide'); }
        tpPlay(+p.dataset.ti);
      };
    });
    $('tpPlay').onclick = function () { tpPlay(tpIdx >= 0 ? tpIdx : 0); };
    $('tpStop').onclick = function () { tpPlaying = false; stopAudio(); };
    if (sents.length && tpIdx >= 0) mark(tpIdx);
  }
  function playTopicAudio(key, text) {
    stopAudio();
    playUrl(AUDIO_BASE + 'audio/topics/' + key + '.mp3', text);
  }

  /* ---------- 景点讲解 ---------- */
  var curSpot = -1, spotMode = 'learn', spIdx = -1, spPlaying = false, spTimer = null;
  function renderSpots() {
    var h = '<div class="card"><h2>选择景点 <span class="sub">（考试从这 6 个中随机抽 1 个）</span></h2><div class="spot-grid" id="sgrid">';
    (window.SPOTS || []).forEach(function (s, i) {
      var done = prog.spots[i] ? '<em>✓ 已练</em>' : '';
      h += '<div class="s' + (curSpot === i ? ' on' : '') + '" data-i="' + i + '"><b>' + s.zh + '</b><i>' + s.de + '</i>' + done + '</div>';
    });
    h += '</div></div><div id="spotDetail"></div>';
    $('v-spots').innerHTML = h;
    Array.prototype.forEach.call($('sgrid').children, function (el) {
      el.onclick = function () { curSpot = +el.dataset.i; stopAudio(); renderSpots(); renderSpotDetail(); };
    });
    renderSpotDetail();
  }

  function renderSpotDetail() {
    var box = $('spotDetail');
    if (!box) return;
    if (curSpot < 0) { box.innerHTML = ''; return; }
    var s = window.SPOTS[curSpot];
    var h = '';

    h += '<div class="card"><h2>' + s.zh + ' <span class="sub">' + s.de + '</span></h2>';
    h += '<div class="row"><span class="chip' + (spotMode === 'learn' ? ' on' : '') + '" data-m="learn">学习模式</span>';
    h += '<span class="chip' + (spotMode === 'recite' ? ' on' : '') + '" data-m="recite">背诵模式</span>';
    h += '<span class="chip' + (spotMode === 'time' ? ' on' : '') + '" data-m="time">计时演练</span>';
    h += '<button class="btn ' + (prog.spots[curSpot] ? 'ok' : 'ghost') + '" id="spotDone">' + (prog.spots[curSpot] ? '✓ 已练' : '标记已练') + '</button></div>';
    h += '</div>';

    if (spotMode === 'time') {
      h += '<div class="card"><h2>8 分钟计时演练</h2>';
      h += '<div class="timer" id="tmr">08:00</div>';
      h += '<div class="row" style="justify-content:center;margin-top:10px">';
      h += '<button class="btn" id="tStart">开始</button><button class="btn ghost" id="tPause">暂停</button><button class="btn gray" id="tReset">重置</button></div>';
      h += '<div class="sub" style="margin-top:10px">结构提示：欢迎词 → 概况 → 重点（2–3 个）→ 文化内涵 → 结束语。目标 700–850 词。</div>';
      h += '<div class="row" style="margin-top:10px"><button class="btn ghost" id="recBtn">开始录音</button><button class="btn gray hidden" id="recStop">停止录音</button><audio id="recPlay" controls style="width:100%;margin-top:8px"></audio></div>';
      h += '</div>';
    } else {
      h += '<div class="card"><h2>导游词全文' + (spotMode === 'recite' ? ' <span class="sub">（点击段落显示/隐藏）</span>' : '') + '</h2>';
      s.sections.forEach(function (sec) {
        h += '<div class="sechead">' + sec.zh + ' · ' + sec.de + '</div>';
        sec.paragraphs.forEach(function (p) {
          h += '<div class="para' + (spotMode === 'recite' ? ' hide' : '') + '"><div class="de">' + p + '</div></div>';
        });
      });
      h += '</div>';
    }

    h += '<div class="card"><h2>逐句跟读 <span class="sub">（Katja 神经语音，点击句子跳转）</span></h2>';
    h += '<div class="row"><button class="btn" id="sPlay">▶ 朗读</button><button class="btn ghost" id="sPrev">上一句</button>';
    h += '<button class="btn ghost" id="sNext">下一句</button><button class="btn gray" id="sStop">停止</button>';
    h += '<label class="chip small"><input type="checkbox" id="sShadow" style="vertical-align:-2px"> 跟读停顿</label></div>';
    h += '<div id="sText" style="margin-top:12px;font-size:16px;line-height:2"></div>';
    h += '<div class="sub" id="sProg" style="margin-top:8px"></div></div>';

    h += '<div class="card"><h2>核心词汇</h2><table><tr><th>德语</th><th>中文</th></tr>';
    s.vocab.forEach(function (v) { h += '<tr><td class="de">' + v[0] + ' <button class="speak" data-sp="' + v[0] + '">🔊</button></td><td class="zh">' + v[1] + '</td></tr>'; });
    h += '</table></div>';

    if (s.qa) h += '<div class="card"><h2>综合问答储备（中文记忆）</h2><div class="qa">' + s.qa + '</div></div>';

    box.innerHTML = h;

    Array.prototype.forEach.call(box.querySelectorAll('[data-m]'), function (el) {
      el.onclick = function () { spotMode = el.dataset.m; stopAudio(); clearInterval(spTimer); renderSpotDetail(); };
    });
    var sd = $('spotDone');
    if (sd) sd.onclick = function () {
      if (prog.spots[curSpot]) delete prog.spots[curSpot]; else prog.spots[curSpot] = 1;
      saveProg(); renderSpots(); renderSpotDetail();
    };
    Array.prototype.forEach.call(box.querySelectorAll('.para.hide'), function (el) {
      el.onclick = function () { el.classList.toggle('hide'); };
    });
    Array.prototype.forEach.call(box.querySelectorAll('[data-sp]'), function (el) {
      el.onclick = function () { speak(el.dataset.sp); };
    });

    /* 逐句播放器 */
    var sents = s.sentences || [];
    var textBox = $('sText');
    if (textBox) {
      textBox.innerHTML = '';
      sents.forEach(function (t, i) {
        var sp = document.createElement('span');
        sp.className = 'sent'; sp.textContent = t + ' ';
        sp.dataset.i = i;
        sp.onclick = function () { spPlay(i); };
        textBox.appendChild(sp);
      });
    }
    function mark(n) {
      Array.prototype.forEach.call(textBox.children, function (sp, i) {
        sp.classList.toggle('on', i === n);
        sp.classList.toggle('done', i < n);
      });
      $('sProg').textContent = sents.length ? (n + 1) + ' / ' + sents.length + ' 句' : '';
    }
    function spPlay(i) {
      spIdx = i; spPlaying = true; mark(i);
      stopAudio();
      playUrl(AUDIO_BASE + 'audio/spots/' + curSpot + '/' + i + '.mp3', sents[i], 0.9);
      audio.onended = function () {
        if (!spPlaying) return;
        var sh = $('sShadow') && $('sShadow').checked;
        if (sh) { setTimeout(function () { if (spPlaying && spIdx < sents.length - 1) spPlay(spIdx + 1); else { spPlaying = false; } }, 4000); }
        else if (spIdx < sents.length - 1) spPlay(spIdx + 1);
        else spPlaying = false;
      };
    }
    var pb = $('sPlay');
    if (pb) pb.onclick = function () { spPlay(spIdx >= 0 ? spIdx : 0); };
    var nx = $('sNext'); if (nx) nx.onclick = function () { if (spIdx < sents.length - 1) spPlay(spIdx + 1); };
    var pv = $('sPrev'); if (pv) pv.onclick = function () { if (spIdx > 0) spPlay(spIdx - 1); };
    var st = $('sStop'); if (st) st.onclick = function () { spPlaying = false; stopAudio(); };
    if (sents.length) mark(0);

    /* 计时器 */
    if (spotMode === 'time') {
      var left = 480, iv = null;
      var el = $('tmr');
      function paint() {
        var m = Math.floor(left / 60), ss = left % 60;
        el.textContent = (m < 10 ? '0' : '') + m + ':' + (ss < 10 ? '0' : '') + ss;
        el.className = 'timer' + (left <= 60 ? ' warn' : '');
      }
      paint();
      $('tStart').onclick = function () {
        if (iv) return;
        iv = setInterval(function () { left--; paint(); if (left <= 0) { clearInterval(iv); iv = null; } }, 1000);
      };
      $('tPause').onclick = function () { clearInterval(iv); iv = null; };
      $('tReset').onclick = function () { clearInterval(iv); iv = null; left = 480; paint(); };
      /* 录音 */
      var rec = null, chunks = [];
      var rb = $('recBtn'), rs = $('recStop'), rp = $('recPlay');
      if (rb && window.MediaRecorder) {
        rb.onclick = function () {
          navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
            rec = new MediaRecorder(stream); chunks = [];
            rec.ondataavailable = function (e) { chunks.push(e.data); };
            rec.onstop = function () {
              var blob = new Blob(chunks, { type: 'audio/mp4' });
              rp.src = URL.createObjectURL(blob);
              rs.classList.add('hidden'); rb.textContent = '重新录音';
            };
            rec.start(); rs.classList.remove('hidden');
          }).catch(function () { rb.textContent = '无法录音'; });
        };
        rs.onclick = function () { if (rec) rec.stop(); };
      } else if (rb) { rb.textContent = '本设备不支持录音'; rb.disabled = true; }
    }
  }

  /* ---------- 术语表达 ---------- */
  var termQuery = '';
  function renderTerms() {
    var h = '<div class="card"><h2>导游德语术语手册</h2>';
    h += '<input type="text" id="tq" placeholder="搜索德语或中文…" value="' + termQuery + '" style="width:100%">';
    h += '<div class="sub" style="margin-top:6px">共 11 个板块；🔊 用系统德语语音朗读（术语未预合成音频）</div></div>';
    (window.TERMS || []).forEach(function (sec, si) {
      var rows = 0, body = '';
      sec.groups.forEach(function (g) {
        var rs = g.rows.filter(function (r) {
          return !termQuery || r[0].toLowerCase().indexOf(termQuery.toLowerCase()) >= 0 || r[1].indexOf(termQuery) >= 0;
        });
        if (!rs.length) return;
        rows += rs.length;
        if (g.sub) body += '<h3>' + g.sub + '</h3>';
        body += '<table><tr><th>德语</th><th>中文</th></tr>';
        rs.forEach(function (r) {
          body += '<tr><td class="de">' + r[0] + ' <button class="speak" data-sp="' + r[0].replace(/"/g, '') + '">🔊</button></td><td class="zh">' + r[1] + '</td></tr>';
        });
        body += '</table>';
      });
      if (!rows && termQuery) return;
      h += '<div class="card"><h2>' + sec.title + (sec.de ? ' <span class="sub">' + sec.de + '</span>' : '') + '</h2>' + body;
      if (sec.notes && sec.notes.length) {
        h += '<div class="qa" style="margin-top:10px">' + sec.notes.map(function (n) { return '· ' + n; }).join('<br>') + '</div>';
      }
      h += '</div>';
    });
    $('v-terms').innerHTML = h;
    var tq = $('tq');
    if (tq) {
      tq.oninput = function () { termQuery = tq.value; renderTerms(); var el = $('tq'); el.focus(); el.setSelectionRange(el.value.length, el.value.length); };
    }
    Array.prototype.forEach.call($('v-terms').querySelectorAll('[data-sp]'), function (el) {
      el.onclick = function () { speak(el.dataset.sp); };
    });
  }

  /* ---------- 口译训练 ---------- */
  var iIdx = 0, iShow = false, iCat = '全部', iDir = '全部';
  function interpList() {
    return (window.INTERP || []).filter(function (x) {
      return (iCat === '全部' || x.cat === iCat) && (iDir === '全部' || x.dir === iDir);
    });
  }
  function renderInterp() {
    var cats = ['全部'], dirs = ['全部', 'zh2de', 'de2zh'];
    (window.INTERP || []).forEach(function (x) { if (cats.indexOf(x.cat) < 0) cats.push(x.cat); });
    var h = '<div class="card"><h2>口译训练 <span class="sub">（中译德 / 德译中各 1 题）</span></h2><div class="row" id="icats">';
    cats.forEach(function (c) { h += '<span class="chip' + (iCat === c ? ' on' : '') + '" data-c="' + c + '">' + c + '</span>'; });
    h += '</div><div class="row" style="margin-top:8px">';
    h += '<span class="chip' + (iDir === '全部' ? ' on' : '') + '" data-d="全部">全部方向</span>';
    h += '<span class="chip' + (iDir === 'zh2de' ? ' on' : '') + '" data-d="zh2de">中译德</span>';
    h += '<span class="chip' + (iDir === 'de2zh' ? ' on' : '') + '" data-d="de2zh">德译中</span>';
    h += '</div></div><div class="card" id="icard"></div>';
    h += '<div class="card"><h2>口译技巧</h2><div style="font-size:14px;line-height:1.9">';
    h += '· 听完/看完整句再开口，抓主干（谁 + 做什么 + 数字）。<br>';
    h += '· 中译德先定框架：主语 + 动词第二位 + 时间/地点状语，数字年份优先说对。<br>';
    h += '· 遇到生词不要停：用 Es geht um …（说的是……）、Mit anderen Worten …（换句话说……）顺接。<br>';
    h += '· 德译中先朗读全文再翻译，专有名词（景点名）保持德语音译习惯。';
    h += '</div></div>';
    $('v-interp').innerHTML = h;
    Array.prototype.forEach.call($('icats').children, function (el) {
      el.onclick = function () { iCat = el.dataset.c; iIdx = 0; iShow = false; renderInterp(); };
    });
    Array.prototype.forEach.call($('v-interp').querySelectorAll('[data-d]'), function (el) {
      el.onclick = function () { iDir = el.dataset.d; iIdx = 0; iShow = false; renderInterp(); };
    });
    renderInterpCard();
  }
  function renderInterpCard() {
    var box = $('icard'); if (!box) return;
    var list = interpList();
    if (!list.length) { box.innerHTML = '<div class="sub">没有符合条件的句子</div>'; return; }
    if (iIdx >= list.length) iIdx = 0;
    var it = list[iIdx];
    var srcIsDe = it.dir === 'de2zh';
    var key = it.de.a;
    var h = '<div class="row" style="justify-content:space-between"><span class="tag">' + it.cat + '</span>';
    h += '<span class="sub">' + (iIdx + 1) + ' / ' + list.length + '</span></div>';
    h += '<div class="sub" style="margin:6px 0">' + (srcIsDe ? '德译中：先朗读德语，再口头译成中文' : '中译德：先口头译成德语') + '</div>';
    h += '<div class="srcbox">' + (srcIsDe ? it.de.t : it.zh) + '</div>';
    h += '<div class="row" style="margin-top:10px">';
    if (srcIsDe) h += '<button class="btn ghost" id="iPlaySrc">🔊 听德语</button>';
    h += '<button class="btn" id="iShow">' + (iShow ? '隐藏参考' : '显示参考') + '</button>';
    h += '<button class="btn gray" id="iNext">下一句 →</button>';
    h += '<button class="btn ' + (prog.interp[key] ? 'ok' : 'ghost') + '" id="iDone">' + (prog.interp[key] ? '✓ 已练' : '标记已练') + '</button>';
    h += '</div>';
    if (iShow) {
      h += '<div class="item" style="margin-top:12px"><div class="q">参考译文</div><div class="ans">' + (srcIsDe ? it.zh : it.de.t) + '</div>';
      if (!srcIsDe) h += '<button class="btn ghost" id="iPlayTgt">🔊 听德语发音</button>';
      h += '</div>';
    }
    box.innerHTML = h;
    if ($('iPlaySrc')) $('iPlaySrc').onclick = function () { playGerman(key, it.de.t); };
    if ($('iPlayTgt')) $('iPlayTgt').onclick = function () { playGerman(key, it.de.t); };
    $('iShow').onclick = function () { iShow = !iShow; renderInterpCard(); if (iShow) playGerman(key, it.de.t); };
    $('iNext').onclick = function () { iIdx = (iIdx + 1) % list.length; iShow = false; renderInterpCard(); };
    $('iDone').onclick = function () {
      if (prog.interp[key]) delete prog.interp[key]; else prog.interp[key] = 1;
      saveProg(); renderInterpCard();
    };
  }

  /* ---------- 综合问答 ---------- */
  var fCat = '全部', fOpen = {}, fRandom = null;
  function renderFaq() {
    var cats = ['全部'];
    (window.FAQ || []).forEach(function (x) { if (cats.indexOf(x.cat) < 0) cats.push(x.cat); });
    var h = '<div class="card"><h2>北京城市概况德语陈述 <span class="sub">（约 3 分钟，问答可直接复用）</span></h2>';
    (window.CITY || []).forEach(function (c) {
      h += '<div class="para"><div class="de">' + c.t + '</div>';
      h += '<button class="speak" data-pl="' + c.a + '" data-tx="' + c.t.replace(/"/g, '') + '">🔊 朗读本段</button></div>';
    });
    h += '<div class="row" style="margin-top:8px"><button class="btn" id="cityAll">▶ 全文连续朗读</button><button class="btn gray" id="cityStop">停止</button></div></div>';

    h += '<div class="card" style="border-left:4px solid #d97706;background:#fffbf3"><h2>⚠️ 考场实况：题目是「听」的，不是「看」的</h2><div class="sub" style="line-height:1.9">'
      + '北京考区机考，<b>知识问答题的题干用你所报考的语种（德语）语音播报</b>，屏幕上没有文字。<br>'
      + '流程：点「开始播放」听一遍（中途不能停）→ 可再点重复播放 → 点「开始录制」后<b>不能再听</b>，必须直接开口答。<br>'
      + '同理：「外译中」也是德语语音播报；只有<b>景点讲解题</b>和<b>中译外</b>的题干是中文显示在屏幕上。<br>'
      + '所以练问答时请务必：<b>先遮住文字 → 点 🔊 播放德语提问 → 听懂了再开口</b>。看懂不等于听懂。</div></div>';

    h += '<div class="card"><h2>综合知识问答</h2><div class="row" id="fcats">';
    cats.forEach(function (c) { h += '<span class="chip' + (fCat === c ? ' on' : '') + '" data-c="' + c + '">' + c + '</span>'; });
    h += '</div><div class="row" style="margin-top:8px"><button class="btn ghost" id="fRand">随机抽 1 题</button></div></div>';

    if (fRandom) {
      h += '<div class="card"><h2>随机题目</h2>' + faqItem(fRandom, true) + '</div>';
    }
    h += '<div class="card"><h2>题库 <span class="sub">（点击题目展开德语回答要点）</span></h2><div id="flist"></div></div>';
    $('v-faq').innerHTML = h;

    Array.prototype.forEach.call($('fcats').children, function (el) {
      el.onclick = function () { fCat = el.dataset.c; renderFaq(); };
    });
    $('fRand').onclick = function () {
      var arr = window.FAQ || [];
      fRandom = arr[Math.floor(Math.random() * arr.length)];
      renderFaq();
    };
    $('cityAll').onclick = function () {
      var arr = window.CITY || [], i = 0;
      function step() {
        if (i >= arr.length) return;
        playGerman(arr[i].a, arr[i].t);
        audio.onended = function () { i++; step(); };
      }
      step();
    };
    $('cityStop').onclick = function () { stopAudio(); };
    Array.prototype.forEach.call($('v-faq').querySelectorAll('[data-pl]'), function (el) {
      el.onclick = function () { playGerman(el.dataset.pl, el.dataset.tx); };
    });

    var list = $('flist'), html = '';
    (window.FAQ || []).forEach(function (f, i) {
      if (fCat !== '全部' && f.cat !== fCat) return;
      html += faqItem(f, !!fOpen[i], i);
    });
    list.innerHTML = html;
    Array.prototype.forEach.call(list.querySelectorAll('[data-f]'), function (el) {
      el.onclick = function () {
        var i = +el.dataset.f; fOpen[i] = !fOpen[i];
        renderFaq();
      };
    });
    Array.prototype.forEach.call(list.querySelectorAll('[data-pl]'), function (el) {
      el.onclick = function (e) { e.stopPropagation(); playGerman(el.dataset.pl, el.dataset.tx); };
    });
    Array.prototype.forEach.call(list.querySelectorAll('[data-mask]'), function (el) {
      el.onclick = function (e) {
        e.stopPropagation();
        var t = $(el.dataset.mask);
        if (!t) return;
        t.classList.toggle('masked');
        el.textContent = t.classList.contains('masked') ? '👀 显示文字' : '🙈 遮住文字练听懂';
      };
    });
    Array.prototype.forEach.call(list.querySelectorAll('[data-done]'), function (el) {
      el.onclick = function (e) {
        e.stopPropagation();
        var k = el.dataset.done;
        if (prog.faq[k]) delete prog.faq[k]; else prog.faq[k] = 1;
        saveProg(); renderFaq();
      };
    });
  }
  function faqItem(f, open, i) {
    var key = f.points[0].a;
    var h = '<div class="item"><div class="row" style="justify-content:space-between"' + (i !== undefined ? ' data-f="' + i + '"' : '') + '>';
    h += '<div class="q"><span class="tag">' + f.cat + '</span>' + f.q + '</div></div>';
    if (open) {
      h += '<div class="ans">';
      if (f.qde) {
        h += '<div class="qde-box"><div class="sub">🎧 考场提问方式：<b>德语语音播报</b>（屏幕上无文字，只能听）</div>';
        h += '<div class="qde-de" id="qde-' + f.qde.a + '">' + f.qde.t + '</div>';
        h += '<div class="row" style="margin-top:6px"><button class="speak" data-pl="' + f.qde.a + '" data-tx="' + f.qde.t.replace(/"/g, '') + '">🔊 播放德语提问</button>';
        h += '<button class="speak" data-mask="qde-' + f.qde.a + '">🙈 遮住文字练听懂</button></div></div>';
      }
      f.points.forEach(function (p) {
        h += '<div style="margin-bottom:8px">' + p.t + '<br><button class="speak" data-pl="' + p.a + '" data-tx="' + p.t.replace(/"/g, '') + '">🔊 朗读</button></div>';
      });
      if (!f.hideDone) h += '<div class="row"><button class="speak" data-done="' + key + '">' + (prog.faq[key] ? '✓ 已练（点击取消）' : '标记已练') + '</button></div>';
    } else {
      h += '<div class="sub" style="margin-top:6px"' + (i !== undefined ? ' data-f="' + i + '"' : '') + '>点击展开德语回答要点（' + f.points.length + ' 句）</div>';
    }
    h += '</div>';
    return h;
  }

  /* ---------- 应变题 ---------- */
  var sOpen = {};
  function renderSos() {
    var h = '<div class="card"><h2>应变能力题 <span class="sub">（STAR 结构：复述 → 安全 → 分步 → 收尾）</span></h2>';
    h += '<div class="qa">先复述问题（Ich habe verstanden: …）→ 把安全放第一位（Die Sicherheit geht vor）→ Erstens / Zweitens / Drittens 分步说明 → 收尾（Ich melde den Vorfall dem Reisebüro）。全程用德语，条理比流利更重要。</div></div>';
    (window.SOS || []).forEach(function (s, i) {
      h += '<div class="item"><div class="row" style="justify-content:space-between" data-s="' + i + '">';
      h += '<div class="q"><span class="tag">' + s.cat + '</span>' + s.s + '</div></div>';
      if (sOpen[i]) {
        h += '<div class="ans">';
        s.steps.forEach(function (p) {
          h += '<div style="margin-bottom:8px">' + p.t + '<br><button class="speak" data-pl="' + p.a + '" data-tx="' + p.t.replace(/"/g, '') + '">🔊 朗读</button></div>';
        });
        h += '</div><div class="row"><button class="speak" data-done="' + s.steps[0].a + '">' + (prog.sos[s.steps[0].a] ? '✓ 已练（点击取消）' : '标记已练') + '</button></div>';
      } else {
        h += '<div class="sub" style="margin-top:6px" data-s="' + i + '">点击展开德语应答模板（' + s.steps.length + ' 步）</div>';
      }
      h += '</div>';
    });
    $('v-sos').innerHTML = h;
    Array.prototype.forEach.call($('v-sos').querySelectorAll('[data-s]'), function (el) {
      el.onclick = function () { var i = +el.dataset.s; sOpen[i] = !sOpen[i]; renderSos(); };
    });
    Array.prototype.forEach.call($('v-sos').querySelectorAll('[data-pl]'), function (el) {
      el.onclick = function (e) { e.stopPropagation(); playGerman(el.dataset.pl, el.dataset.tx); };
    });
    Array.prototype.forEach.call($('v-sos').querySelectorAll('[data-done]'), function (el) {
      el.onclick = function (e) {
        e.stopPropagation();
        var k = el.dataset.done;
        if (prog.sos[k]) delete prog.sos[k]; else prog.sos[k] = 1;
        saveProg(); renderSos();
      };
    });
  }

  /* ---------- 模拟面试 ---------- */
  var sim = null, simTimer = null, simLeft = 480;
  function renderSim() {
    var h = '<div class="card"><h2>全流程模拟 <span class="sub">（抽景点 → 3 分钟准备 → 8 分钟讲解 → 问答 → 口译）</span></h2>';
    h += '<div class="row"><button class="btn" id="genBtn">生成模拟题卡</button>';
    h += '<span class="sub">已完成模拟：' + (prog.sims || 0) + ' 次</span></div></div>';
    if (sim) {
      h += '<div class="card"><h2>8 分钟讲解计时</h2><div class="timer" id="simTmr">08:00</div>';
      h += '<div class="row" style="justify-content:center;margin-top:10px"><button class="btn" id="simStart">开始</button>';
      h += '<button class="btn ghost" id="simPause">暂停</button><button class="btn gray" id="simReset">重置</button></div></div>';

      h += '<div class="card"><h2>① 景点讲解</h2><div class="q"><span class="tag">抽中</span><b>' + sim.spot.zh + ' · ' + sim.spot.de + '</b></div>';
      h += '<div class="sub" style="margin-top:6px">3 分钟准备 → 写 5 个关键词 → 德语讲解 8 分钟</div>';
      h += '<div class="row" style="margin-top:8px"><button class="btn ghost" id="simListen">🔊 听一遍标准导游词</button><button class="btn gray" id="simStopA">停止</button></div></div>';

      h += '<div class="card"><h2>② 综合知识问答（' + sim.faqs.length + ' 题）</h2>';
      sim.faqs.forEach(function (f, i) { h += faqItem(f, true); });
      h += '</div>';

      h += '<div class="card"><h2>③ 口译测试（' + sim.interps.length + ' 题）</h2>';
      sim.interps.forEach(function (it, i) {
        h += '<div class="item"><div class="q"><span class="tag">' + (it.dir === 'zh2de' ? '中译德' : '德译中') + '</span>' + (it.dir === 'zh2de' ? it.zh : it.de.t) + '</div>';
        h += '<div class="ans">' + (it.dir === 'zh2de' ? it.de.t : it.zh) + '<br><button class="speak" data-pl="' + it.de.a + '" data-tx="' + it.de.t.replace(/"/g, '') + '">🔊 听发音</button></div></div>';
      });
      h += '</div>';

      h += '<div class="card"><h2>④ 应变题</h2>' + faqItem({ cat: sim.sos.cat, q: sim.sos.s, points: sim.sos.steps, hideDone: true }, true) + '</div>';

      h += '<div class="card"><h2>自评清单</h2><div style="font-size:14px;line-height:2">';
      ['全程德语，没有整段沉默', '结构完整（欢迎词/概况/重点/文化/结束语）', '数字年份说对', '8 分钟讲完（不超时、不提前 2 分钟以上）', '语速平稳（每分钟 100–110 词）'].forEach(function (t) {
        h += '<label style="display:block"><input type="checkbox" style="margin-right:6px"> ' + t + '</label>';
      });
      h += '</div><div class="row" style="margin-top:10px"><button class="btn ok" id="simDone">完成本次模拟（+1）</button></div></div>';
    }
    $('v-sim').innerHTML = h;

    $('genBtn').onclick = function () {
      var S = window.SPOTS || [], F = window.FAQ || [], I = window.INTERP || [], D = window.SOS || [];
      function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
      var f1 = pick(F), f2 = pick(F);
      while (f2 === f1 && F.length > 1) f2 = pick(F);
      var i1 = pick(I.filter(function (x) { return x.dir === 'zh2de'; }));
      var i2 = pick(I.filter(function (x) { return x.dir === 'de2zh'; }));
      sim = { spot: pick(S), faqs: [f1, f2], interps: [i1, i2].filter(Boolean), sos: pick(D) };
      simLeft = 480;
      renderSim();
    };
    if (sim) {
      var el = $('simTmr'), iv = null;
      function paint() {
        var m = Math.floor(simLeft / 60), ss = simLeft % 60;
        el.textContent = (m < 10 ? '0' : '') + m + ':' + (ss < 10 ? '0' : '') + ss;
        el.className = 'timer' + (simLeft <= 60 ? ' warn' : '');
      }
      paint();
      $('simStart').onclick = function () { if (iv) return; iv = setInterval(function () { simLeft--; paint(); if (simLeft <= 0) { clearInterval(iv); iv = null; } }, 1000); };
      $('simPause').onclick = function () { clearInterval(iv); iv = null; };
      $('simReset').onclick = function () { clearInterval(iv); iv = null; simLeft = 480; paint(); };
      $('simDone').onclick = function () { prog.sims = (prog.sims || 0) + 1; saveProg(); renderSim(); };
      $('simStopA').onclick = function () { stopAudio(); };
      $('simListen').onclick = function () {
        var i = 0, si = (window.SPOTS || []).indexOf(sim.spot);
        function step() {
          if (i >= sim.spot.sentences.length) return;
          stopAudio(); playUrl(AUDIO_BASE + 'audio/spots/' + si + '/' + i + '.mp3', sim.spot.sentences[i], 0.9);
          audio.onended = function () { i++; step(); };
        }
        step();
      };
      Array.prototype.forEach.call($('v-sim').querySelectorAll('[data-pl]'), function (b) {
        b.onclick = function () { playGerman(b.dataset.pl, b.dataset.tx); };
      });
    }
  }

  /* ---------- 音源状态条 ---------- */
  function initAudioBar() {
    var tb = $('testAudio'), tg = $('toggleSrc');
    if (tb) tb.onclick = function () {
      unlockAudio();
      setSrcBadge('', '正在试听…');
      playUrl(AUDIO_BASE + 'audio/drills/i17.mp3', 'Beijing ist eine Stadt mit einer langen Geschichte und einer modernen Skyline.', 1);
    };
    if (tg) tg.onclick = function () {
      FORCE_TTS = !FORCE_TTS;
      store.set('forceTTS', FORCE_TTS);
      setSrcBadge(FORCE_TTS ? 'tts' : '', FORCE_TTS ? '已手动切换为系统语音' : '已切回高音质，点「试听一句」确认');
      if (!FORCE_TTS) { unlockAudio(); }
    };
    setSrcBadge(FORCE_TTS ? 'tts' : '', FORCE_TTS ? '当前为系统语音' : '');
  }

  /* ---------- 启动 ---------- */
  renderProcess();
  initAudioBar();
  var hash = (location.hash || '').replace('#', '');
  var ok = VIEWS.some(function (v) { return v.k === hash; });
  go(ok ? hash : 'home');
})();
