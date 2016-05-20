"use strict";

var raceText = "Eine wunderbare Heiterkeit".split(" ");
var raceTextArr = raceText.map(function (line, index) {
	return '<span id="WORD' + index + '">' + line + ' </span>';
});
var activeWord = 0;
var timer = 0;
var startTime = null;
var progressBar = $(".progress");
progressBar.hide();
var startResetButton = $("#start_reset");
var textContainer = $("#text");
var textInput = $("#text_in");

var updateProgressBar = function updateProgressBar() {
	var progressPercentage = 100 / raceText.length * activeWord;
	$(".progress-meter").css("width", progressPercentage + "%");
	progressBar.fadeIn();
};
var startCountdown = function startCountdown() {
	var countdown = 3;
	textContainer.text("Get Ready!");
	var countdownInterval = setInterval(function () {
		textContainer.text(countdown);
		if (countdown === 0) {
			clearInterval(countdownInterval);
			startTypingAndReset();
		}
		countdown--;
	}, 1000);
};

var startTypingAndReset = function startTypingAndReset() {
	activeWord = 0;
	/**
  * Show everything
  */
	progressBar.fadeIn();
	startResetButton.text("Reset and try again");
	startResetButton.addClass("alert");
	startResetButton.removeClass("success");
	updateProgressBar();
	textInput.fadeIn();
	textInput.val("");
	textInput.prop("disabled", false);
	textInput.focus();

	$("#text").html(raceTextArr.join(" "));
	markActiveWord();
	startTime = new Date();
};
var markActiveWord = function markActiveWord() {
	textContainer.find("span").removeClass("active_word");
	textContainer.find("#WORD" + activeWord).addClass("active_word");
	updateProgressBar();
};
var checkTyping = function checkTyping(input) {
	/**
  * 1st condition: a word from 1 to length-1 with whitespace
  * 2nd condition: the last word without whitespace finishes the race
  */
	if (input === raceText[activeWord] + " " || activeWord === raceText.length - 1 && input === raceText[activeWord]) {
		textInput.val("");
		markActiveWord(activeWord++);
	}
	if (activeWord === raceText.length) {
		var endTime = new Date();
		$("#text").text((endTime - startTime) / 1000 + " Sekunden");
		textInput.fadeOut();
		progressBar.fadeOut();
	}
};

startResetButton.on("click", function () {
	startCountdown();
});
textInput.on("keyup", function () {
	checkTyping(textInput.val());
});
