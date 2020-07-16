
let container = document.createElement('div');
let paragraph = document.createElement('p');
let icon = document.createElement('i');
icon.className = "fa fa-microphone";
container.appendChild(icon);
container.appendChild(paragraph);
document.body.appendChild(container);

window.SpeechRecognition = webkitSpeechRecognition || window.SpeechRecognition;
const synth = window.speechSynthesis;
recognition = new SpeechRecognition();
// recognition.interimResult = true;

const speak = function () {
    const utterThis = new SpeechSynthesisUtterance('That was awesome');
    synth.speak(utterThis);
}

const dictate = function () {
    recognition.start();
    recognition.onresult = (event) => {
        console.log(event);
        const speechToText = event.results[0][0].transcript;
        console.log(speechToText);
        paragraph.textContent = speechToText;
        
        if (event.results[0].isFinal) {
            paragraph = document.createElement('p');
            container.appendChild(paragraph);

            speak();
        }
    };
};

icon.addEventListener('click', () => {
    dictate();
});