var clientName = "[六字街网页端](https://6chat.pages.dev/)";

var wsAddress = "wss://ws.crosst.chat:35197/";

var helpText = `# 六字街简版帮助  （2023.10.10更新）

## 一、功能

### 识别码
识别码是使用者名称前的伪随机字符串，在不知道密码的情况下极不可能被别人仿冒。
==由于重进后不保留聊天记录，请认真阅读添加用法后再进行操作，避免重复请求帮助。==
添加方法：

1. 点击侧边栏清除账号信息按钮（非必须，完成此步可跳过第二步括号内操作）；
2. 刷新 / 重新进入六字街网站；
**（如果此前有登录行为，弹窗会出现“以上次的昵称登录？”的提示。此时请点击\`取消\`再进行第二步操作）**
3. 在新弹窗的输入框内填写用户信息，格式如下： \`<名称>#<密码>\`, 如 \`JohnDoe#123456\`；
4. 在这一例子中，\`123456\` 即为用户密码, 与识别码对应；
5. 点击确定或回车，进入十字街并获得自己的识别码。
###### 通常情况下，一个密码仅对应一个识别码，如上文中\`123456\`的对应识别码即为\`T7YXZ9\`。因此，请确保你的密码尽可能的特别，过于简单的密码可能会使生成的识别码与其他人重复，影响聊天。

### 发送图片
流程：
1. 将图片上传至图床（例如：[SM.MS 图床](https://sm.ms/) 或 [路过图床](https://imgtu.com/)）；
2. 上传完成后找到==Markdown==选项并复制其中的内容；
3. 将复制的内容粘贴到聊天室输入框并发送。

**因图床地址时有变动，发送的图片不一定都能直接看到. 此时请联系管理员处理。**

### 指令
请输入\`/help\`查询帮助。
提示：部分指令会导致用户弹出聊天室，请仔细阅读指令描述并谨慎使用。

#### 私聊
发送 \`/w <用户名> <文本>\` 以发送私聊。如 \`/w JohnDoe ( ﾟ∀。)\` 将把信息 \`( ﾟ∀。)\` 发送给名为 \`JohnDoe\` 的用户。

##### 提示: 
**当有人向你发送私聊时, 你可以键入 \`/r <文本>\` 快速回复, 无需反复键入私聊对象。**
==由于私聊偶尔会出现失效的情况，大量私聊内容请参考下文“建立私人聊天室”进入单独房间进行私聊。==

#### 更改名字
发送 \`/nick <用户名>\` 以更改名字。如 \`/w JohnDoe John\` 将把名字 \`JohnDoe\` 改为了 \`John\` 。

##### 提示: 
**请勿频繁更改名字，这样极有可能受到频率限制。**
==如果遇到名称不合法或受到频率限制，请刷新网页。==

#### 显示时间
发送 \`/time\` 以查看时间。

### 建立私人聊天室
1. 将网址 \`https://6chat.pages.dev/?公共聊天室\` 中  (半角) 问号后更改为你想要的聊天室名字, 即可进入。
    例如 https://6chat.pages.dev/?tech 或 https://6chat.pages.dev/?1 

2. 快速邀请用户进入一个随机的聊天室
    1. 在侧边栏中找到 \`在线的用户\` 一项；
    2. 点击下面的用户名；
    3. 点击页面中出现的 $x$ \`邀请您去另一个随机生成的聊天室\` 中的粗体部分。
**注意：该操作不能@对应的用户。**

### 屏蔽/取消屏蔽 某人
1. 在侧边栏中找到 \`在线的用户\` 一项；
2. 右键下面的用户名；
3. 如页面中出现提示，说明 屏蔽/取消屏蔽 成功。

### Markdown/TeX
六字街支持 \`Markdown\` 和 $\rm\TeX$ 语法, 具体参见 [Markdown使用指引](https://www.jianshu.com/p/335db5716248) 和 [LaTeX使用指引](https://www.jianshu.com/p/3e842d67ada2)。

### 注意
- ==过度==使用语法的行为不受欢迎且会==受到严厉处罚==；
- 有测试语法需要请参考上条建立私人聊天室单独测试；
- 遇到恶意使用LaTeX刷屏/造成卡顿的情况可在侧边栏取消勾选“启用LaTeX”选项。

### 机器人
　　截止到 2023 年 8 月 19 日，@do_ob @bo_od @Repeater & @Rip @Help @Snowi 是机器人。 @Anotia有时会由同名作者亲自操作发消息。
###### 机器人的使用方法即将推出。

### 昵称颜色对应的权限
（在当前背景下）
- 紫色代表用户自己（无论权限高低）
- 蓝色代表游客（无识别码）或用户（有识别码）
- 绿色代表成员（可以使用命令 \`/stats\` 查询主聊天室相关信息以及在聊天室锁定时不被踢出或进入聊天室）；
- 红色代表管理员（包括有相同权限的机器人）。

==所以本站不能更改自己昵称的颜色==

## 二、注意事项

### 禁止
- 使用敏感/可能令人反感或有误导性的昵称；
- 刷屏（含滥用Markdown和LaTeX语法）；
- 讨论、传播、寻求包括色情、暴力、涉政和其他一切违反中华人民共和国法律的内容 ；
**魔法上网 / 梯子内容或分享相关工具 / 指路内容包括在内。若有需要，请移步其他聊天室。**
- 人身攻击；
- 因非网络原因导致反复进出聊天室；
**如遇网络质量问题请改善网络后再进入**
==反复进出封禁将不作提醒。==

### 谢绝
- 寻求特定性别的聊天对象；
- 发送过度修饰而影响正常聊天的内容（包括但不限于语C、玩烂梗、消息中非必要地夹杂多种语言或方言、以各种目的使用晦涩难懂的缩写等）；
- 于公共聊天室内讨论自己小圈子（讨论前未被本站用户所知或接受）的内容以及话题（含漫无目的发送不明消息）；
- 在十字街内未经事先同意而发送指向其他网站（特别是其他聊天室）的链接并引起他人不适；
- ==故意发布与事实不符的消息以达到各种目的 （包括但不限于造谣 / 带节奏 / 歪曲他人言语/基于主观认定要求管理员处罚其他用户等）。==

    ==有以上行为者予以暂时禁言 / 封禁处罚.==

### 聊天室不欢迎
- 过度表现情绪（包括以加强表达情绪为目的添加带括号的动作描写和表情名称，以及高频使用三字母颜文字）；
- 未经对方允许询问其他聊天用户的真实个人信息（性别、所在的地理位置、年龄等）。

### 如果在发送消息时出现“操作过于频繁”字样的提示，可能是你发消息的频率过高触发了频率限制器。此时请稍等再重新尝试发送。


### 北京时间 23-8 点是休息时间，聊天室会自动锁定，如有需要请于其他时间段进入聊天室。

==(___请向上滑动查看所有内容___)==`;


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
      myPswd = input[1]
  }
  return true;
}



function welcome(channel){
    pushMessage({nick:'*', trip:'/Welc/', text:'欢迎使用六字街客户端，喜欢的话可以添加到收藏夹哦～'});
    console.log('Enter Channel: ' + channel)
    if (channel == '公共聊天室'){ 
        var httpRequest = new XMLHttpRequest();
        param = 'chatroom=cc&key=FREE_KEY&raw=1';
        httpRequest.open('GET', 'https://lookup.doppelganger.eu.org/msg/?'+param, true);
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                var json = httpRequest.responseText;
                data = JSON.parse(json);
                data = data['msg'];
                pushMessage({nick:'*', trip:'/Hist/', text:'### _==以下为历史记录。==_'});
                for (var i = 0; i < 15; i++) { 
                    msg = data[i];
                    if (msg.uType == "MEMBER"){
                        pushMessage({nick:msg.nick, trip:msg.trip, text:msg.text, member:true});
                    } else if (msg.uType == "ADMIN"){
                        pushMessage({nick:msg.nick, trip:msg.trip, text:msg.text, admin:true});
                    } else {
                        pushMessage({nick:msg.nick, trip:msg.trip, text:msg.text});
                    }
                }
                pushMessage({nick:'*', trip:'/Hist/', text:'### _==向上滑动查看历史记录。==_'});
            }
        }
        httpRequest.send();
    }
}

var ws;

function join(channel) {
  
  ws = new WebSocket( wsAddress );

  ws.onerror = function () {
    pushMessage({ text: "# awa\n连接聊天室服务器失败，请稍候重试。\n**如果这个问题持续出现，请立刻联系 mail@henrize.kim 感谢您的理解和支持**", nick: '!'});
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
      pushMessage({ nick: '!', text: "与服务器的连接已断开，请刷新重试或等待重连。" });
    }
  }

  ws.onmessage = function (message) {
    var args = JSON.parse(message.data);
    var cmd = args.cmd;
    var command = COMMANDS[cmd];
    command.call(null, args);
  }
}

function change_nick(channel, nick) {
  
  ws = new WebSocket( wsAddress );

  ws.onerror = function () {
    pushMessage({ text: "# awa\n连接聊天室服务器失败，请稍候重试。\n**如果这个问题持续出现，请立刻联系 mail@henrize.kim 感谢您的理解和支持**", nick: '!'});
  }

  var wasConnected = false;

  ws.onopen = function () {
    // 已保存用户信息，并且存在 trip
    if (localStorage.getItem('saved-stats') == 'ok-with-trip') {
      // 读取用户信息
      myNick = nick;
      let trip = localStorage.getItem('saved-trip');
      let key = localStorage.getItem('saved-key');

      accountStr = '[' + trip + '] ' + myNick;

    
        // 自动登录
        send({cmd: 'join', channel, nick: myNick, trip, key, clientName});
        wasConnected = true;
        return;
    }

    // 已保存用户信息，但是没有 trip
    if (localStorage.getItem('saved-stats') == 'ok-without-trip') {
        // 读取用户信息
        myNick = nick

        accountStr = myNick;

        send({cmd: 'join', channel, nick: myNick, clientName});
        wasConnected = true;
        return;
    }

  }

  ws.onclose = function () {
    if (wasConnected) {
      pushMessage({ nick: '!', text: "与服务器的连接已断开，请刷新重试或等待重连。" });
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
    welcome(myChannel);
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
    
    pushMessage({ nick: '*', trip:'Online', text: '在线的用户有：' + nicks.join(", ")});
      
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
      else if (ignoredUsers.indexOf(args.nick) >= 0){
          console.log(`${args.nick}: ${args.text}`);
          return;
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
        e.preventDefault();
        if ( args.type == 'whisper' ) {
            insertAtCursor( '@* ' );
        } else {
            insertAtCursor( '@' + args.nick + ' ' );
        }
        $('#chatinput').focus();
        return;
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
    else if ( args.trip == '/Time/' ){
        textEl.innerHTML = get_time();
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


/* main */

if (myChannel == '') {
    getHomepage();
    $('#footer').classList.add('hidden');
    $('#sidebar').classList.add('hidden');
} else {
    join(myChannel);
}
