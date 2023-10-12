/* ---Some variables to be used--- */
var myNick = '';
var myPswd = '';
var myChannel = decodeURI(window.location.search.replace(/^\?/, ''));

var accountStr;
var lastSent = [""];
var lastSentPos = 0;



function getHomepage() {
  
  ws = new WebSocket( wsAddress );

  ws.onerror = function () {
    pushMessage({ text: "# awa\n连接聊天室服务器失败，请稍候重试。\n**如果这个问题持续出现，请立刻联系 mail@henrize.kim 感谢您的理解和支持**", nick: '!'});
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
	"欢迎来到六字街，一个最小的，无干扰的十字街聊天应用程序。",
    "---",
	"频道创建、加入并与 URL 共享，通过更改问号后的文本来创建您自己的频道。",
	"如果您希望自己的频道名称为“您的频道”：[https://6chat.pages.dev/?您的频道](https://6chat.pages.dev/?您的频道)",
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
    "六字街当前 Github：https://github.com/geGDVS/6chat",
	"所有消息历史记录都保留在十字街服务器上。",
    "---",
    "鸣谢:",
    "[@Dr.Doppelglower](https://github.com/Doppelganger-phi) - 提供历史记录技术及资源支持。"
].join("\n");
    pushMessage({ text: homeText });
  }
}

/* ---Window and input field and sidebar stuffs--- */

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

$('#footer').onclick = function () {
  $('#chatinput').focus();
}

$('#chatinput').onkeydown = function (e) {
  if (e.keyCode == 13 /* ENTER */ && !e.shiftKey) {
    e.preventDefault();
    if (e.target.value != '') {
        var text = e.target.value;
        console.log(`Send: ${text}`);
        e.target.value = '';
        if (text == '/help'){
            pushMessage({ nick: '*', trip:'/Help/', text: helpText });
        }
        else if (text.startsWith('/nick ')){
            var newNick = text.slice(6);
            send({ cmd: 'chat', text: `/me 即将成为 @${newNick} 。` });
            ws.close();
            change_nick(myChannel, newNick);
        }
        else if (text.startsWith('/w')){
            var whisperArgs = text.split(' ');
            if (whisperArgs[2] == undefined){
                pushMessage({ nick: '!', trip:'/Error', text: '请填写私聊内容。' });
            } else {
                if (whisperArgs[1].startsWith('@')){
                    whisperArgs[1] = whisperArgs[1].slice(1);
                } 
                send({ cmd: 'chat', text: whisperArgs.join(' ') });
            }
        }
        else if (text == '/shrug'){
            send({ cmd: 'chat', text: "¯\\\\\\_(ツ)_/¯" });
        }
        else if (text == '/time'){
            pushMessage({ nick: '*', trip:'/Time/', text: get_time()});
        }
        else {
            // Submit message
            send({ cmd: 'chat', text: text });
        }
        lastSent[0] = text;
        lastSent.unshift("");
        lastSentPos = 0;

        updateInputSize();}
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