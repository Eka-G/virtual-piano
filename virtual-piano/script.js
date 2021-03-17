"use strict";

const piano = document.querySelector(".piano");
const pianoKeys = document.querySelectorAll(".piano-key");
const buttons = document.querySelector(".btn-container");

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


function playAudio(event) {
  if (0 <= event.offsetY && event.offsetY < event.target.offsetHeight) {
    event.target.classList.toggle("piano-key-active");
    event.target.classList.toggle("piano-key-active-pseudo");
    setTimeout(() => event.target.classList.toggle("piano-key-active"), 200)
    setTimeout(() => event.target.classList.toggle("piano-key-active-pseudo"), 200)
    switch (event.target.dataset.note) {
      case "a":
        audioA.play();
        break;

      case "a♯":
        audioA1.play();
        break;

      case "b":
        audioB.play();
        break;

      case "c":
        audioC.play();
        break;

      case "c♯":
        audioC1.play();
        break;

      case "d":
        audioD.play();
        break;

      case "d♯":
        audioD1.play();
        break;

      case "e":
        audioE.play();
        break;

      case "f":
        audioF.play();
        break;

      case "f♯":
        audioF1.play();
        break;

      case "g":
        audioG.play();
        break;

      case "g♯":
        audioG1.play();
        break;
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
