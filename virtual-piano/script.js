"use strict";

const piano = document.querySelector(".piano");
const pianoKeys = document.querySelectorAll(".piano-key");
const buttons = document.querySelector(".btn-container");

const audio = new Audio();
const audioA = document.querySelector(".audio-a");
const audioA1 = document.querySelector(".audio-a1");
const audioB = document.querySelector(".audio-b");
const audioC = document.querySelector(".audio-c");
const audioC1 = document.querySelector(".audio-c1");
const audioD = document.querySelector(".audio-d");
const audioD1 = document.querySelector(".audio-d1");
const audioE = document.querySelector(".audio-e");
const audioF = document.querySelector(".audio-f");
const audioF1 = document.querySelector(".audio-f1");
const audioG = document.querySelector(".audio-g");
const audioG1 = document.querySelector(".audio-g1");

function makeActive(elem) {
  elem.classList.toggle("piano-key-active");
  elem.classList.toggle("piano-key-active-pseudo");
  setTimeout(() => elem.classList.toggle("piano-key-active"), 200)
  setTimeout(() => elem.classList.toggle("piano-key-active-pseudo"), 200)
}

function playAudio(event) {
  if (0 <= event.offsetY && event.offsetY < event.target.offsetHeight) {
    makeActive(event.target)
    audio.src = "assets/audio/" + event.target.dataset.note + ".mp3";
    audio.play();
  }
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

piano.addEventListener("click", event => playAudio(event));
buttons.addEventListener("click", event => changeLayout(event));
document.addEventListener("keydown", event => playAudioButtons(event));
