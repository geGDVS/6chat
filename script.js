var clientName = "[六字街网页端](https://6.sqj.repl.co/)";

var wsAddress = "wss://ws.crosst.chat:35197/";

// initialize markdown engine
var markdownOptions = {
  html: false,
  xhtmlOut: false,
  breaks: true,
  langPrefix: 'language-',
  linkify: true,
  linkTarget: '_blank" rel="noreferrer',
  typographer:  false,
  quotes: `""''`,

  doHighlight: true,
  highlight: function (str, lang) {
    if (!markdownOptions.doHighlight || !window.hljs) { return ''; }

    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (__) {}

    return '';
  }
};

var md = new Remarkable('full', markdownOptions);

// image handler
var allowImages = true;
var imgHostWhitelist = [
    'i.loli.net', 's2.loli.net',					// sm.ms
    's1.ax1x.com', 's2.ax1x.com', 'z3.ax1x.com', 's4.ax1x.com',     // imgchr.com
    'i.postimg.cc',
    'bed-1254016670.cos.ap-guangzhou.myqcloud.com',
    'mrpig.eu.org',
    'i.imgur.com', 'imgur.com',
	'share.lyka.pro',
	'cdn.discordapp.com',
	'i.gyazo.com',
];
function getDomain(link) {
  var a = document.createElement('a');
  a.href = link;
  return a.hostname;
}

function isWhiteListed(link) {
  return imgHostWhitelist.indexOf(getDomain(link)) !== -1;
}

md.renderer.rules.image = function (tokens, idx, options) {
  var src = Remarkable.utils.escapeHtml(tokens[idx].src);

  if (isWhiteListed(src) && allowImages || getDomain(src) == 'crosst.chat') {
    var imgSrc = ' src="' + Remarkable.utils.escapeHtml(tokens[idx].src) + '"';
    var title = tokens[idx].title ? (' title="' + Remarkable.utils.escapeHtml(Remarkable.utils.replaceEntities(tokens[idx].title)) + '"') : '';
    var alt = ' alt="' + (tokens[idx].alt ? Remarkable.utils.escapeHtml(Remarkable.utils.replaceEntities(Remarkable.utils.unescapeMd(tokens[idx].alt))) : '') + '"';
    var suffix = options.xhtmlOut ? ' /' : '';
    var scrollOnload = isAtBottom() ? ' onload="window.scrollTo(0, document.body.scrollHeight)"' : '';
    return '<a href="' + src + '" target="_blank" rel="noreferrer"><img' + scrollOnload + imgSrc + alt + title + suffix + '></a>';
  }

  return '<a href="' + src + '" target="_blank" rel="noreferrer">' + Remarkable.utils.escapeHtml(Remarkable.utils.replaceEntities(src)) + '</a>';
};

md.renderer.rules.text = function(tokens, idx) {
  tokens[idx].content = Remarkable.utils.escapeHtml(tokens[idx].content);

  if (tokens[idx].content.indexOf('?') !== -1) {
    tokens[idx].content = tokens[idx].content.replace(/(^|\s)(\?)\S+?(?=[,.!?:)]?\s|$)/gm, function(match) {
      var channelLink = Remarkable.utils.escapeHtml(Remarkable.utils.replaceEntities(match.trim()));
      var whiteSpace = '';
      if (match[0] !== '?') {
        whiteSpace = match[0];
      }
      return whiteSpace + '<a href="' + channelLink + '" target="_blank">' + channelLink + '</a>';
    });
  }

  return tokens[idx].content;
};

md.use(remarkableKatex);

// Default disable LaTeX
$('#parse-latex').checked = false;
md.inline.ruler.disable([ 'katex' ]);
md.block.ruler.disable([ 'katex' ]);

// Escape Markdown
function escapeMarkdown(text) {
  return text.replace(/([*_~`])/g, '\\$1');
}

function removeStoredInfo() {
  localStorage.setItem('saved-stats', 'no-saved');
  localStorage.removeItem('saved-nick');
  localStorage.removeItem('saved-trip');
  localStorage.removeItem('saved-key');
}

// function to join channel
function getNickToJoin(channel) {
  removeStoredInfo();
  input = window.prompt('请设置一个昵称：');
  if (!input) {
    return false;
  }

  if (input.search('#') == -1) {
    send({cmd: 'join', channel, nick: input, clientName});
    myNick = input;
    accountStr = input;
  } else {
    input = input.split('#', 2);
    send({cmd: 'join', channel, nick: input[0], password: input[1], clientName});
    myNick = input[0];
  }
  return true;
}

function $(query) {
  return document.querySelector(query);
}

function localStorageGet(key) {
  try {
    return localStorage[key];
  } catch (e) { }
}

function localStorageSet(key, val) {
  try {
    localStorage[key] = val;
  } catch (e) { }
}

var ws;
var myNick = '';
var myChannel = decodeURI(window.location.search.replace(/^\?/, ''));

var accountStr;
var lastSent = [""];
var lastSentPos = 0;

var allowHTML = false;


function notify(args) {
  if (localStorageGet("sound-switch") == "true") {
    var soundPromise = document.getElementById("notify-sound").play();
    if (soundPromise) {
      soundPromise.catch(function (error) {
        console.error("Problem playing sound:\n" + error);
      });
    }
  }
}

function getHomepage() {
  
  ws = new WebSocket( wsAddress );

  ws.onerror = function () {
    pushMessage({ text: "# dx_xb\n连接聊天室服务器失败，请稍候重试。\n**如果这个问题持续出现，请立刻联系 mail@henrize.kim 感谢您的理解和支持**", nick: '!'});
  }

  var reqSent = false;

  ws.onopen = function () {
    if (!reqSent) {
      send({ cmd: 'getinfo' });
      reqSent = true;
    }
    return;
  }

  ws.onmessage = function (message) {
    var args = JSON.parse(message.data);
    if (args.ver == undefined) {
        args.online = "获取失败";
    }
    var homeText = [
	"                           /            _       _   ",
	"                           |___     ___| |_ ___| |_ ",
	"                           |  |    |  _|   |_ ||  _|",
	"                           |__/    |___|_|_|__/|_|  ",
	"",
	"",
	"欢迎来到六字街，一个最小的，无干扰的十字街聊天应用程序。",
    "---",
	"频道创建、加入并与 URL 共享，通过更改问号后的文本来创建您自己的频道。",
	"如果您希望自己的频道名称为“您的频道”：[https://6.sqj.repl.co/?您的频道](https://6.sqj.repl.co/?您的频道)",
	"没有频道列表，因此可以使用秘密频道名称进行私下讨论。",
	"",
	"这是您可以加入的预制频道：",
	"?公共聊天室 ( ==" + args.online + "== 用户在线 )",
	"这是一个专门为您生成的随机频道: ?" + Math.random().toString(36).substr(2, 8),
	"---",
	"格式：",
	"保留空格，因此可以逐字粘贴源代码。",
	"用$包围 LaTeX 表示内联样式 $\\zeta(2) = \\pi^2/6$，并用两$表示显示。 $$\\int_0^1 \\int_0^1 \\frac{1}{1-xy} dx dy = \\frac{\\pi^2}{6}$$",
	"对于语法突出显示，请像这样包装代码：“<语言> <代码>”，其中<语言>是任何已知的编程语言。",
	"---",
	"十字街当前 Github：https://github.com/CrosSt-Chat/CSC-main",
	"",
	"所有消息历史记录都保留在十字街服务器上。"
].join("\n");
    pushMessage({ text: homeText });
  }
}

function join(channel) {
  
  ws = new WebSocket( wsAddress );

  ws.onerror = function () {
    pushMessage({ text: "# dx_xb\n连接聊天室服务器失败，请稍候重试。\n**如果这个问题持续出现，请立刻联系 mail@henrize.kim 感谢您的理解和支持**", nick: '!'});
  }

  var wasConnected = false;

  ws.onopen = function () {
    // 已保存用户信息，并且存在 trip
    if (localStorage.getItem('saved-stats') == 'ok-with-trip') {
      // 读取用户信息
      myNick = localStorage.getItem('saved-nick');
      let trip = localStorage.getItem('saved-trip');
      let key = localStorage.getItem('saved-key');

      accountStr = '[' + trip + '] ' + myNick;

      // 如果是自动登录
      if (localStorage.getItem('auto-login') == 'true') {
        // 自动登录
        send({cmd: 'join', channel, nick: myNick, trip, key, clientName});
        wasConnected = true;
        return;
      } else {
        // 弹出确认框
        if (window.confirm('以上次的昵称登入聊天室？\n' + accountStr)) {
          send({cmd: 'join', channel, nick: myNick, trip, key, clientName});
          wasConnected = true;
          return;
        } else {
          wasConnected = getNickToJoin(channel);
          return;
        }
      }
    }

    // 已保存用户信息，但是没有 trip
    if (localStorage.getItem('saved-stats') == 'ok-without-trip') {
      // 读取用户信息
      myNick = localStorage.getItem('saved-nick');

      accountStr = myNick;

      // 如果是自动登录
      if (localStorage.getItem('auto-login') == 'true') {
        // 自动登录
        send({cmd: 'join', channel, nick: myNick, clientName});
        wasConnected = true;
        return;
      } else {
        // 弹出确认框
        if (window.confirm('以上次的昵称登入聊天室？\n' + accountStr)) {
          send({cmd: 'join', channel, nick: myNick, clientName});
          wasConnected = true;
          return;
        } else {
          wasConnected = getNickToJoin(channel);
          return;
        }
      }
    }

    // 剩下的情况，都是没有保存用户信息的
    wasConnected = getNickToJoin(channel);
  }

  ws.onclose = function () {
    if (wasConnected) {
      pushMessage({ nick: '!', text: "与服务器的连接已断开，请刷新重试。" });
    }
  }

  ws.onmessage = function (message) {
    var args = JSON.parse(message.data);
    var cmd = args.cmd;
    var command = COMMANDS[cmd];
    command.call(null, args);
  }
}

var COMMANDS = {
  chat: function (args) {
    pushMessage(args);
  },

  info: function (args) {
    args.nick = '*';
    pushMessage(args);
  },

  warn: function (args) {
    args.nick = '!';
    pushMessage(args);
  },

  onlineSet: function (args) {
    var nicks = args.nicks;

    usersClear();

    nicks.forEach(function (nick) {
      userAdd(nick);
    });

    userAdd(myNick);
    nicks.push(myNick);

    // 保证昵称不会被解析成 Markdown
    nicks = nicks.map(function (nick) {
      return escapeMarkdown(nick);
    });

    if (typeof args.trip == 'string' && typeof args.key == 'string') {
      accountStr = '[' + args.trip + '] ' + myNick;
      document.getElementById('account-name').innerText = accountStr;
      
      // 保存用户信息
      localStorage.setItem('saved-stats', 'ok-with-trip');
      localStorage.setItem('saved-trip', args.trip);
      localStorage.setItem('saved-key', args.key);
    } else {
      document.getElementById('account-name').innerText = accountStr;
    }

    localStorage.setItem('saved-nick', myNick);
    if (localStorage.getItem('saved-stats') != 'ok-with-trip') {
      localStorage.setItem('saved-stats', 'ok-without-trip');
      localStorage.removeItem('saved-trip');
      localStorage.removeItem('saved-key');
    }

    document.getElementById('version-text').innerText = args.ver;

    pushMessage({ nick: '*', text: '在线的用户有：' + nicks.join(", ")})
  },

  onlineAdd: function (args) {
    if (args.nick != myNick){
      userAdd(args.nick);

      if ($('#joined-left').checked) {
        if (args.client == 'null') {
          pushMessage({
            nick: '*',
            trip: args.trip,
            type: 'join',
            text: escapeMarkdown(args.nick) + " 加入聊天室"
          });
        } else {
          pushMessage({
            nick: '*',
            trip: args.trip,
            type: 'join',
            text: escapeMarkdown(args.nick) + " 加入聊天室\n###### 来自 " + args.client
          });
        }
      }
    }
  },

  onlineRemove: function (args) {
    userRemove(args.nick);

    if ($('#joined-left').checked) {
      pushMessage({ nick: '*', text: escapeMarkdown(args.nick) + " 离开聊天室" });
    }
  },

  infoInvalid: function (args) {
    removeStoredInfo();
    args.nick = '!';
    args.text = '账号信息验证失败，请重新填写昵称。';
    pushMessage(args);
    localStorageSet('auto-login', 'false');
  },

  html: function (args) {
    if ( allowHTML ) {
      pushHTML(args);
    } else {
      pushMessage({
        nick: '*',
        text: args.nick + ' 发送了一条HTML消息，但由于您的设置并未显示，您可以打开侧边栏接收HTML消息'
      });
    }
  }
}

function pushMessage(args) {
  // Message container
  var messageEl = document.createElement('div');

  if (
    typeof (myNick) === 'string' && (
      args.text.match(new RegExp('@' + myNick + '\\b', "gi")) ||
      ((args.type === "whisper" || args.type === "invite") && args.from)
    )
  ) {
    notify();
  }

  messageEl.classList.add('message');

  if (myNick.length > 0 && args.nick == myNick) {
    messageEl.classList.add('me');
  } else if (args.nick == '!') {
    messageEl.classList.add('warn');
  } else if (args.nick == '*') {
    messageEl.classList.add('info');
  } else if (args.admin) {
    messageEl.classList.add('admin');
  } else if (args.member) {
    messageEl.classList.add('member');
  } else if ( args.type == 'whisper'){
    messageEl.classList.add('info');
  }

  // Nickname
  var nickSpanEl = document.createElement('span');
  nickSpanEl.classList.add('nick');
  messageEl.appendChild(nickSpanEl);
  if (args.trip && !(args.type == 'whisper' && args.nick.startsWith('【发送私聊】 '))) {
    var tripEl = document.createElement('span');
    tripEl.textContent = args.trip + " ";
    tripEl.classList.add('trip');
    nickSpanEl.appendChild(tripEl);
  }

  if (args.nick) {
    var nickLinkEl = document.createElement('a');
      if ( args.type == 'whisper'){
          nickLinkEl.textContent = '*';
      }
      else {
          nickLinkEl.textContent = args.nick;
      }
    

    nickLinkEl.oncontextmenu = function () {
      // Temporary quick banning
      if ( $('#chatinput').value.trim() == '#ban') {
        // Ban a user though a message
        if( args.type == 'chat') {
          send({ cmd: 'ban', nick: args.nick });
          return;
        }

        // Ban a user though a whisper
        if( args.type == 'whisper' && args.nick.startsWith('【收到私聊】 ')) {
          send({ cmd: 'ban', nick: args.from });
          return;
        }

        // Ban a user though an invite
        if( args.type == 'invite') {
          send({ cmd: 'ban', nick: args.from });
          return;
        }

        // Ban a user though a online notice
        if( args.type == 'join') {
          send({ cmd: 'ban', nick: args.text.split(' ')[0] });
          return;
        }
        $('#chatinput').focus();
        return;
      }

      // Reply to a whisper or info is meaningless
      if ( args.type == 'whisper' || args.nick == '*' || args.nick == '!' ) {
        insertAtCursor( args.text );
        return;
      }

      let replyText = '';
      let originalText = args.text;
      let overlongText = false;
      
      // Cut overlong text
      if ( originalText.length > 350 ) {
        replyText = originalText.slice(0, 350);
        overlongText = true;
      }

      // Add nickname
      if ( args.trip ) {
        replyText = '>' + args.trip + ' ' + args.nick + '：\n';
      } else {
        replyText = '>' + args.nick + '：\n';
      }

      // Split text by line
      originalText = originalText.split('\n');

      // Cut overlong lines
      if ( originalText.length >= 8 ) {
        originalText = originalText.slice(0, 8);
        overlongText = true;
      }

      for ( let replyLine of originalText ) {
        // Cut third replied text
        if ( !replyLine.startsWith('>>')) {
          replyText += '>' + replyLine + '\n';
        }
      }

      // Add elipsis if text is cutted
      if ( overlongText ) {
        replyText += '>……\n';
      }
      replyText += '\n';

      // Add mention when reply to others
      if ( args.nick != myNick ) {
        replyText += '@' + args.nick + ' ';
      }

      // Insert reply text
      replyText += $('#chatinput').value;

      $('#chatinput').value = '';
      insertAtCursor( replyText );
      $('#chatinput').focus();
    }

    // Mention someone when left-clicking
    nickLinkEl.onclick = function ( e ) {
      // Reply to a whisper or info is meaningless
      if ( args.type == 'whisper' || args.nick == '*' || args.nick == '!' ) {
        return true;
      } else {
        e.preventDefault();
        insertAtCursor( '@' + args.nick + ' ' );
        $('#chatinput').focus();
        return false;
      }
    }

    var date = new Date(args.time || Date.now());
    nickLinkEl.title = date.toLocaleString();
    nickSpanEl.appendChild(nickLinkEl);
  }

  // Text
  var textEl = document.createElement('p');
  textEl.classList.add('text');
    if ( args.type == 'whisper' && args.nick.startsWith('【收到私聊】 ') ){
        textEl.innerHTML = md.render(args.nick.slice(7) + '悄悄对你说：' + args.text);
    }
    else if ( args.type == 'whisper' && args.nick.startsWith('【发送私聊】 ') ){
        textEl.innerHTML = md.render('你悄悄对@' + args.nick.slice(7) + '说：' + args.text);
    }
    else{
        textEl.innerHTML = md.render(args.text);
    }
  messageEl.appendChild(textEl);

  // Scroll to bottom
  var atBottom = isAtBottom();
  $('#messages').appendChild(messageEl);
  if (atBottom) {
    window.scrollTo(0, document.body.scrollHeight);
  }

  if (args.trip != "/Time/") {
    unread += 1;
  }
  
  updateTitle();
}

function pushHTML(args) {
  // Message container
  var messageEl = document.createElement('div');

  messageEl.classList.add('message');

  if (myNick && args.nick == myNick) {
    messageEl.classList.add('me');
  } else if (args.nick == '!') {
    messageEl.classList.add('warn');
  } else if (args.nick == '*') {
    messageEl.classList.add('info');
  } else if (args.admin) {
    messageEl.classList.add('admin');
  } else if (args.member) {
    messageEl.classList.add('member');
  }

  // Nickname
  var nickSpanEl = document.createElement('span');
  nickSpanEl.classList.add('nick');
  messageEl.appendChild(nickSpanEl);

  if (args.trip) {
    var tripEl = document.createElement('span');
    tripEl.textContent = args.trip + " ";
    tripEl.classList.add('trip');
    nickSpanEl.appendChild(tripEl);
  }

  if (args.nick) {
    var nickLinkEl = document.createElement('a');
    nickLinkEl.textContent = args.nick;

    var date = new Date(args.time || Date.now());
    nickLinkEl.title = date.toLocaleString();
    nickSpanEl.appendChild(nickLinkEl);
  }

  // Text
  var textEl = document.createElement('div');
  textEl.classList.add('text');
  textEl.innerHTML = args.text;

  messageEl.appendChild(textEl);

  // Scroll to bottom
  var atBottom = isAtBottom();
  $('#messages').appendChild(messageEl);
  if (atBottom) {
    window.scrollTo(0, document.body.scrollHeight);
  }
  
  updateTitle();
}

function insertAtCursor(text) {
  var input = $('#chatinput');
  var start = input.selectionStart || 0;
  var before = input.value.substr(0, start);
  var after = input.value.substr(start);

  before += text;
  input.value = before + after;
  input.selectionStart = input.selectionEnd = before.length;

  updateInputSize();
}

function send(data) {
  if (ws && ws.readyState == ws.OPEN) {
    ws.send(JSON.stringify(data));
  }
}

var windowActive = true;
var unread = 0;

window.onfocus = function () {
  windowActive = true;

  updateTitle();
}

window.onblur = function () {
  windowActive = false;
}

window.onscroll = function () {
  if (isAtBottom()) {
    updateTitle();
  }
}

function isAtBottom() {
  return (window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 1);
}

function updateTitle() {
  if (windowActive && isAtBottom()) {
    unread = 0;
  }

  var title;
  if (myChannel) {
    title = "?" + myChannel;
  } else {
    title = "六字街";
  }

  if (unread > 0) {
    title = '(' + unread + ') ' + title;
  }

  document.title = title;
}

$('#auto-login').onchange = function (e) {
  localStorageSet('auto-login', !!e.target.checked);
}

$('#clear-account').onclick = function () {
  removeStoredInfo();
  $('#auto-login').checked = false;
  localStorageSet('auto-login', false);
  document.getElementById("auto-login").disabled = true;
  let message = {nick: "*", text: "记录的账号信息已删除。"};
  pushMessage(message);
}

$('#footer').onclick = function () {
  $('#chatinput').focus();
}

$('#chatinput').onkeydown = function (e) {
  if (e.keyCode == 13 /* ENTER */ && !e.shiftKey) {
    e.preventDefault();

    // Submit message
    if (e.target.value != '') {
      var text = e.target.value;
      e.target.value = '';

      send({ cmd: 'chat', text: text });

      lastSent[0] = text;
      lastSent.unshift("");
      lastSentPos = 0;

      updateInputSize();
    }
  } else if (e.keyCode == 38 /* UP */) {
    // Restore previous sent messages
    if (e.target.selectionStart === 0 && lastSentPos < lastSent.length - 1) {
      e.preventDefault();

      if (lastSentPos == 0) {
        lastSent[0] = e.target.value;
      }

      lastSentPos += 1;
      e.target.value = lastSent[lastSentPos];
      e.target.selectionStart = e.target.selectionEnd = e.target.value.length;

      updateInputSize();
    }
  } else if (e.keyCode == 40 /* DOWN */) {
    if (e.target.selectionStart === e.target.value.length && lastSentPos > 0) {
      e.preventDefault();

      lastSentPos -= 1;
      e.target.value = lastSent[lastSentPos];
      e.target.selectionStart = e.target.selectionEnd = 0;

      updateInputSize();
    }
  } else if (e.keyCode == 27 /* ESC */) {
    e.preventDefault();

    // Clear input field
    e.target.value = "";
    lastSentPos = 0;
    lastSent[lastSentPos] = "";

    updateInputSize();
  } else if (e.keyCode == 9 /* TAB */) {
    // Tab complete nicknames starting with @

    if (e.ctrlKey) {
      // Skip autocompletion and tab insertion if user is pressing ctrl
      // ctrl-tab is used by browsers to cycle through tabs
      return;
    }
    e.preventDefault();

    var pos = e.target.selectionStart || 0;
    var text = e.target.value;
    var index = text.lastIndexOf('@', pos);

    var autocompletedNick = false;

    if (index >= 0) {
      var stub = text.substring(index + 1, pos).toLowerCase();
      // Search for nick beginning with stub
      var nicks = onlineUsers.filter(function (nick) {
        return nick.toLowerCase().indexOf(stub) == 0
      });

      if (nicks.length > 0) {
        autocompletedNick = true;
        if (nicks.length == 1) {
          insertAtCursor(nicks[0].substr(stub.length) + " ");
        }
      }
    }

    // Since we did not insert a nick, we insert a tab character
    if (!autocompletedNick) {
      insertAtCursor('\t');
    }
  }
}

function updateInputSize() {
  var atBottom = isAtBottom();

  var input = $('#chatinput');
  input.style.height = 0;
  input.style.height = ( input.scrollHeight + 1 ) + 'px';
  document.body.style.marginBottom = $('#footer').offsetHeight + 'px';

  if (atBottom) {
    window.scrollTo(0, document.body.scrollHeight);
  }
}

$('#chatinput').oninput = function () {
  updateInputSize();
}

updateInputSize();

/* sidebar */

$('#sidebar').onmouseenter = $('#sidebar').ontouchstart = function (e) {
  $('#sidebar-content').classList.remove('hidden');
  $('#sidebar').classList.add('expand');
  e.stopPropagation();
}

$('#sidebar').onmouseleave = document.ontouchstart = function (event) {
  var e = event.toElement || event.relatedTarget;
  try {
    if (e.parentNode == this || e == this) {
       return;
    }
  } catch (e) { return; }

  if (!$('#pin-sidebar').checked) {
    $('#sidebar-content').classList.add('hidden');
    $('#sidebar').classList.remove('expand');
  }
}

$('#clear-messages').onclick = function () {
  // Delete children elements
  var messages = $('#messages');
  messages.innerHTML = '';
}

// Restore settings from localStorage

if (localStorageGet('auto-login') == 'true') {
  $('#auto-login').checked = true;
}

if (localStorageGet('pin-sidebar') == 'true') {
  $('#pin-sidebar').checked = true;
  $('#sidebar-content').classList.remove('hidden');
}

if (localStorageGet('sound-switch') == 'true') {
  $('#sound-switch').checked = true;
}

if (localStorageGet('joined-left') == 'false') {
  $('#joined-left').checked = false;
}

$('#pin-sidebar').onchange = function (e) {
  localStorageSet('pin-sidebar', !!e.target.checked);
}

$('#joined-left').onchange = function (e) {
  localStorageSet('joined-left', !!e.target.checked);
}

$('#parse-latex').onchange = function (e) {
  if ( e.target.checked ) {
    md.inline.ruler.enable([ 'katex' ]);
    md.block.ruler.enable([ 'katex' ]);
  } else {
    md.inline.ruler.disable([ 'katex' ]);
    md.block.ruler.disable([ 'katex' ]);
  }
}

if (localStorageGet('syntax-highlight') == 'false') {
  $('#syntax-highlight').checked = false;
  markdownOptions.doHighlight = false;
}

$('#syntax-highlight').onchange = function (e) {
  var enabled = !!e.target.checked;
  localStorageSet('syntax-highlight', enabled);
  markdownOptions.doHighlight = enabled;
}

if (localStorageGet('allow-imgur') == 'false') {
  $('#allow-imgur').checked = false;
  allowImages = false;
}

$('#allow-imgur').onchange = function (e) {
  var enabled = !!e.target.checked;
  localStorageSet('allow-imgur', enabled);
  allowImages = enabled;
}

if (localStorageGet('allow-html') == 'true') {
  $('#allow-html').checked = true;
  allowHTML = true;
}

$('#allow-html').onchange = function (e) {
  var enabled = !!e.target.checked;
  if ( !!e.target.checked ) {
    pushMessage({ nick: '!', text: '查看HTML消息有可能降低聊天室的安全性和体验，如果遇到让您不适的情况，您可以选择 清空本页聊天记录'});
  }
  localStorageSet('allow-html', enabled);
  allowHTML = enabled;
}

// User list
var onlineUsers = [];
var ignoredUsers = [];

function userAdd(nick) {
  var user = document.createElement('a');
  user.textContent = nick;

  user.onclick = function (e) {
    userInvite(nick)
  }

  var userLi = document.createElement('li');
  userLi.appendChild(user);
  $('#users').appendChild(userLi);
  onlineUsers.push(nick);
}

function userRemove(nick) {
  var users = $('#users');
  var children = users.children;

  for (var i = 0; i < children.length; i++) {
    var user = children[i];
    if (user.textContent == nick) {
      users.removeChild(user);
    }
  }

  var index = onlineUsers.indexOf(nick);
  if (index >= 0) {
    onlineUsers.splice(index, 1);
  }
}

function usersClear() {
  var users = $('#users');

  while (users.firstChild) {
    users.removeChild(users.firstChild);
  }

  onlineUsers.length = 0;
}

function userInvite(nick) {
  send({ cmd: 'invite', nick: nick });
}

function userIgnore(nick) {
  ignoredUsers.push(nick);
}

/* color scheme switcher */

var schemes = [
  '黑色系 - 寒夜',
  '黑色系 - 都市',
  '黑色系 - 荧黄',
  '青色系 - 初夏',
  '黑色系 - 晨雾',
  '黑色系 - 新春',
  '白色系 - 入冬',
  '测试主题'
];

var highlights = [
  'agate',
  'androidstudio',
  'atom-one-dark',
  'darcula',
  'github',
  'rainbow',
  'tomorrow',
  'xcode',
  'zenburn'
]

var currentScheme = '测试主题';
var currentHighlight = 'rainbow';

function setScheme(scheme) {
  currentScheme = scheme;
  $('#scheme-link').href = "https://ws.crosst.chat:21563/schemes/" + scheme + ".css";
  switch (scheme) {
    case '黑色系 - 寒夜': setHighlight('rainbow');
    break;
    case '青色系 - 初夏': setHighlight('tomorrow');
    break;
    case '黑色系 - 都市': setHighlight('atom-one-dark');
    break;
    case '黑色系 - 荧黄': setHighlight('zenburn');
    break;
    case '黑色系 - 新春': setHighlight('zenburn');
    break;
    case '黑色系 - 晨雾': setHighlight('rainbow');
    break;
    case '白色系 - 入冬': setHighlight('xcode');
    break;
  }
  localStorageSet('scheme', scheme);
}

function setHighlight(scheme) {
  currentHighlight = scheme;
  $('#highlight-link').href = "https://ws.crosst.chat:21563/vendor/hljs/styles/" + scheme + ".min.css";
  localStorageSet('highlight', scheme);
}

// Add scheme options to dropdown selector
schemes.forEach(function (scheme) {
  var option = document.createElement('option');
  option.textContent = scheme;
  option.value = scheme;
  $('#scheme-selector').appendChild(option);
});

highlights.forEach(function (scheme) {
  var option = document.createElement('option');
  option.textContent = scheme;
  option.value = scheme;
  $('#highlight-selector').appendChild(option);
});

$('#sound-switch').onchange = function (e) {
  localStorageSet('sound-switch', !!e.target.checked);
}

$('#scheme-selector').onchange = function (e) {
  setScheme(e.target.value);
}

$('#highlight-selector').onchange = function (e) {
  setHighlight(e.target.value);
}

// Load sidebar configaration values from local storage if available
if (localStorageGet('scheme')) {
  setScheme(localStorageGet('scheme'));
}

if (localStorageGet('highlight')) {
  setHighlight(localStorageGet('highlight'));
}

$('#scheme-selector').value = currentScheme;
$('#highlight-selector').value = currentHighlight;

/* main */

if (myChannel == '') {
  getHomepage();
  $('#footer').classList.add('hidden');
  $('#sidebar').classList.add('hidden');
} else {
  join(myChannel);
}
