// ==UserScript==
// @name        Mailing killer for Interia.pl
// @namespace   https://github.com/Arkq
// @description Delete unwanted advertising mailing from the provider.
// @include     https://poczta.interia.pl/classic/getmails*
// @grant       none
// @version     0.1.6
// @downloadURL https://raw.githubusercontent.com/Arkq/userscripts/master/scripts/PocztaFM-mailing-killer.user.js
// @icon        data:image/png;base64,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
// ==/UserScript==


function PocztaFMMailingKiller() {

	// collection of blocked emails
	this.blockedEmails = [
		'mailing@poczta.fm',
		'mailing@interia.pl',
		'mailing@mailing.gg.pl',
		'mailing@i-komunikator.pl',
		'email@ikmk.pl',
	];

	// auto remove behavior
	this.doAutoRemove = true;

}

PocztaFMMailingKiller.prototype.init = function() {

	var emailList = document.getElementById('mailsList');
	var selected = this.selectBlockedEmails(emailList);

	if (selected && this.doAutoRemove) {
		form = document.getElementById('mailsListForm');
		this.addHiddenInput(form, "deleteMsg", "Usuń");
		form.submit();
	}

};

PocztaFMMailingKiller.prototype.isEmailBlocked = function(email) {
	var length = this.blockedEmails.length;
	for (var i = 0; i < length; i++)
		if (email == this.blockedEmails[i])
			return true;
	return false;
};

PocztaFMMailingKiller.prototype.selectBlockedEmails = function(emailList) {

	var tableBody = emailList.getElementsByTagName('tbody');
	if (tableBody) tableBody = tableBody[0];

	var counter = 0;

	// iterate over all rows in the table
	var tableRows = tableBody.getElementsByTagName('tr');
	var length = tableRows.length;
	for (var i = 0; i < length; i++) {
		var tableRow = tableRows[i];

		var sender = tableRow.getElementsByClassName('mailSndr')[0].firstChild;
		var checkbox = tableRow.getElementsByClassName('mailOper')[0].firstChild;

		if (this.isEmailBlocked(sender.title)) {
			checkbox.checked = true;
			counter++;
		}
	}

	return counter;
};

// Create a hidden input element, and append it to the form.
PocztaFMMailingKiller.prototype.addHiddenInput = function(theForm, key, value) {
	var input = document.createElement('input');
	theForm.appendChild(input);
	input.type = 'hidden';
	input.name = key;
	input.value = value;
};


var instance = new PocztaFMMailingKiller();
instance.init();
