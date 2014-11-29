// ==UserScript==
// @name        Wikipedia with NoScript
// @namespace   https://github.com/Arkq
// @description Use some useful wiki scripts when NoScript is on.
// @include     http://*.wikipedia.org/*
// @include     https://*.wikipedia.org/*
// @grant       GM_getValue
// @grant       GM_setValue
// @version     0.1.8
// @downloadURL https://raw.githubusercontent.com/Arkq/userscripts/master/scripts/Wikipedia-w-noscript.user.js
// @icon        https://upload.wikimedia.org/wikipedia/en/b/bc/Wiki.png
// ==/UserScript==


function WikipediaWithNoscript() {

	// set this value to the preferred language (default: browser lang)
	this.userLang = null;
	// this.userLang = 'de';  // for German
	// this.userLang = 'pl';  // for Polish

	// navigation bar hider settings
	this.navBarHidden = false;
	this.navBarHiderId = 'hideNavbarElement';

	// skin dependent element modification info
	// = [[elemID, styleProp], ...]
	this.elementModifications = {
		'skin-monobook': [
			['content', 'margin-left:0'],
			['p-cactions', 'left:0'],
			['p-logo', 'display:none'],
			['p-navigation', 'display:none'],
			['p-search', 'display:none'],
			['p-interaction', 'display:none'],
			['p-tb', 'display:none'],
			['p-coll-print_export', 'display:none'],
			['p-lang', 'display:none'],
			// PL-language fix
			['p-zmiany', 'display:none'],
			['p-dla_edytor.C3.B3w', 'display:none'],
		],
		'skin-modern': [
			['mw_content', 'margin-left:0'],
			['p-cactions', 'margin-left:0'],
			['mw_portlets', 'display:none'],
		],
		'skin-vector': [
			['content', 'margin-left:0'],
			['mw-head-base', 'margin-left:0'],
			['footer', 'margin-left:0'],
			['left-navigation', 'margin-left:0'],
			['mw-panel', 'display:none'],
		],
	};

}

WikipediaWithNoscript.prototype.init = function() {

	if (!this.userLang)
		// set default user preferred language - browser language
		this.userLang = navigator.language.substring(0, 2).toLowerCase();

	// install appropriate "quick link"
	if (/en.wikipedia.org/.test(window.location)) {
		if (this.userLang != 'en')
			this.addQuickWikiLink(this.userLang.toUpperCase(), this.getLangLink(this.userLang));
	}
	else
		this.addQuickWikiLink('EN', this.getLangLink('en'));

	// create hider handler
	var body = document.getElementsByTagName('body')[0];
	var hider = document.createElement('div');
	hider.id = this.navBarHiderId;
	hider.style.cssText = 'cursor:pointer; color:#696; font-weight:bold;' +
			'font-size:20px; left:0px; bottom:0px; padding:2px; z-index:101;' +
			'position:fixed;';
	hider.addEventListener('click', this.toggleNavigationBar.bind(this));
	body.appendChild(hider);

	// retrieve previous navigation bar state
	this.navBarHidden = !GM_getValue('navBarHidden', true);
	this.toggleNavigationBar();

};

// Get given language wiki link from the langBox, otherwise return null.
WikipediaWithNoscript.prototype.getLangLink = function(lang) {
	var langDiv = document.getElementById('p-lang');
	if (langDiv) {
		var links = langDiv.getElementsByTagName('a');
		var re = new RegExp(lang + '.wikipedia.org', 'g');
		for (x in links)
			if (re.test(links[x].href))
				return links[x].href;
	}
	return null;
};

// Append the quick link to the article title.
WikipediaWithNoscript.prototype.addQuickWikiLink = function(label, link) {

	if (!label || !link)
		return;

	var heading = document.getElementById('firstHeading');

	// pl.wikipedia shitty script overcome...
	var innerDiv = heading.getElementsByTagName('div')[0];
	if (innerDiv)
		heading = innerDiv;

	heading.innerHTML += ' [<a href="' + link + '">' + label + '</a>]';

};

// Get used Wikipedia skin name or null upon error.
WikipediaWithNoscript.prototype.getSkinName = function() {
	var body = document.getElementsByTagName('body')[0];
	var classes = body.className.split(' ');
	for (var i = 0; i < classes.length; i++)
		if (classes[i].match(/^skin-.*/))
			return classes[i];
	return null;
};

// Set navigation bar visibility state.
WikipediaWithNoscript.prototype.showNavigationBar = function(show) {

	var elements = this.elementModifications[this.getSkinName()];
	if (!elements)
		elements = this.elementModifications['skin-monobook'];

	if (show)
		// remove our style (back to the default)
		for (var i = 0; i < elements.length; i++) {
			var elemInfo = elements[i];
			var elem = document.getElementById(elemInfo[0]);
			if (elem)
				elem.removeAttribute('style');
		}
	else
		// set new (our) style
		for (var i = 0; i < elements.length; i++) {
			var elemInfo = elements[i];
			var elem = document.getElementById(elemInfo[0]);
			if (elem)
				elem.setAttribute('style', elemInfo[1]);
		}

	var hider = document.getElementById(this.navBarHiderId);
	if (show)
		hider.innerHTML = '«';
	else
		hider.innerHTML = '»';

};

// Toggle navigation bar visibility state.
WikipediaWithNoscript.prototype.toggleNavigationBar = function() {
	if (this.navBarHidden) {
		this.navBarHidden = false;
		GM_setValue('navBarHidden', false);
		this.showNavigationBar(true);
	}
	else {
		this.navBarHidden = true;
		GM_setValue('navBarHidden', true);
		this.showNavigationBar(false);
	}
};


var instance = new WikipediaWithNoscript();
instance.init();
