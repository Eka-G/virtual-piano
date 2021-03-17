"use strict";

const piano = document.querySelector(".piano");
const pianoKeys = document.querySelectorAll(".piano-key");
const buttons = document.querySelector(".btn-container");
const fullscreenButton = document.querySelector(".fullscreen");
const body = document.querySelector("body");

function makeActive(elem) {
  elem.classList.toggle("piano-key-active");
  elem.classList.toggle("piano-key-active-pseudo");
  setTimeout(() => elem.classList.toggle("piano-key-active"), 200)
  setTimeout(() => elem.classList.toggle("piano-key-active-pseudo"), 200)
}

function playAudio(event) {
  const audio = new Audio();
  if (0 <= event.offsetY && event.offsetY < event.target.offsetHeight) {
    makeActive(event.target)
    audio.src = "assets/audio/" + event.target.dataset.note + ".mp3";
    audio.play();
  }
}

function playAudioDrag(event) {
  const activeListener = event => playAudio(event);
  piano.addEventListener("mouseover", activeListener);
  document.addEventListener("mouseup", () => piano.removeEventListener("mouseover", activeListener), { once: true });
}

function playAudioButtons(event) {
  if (event.code.substr(0, 3) === "Key") {
    for (let key of pianoKeys) {

      if (key.dataset.letter === event.code[3]) {
        makeActive(key);
        audio.src = "assets/audio/" + key.dataset.note + ".mp3";
        audio.play();
      }
    }
  }
}

function changeLayout(event) {
  if (event.target.classList.contains("btn")) {
    event.target.classList.toggle("btn-active");

    event.target.nextElementSibling ?
      event.target.nextElementSibling.classList.toggle("btn-active") :
      event.target.previousElementSibling.classList.toggle("btn-active");

    for (let key of pianoKeys) {
      key.classList.toggle("piano-key-letter");
    }
  }
}

function toggleFullScreen(event) {
  document.fullscreenElement ?
    document.exitFullscreen() :
    body.requestFullscreen();
}

piano.addEventListener("click", event => playAudio(event));
piano.addEventListener("mousedown", event => playAudioDrag(event));
buttons.addEventListener("click", event => changeLayout(event));
document.addEventListener("keydown", event => playAudioButtons(event));
fullscreenButton.addEventListener("click", event => toggleFullScreen(event));
