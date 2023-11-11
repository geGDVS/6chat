var allowHTML = false;

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
  user.oncontextmenu = function (e) {
    userIgnore(nick)
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
    if (nick == myNick) {
        pushMessage({nick: '!', trip: '/Error', text: `你不能屏蔽你自己！`});
        return;
    }
  var index = ignoredUsers.indexOf(nick);
  if (index >= 0) {
    ignoredUsers.splice(index, 1);
    pushMessage({nick: '*', trip: 'Ignore', text: `已取消屏蔽 @${nick}。`});
  }
  else {
    ignoredUsers.push(nick);
    pushMessage({nick: '*', trip: 'Ignore', text: `已屏蔽 @${nick}。`});
  }
  
}

/* color scheme switcher */

var schemes = [
    'Atelier - Dune',
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

var currentScheme = 'Atelier - Dune';
var currentHighlight = 'darcula';

function setScheme(scheme) {
  currentScheme = scheme;
    if (scheme  == 'Atelier - Dune'){
        $('#scheme-link').href = "scheme.css";
    } else {
        $('#scheme-link').href = "https://crosst.chat/schemes/" + scheme + ".css";
    }
  switch (scheme) {
    case 'Atelier - Dune': setHighlight('darcula');
    break;
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
    $('#highlight-link').href = "https://crosst.chat/vendor/hljs/styles/" + scheme + ".min.css";
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
