"use strict";

const piano = document.querySelector(".piano");
const pianoKeys = document.querySelectorAll(".piano-key");
const buttons = document.querySelector(".btn-container");
const fullscreenButton = document.querySelector(".fullscreen");
const body = document.querySelector("body");

const activeListener = event => playAudio(event);

function makeActive(elem) {
  elem.classList.toggle("piano-key-active");
  elem.classList.toggle("piano-key-active-pseudo");
}

function playAudio(event) {
  if (!event.target.classList.contains("piano") && 0 <= event.offsetY && event.offsetY < event.target.offsetHeight) {
    const audio = new Audio();
    makeActive(event.target);
    audio.src = "assets/audio/" + event.target.dataset.note + ".mp3";
    audio.play();
  }
}

function playAudioDrag(event) {
  let lastKey;
  playAudio(event);
  const chancgeKey = function (event) {
    playAudio(event);
    lastKey = event.target;
    if (!event.relatedTarget.classList.contains("piano")) makeActive(event.relatedTarget);
  }

  piano.addEventListener("mouseover", chancgeKey);
  document.addEventListener("mouseup", () => {
    lastKey ? makeActive(lastKey) : makeActive(event.target);
    piano.removeEventListener("mouseover", chancgeKey);
    piano.removeEventListener("click", activeListener);
  }, { once: true });
}

function playAudioButtons(event) {
  if (event.code.substr(0, 3) === "Key" && !event.repeat) {

    for (let key of pianoKeys) {
      if (key.dataset.letter === event.code[3]) {
        const audio = new Audio();
        makeActive(key);
        audio.src = "assets/audio/" + key.dataset.note + ".mp3";
        audio.play();

        document.addEventListener("keyup", () => {
          makeActive(key);
        }, { once: true });
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

piano.addEventListener("mousedown", event => playAudioDrag(event));
buttons.addEventListener("click", event => changeLayout(event));
document.addEventListener("keydown", event => playAudioButtons(event));
fullscreenButton.addEventListener("click", event => toggleFullScreen(event));
