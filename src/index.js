const raceText = "Eine wunderbare Heiterkeit".split(" ")
const raceTextArr = raceText.map((line, index) => {
	return '<span id="WORD'+index+'">'+line+' </span>'
})
let activeWord = 0
let timer = 0
let startTime = null
const progressBar = $(".progress")
progressBar.hide()
const startResetButton = $("#start_reset")
const textContainer = $("#text")
const textInput = $("#text_in")

const updateProgressBar = () => {
	let progressPercentage= 100 / raceText.length * activeWord
	$(".progress-meter").css("width", progressPercentage + "%")
	progressBar.fadeIn()
}
const startCountdown = () => {
	let countdown = 3
	textContainer.text("Get Ready!")
	const countdownInterval = setInterval(() => {
		textContainer.text(countdown)
		if(countdown === 0) {
			clearInterval(countdownInterval)
			startTypingAndReset()
		}
		countdown--
	}, 1000)
}

const startTypingAndReset = () => {
	activeWord = 0
	/**
	 * Show everything
	 */
	progressBar.fadeIn()
	startResetButton.text("Reset and try again")
	startResetButton.addClass("alert")
	startResetButton.removeClass("success")
	updateProgressBar()
	textInput.fadeIn()
	textInput.val("")
	textInput.prop("disabled", false)
	textInput.focus()

	$("#text").html(raceTextArr.join(" "))
	markActiveWord()
	startTime = new Date()
}
const markActiveWord = () => {
	textContainer.find("span").removeClass("active_word")
	textContainer.find("#WORD" + activeWord).addClass("active_word")
	updateProgressBar()
}
const checkTyping = (input) => {
	/**
	 * 1st condition: a word from 1 to length-1 with whitespace
	 * 2nd condition: the last word without whitespace finishes the race
	 */
	if(input === raceText[activeWord] + " " ||
		(activeWord === raceText.length-1) && input === raceText[activeWord]) {
		textInput.val("")
		markActiveWord(activeWord++)
	}
	if(activeWord === raceText.length) {
		const endTime = new Date()
		$("#text").text((endTime - startTime)/1000 + " Sekunden")
		textInput.fadeOut()
		progressBar.fadeOut()
	}
}

startResetButton.on("click", () => {
	startCountdown()
})
textInput.on("keyup", () => {
	checkTyping(textInput.val())
})