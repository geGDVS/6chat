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

function get_time(){
    var myDate = new Date();
    var time = myDate.toLocaleTimeString();
    return time.slice(0, 5); 
}

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
