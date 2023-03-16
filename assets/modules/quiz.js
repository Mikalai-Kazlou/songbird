import Player from "./audio-player.js";
import { default as birdsDataRu } from "./birds-data-ru.js";
import { default as birdsDataEn } from "./birds-data-en.js";
import Counter from "./counter.js";

export default class Quiz {
  constructor() {
    this.lang = localStorage.getItem('songbird-language');
    this.setBirdsData();
  }

  setBirdsData() {
    switch (this.lang) {
      case 'en':
        this.birdsData = birdsDataEn;
        break;
      case 'ru':
        this.birdsData = birdsDataRu;
        break;
      default:
        this.birdsData = birdsDataEn;
        break;
    }
  }

  start() {
    const uiScore = document.querySelector(".score-value");
    this.counter = new Counter(uiScore);

    const uiPlayerMain = document.querySelector(".section-question .audio-player");
    this.oPlayerMain = new Player(uiPlayerMain);

    const uiPlayerInfo = document.querySelector(".section-info .audio-player");
    this.oPlayerInfo = new Player(uiPlayerInfo);

    localStorage.removeItem("songbird-quiz-result");

    this.level = 0;
    this.startLevel();
  }

  startLevel() {
    const oBirdDataSet = this.birdsData[this.level];

    const answers = document.querySelectorAll(".answers-value");
    for (let i = 0; i < answers.length; i++) {
      answers[i].textContent = oBirdDataSet[i].name;
    }

    this.levelIsDone = false;
    this.currentScore = oBirdDataSet.length - 1;

    this.correctAnswer = Math.floor(Math.random() * oBirdDataSet.length);
    this.previousAnswers = [];

    this.oPlayerMain.stop();
    this.oPlayerMain.setTrack(oBirdDataSet[this.correctAnswer].audio);

    const points = document.querySelectorAll(".answers-point");
    points.forEach(point => point.classList.remove("correct", "error"));

    const levels = document.querySelectorAll(".level-item");
    levels.forEach(level => level.classList.remove("active"));
    levels[this.level].classList.add("active");

    const btNextLevel = document.querySelector(".button-next-level");
    btNextLevel.classList.add("disabled");

    const birdTitle = document.querySelector(".section-question .bird-title");
    birdTitle.textContent = "******";

    const birdImage = document.querySelector(".section-question .bird-image");
    birdImage.src = "../../assets/images/bird.jpg";

    this.hideBirdInfo();
  }

  finishLevel() {
    this.levelIsDone = true;
    this.counter.add(this.currentScore);

    const btNextLevel = document.querySelector(".button-next-level");
    btNextLevel.classList.remove("disabled");

    const oBirdDataSet = this.birdsData[this.level];
    const oBirdData = oBirdDataSet[this.correctAnswer];

    const birdTitle = document.querySelector(".section-question .bird-title");
    birdTitle.textContent = oBirdData.name;

    const birdImage = document.querySelector(".section-question .bird-image");
    birdImage.src = oBirdData.image;

    this.oPlayerMain.pause();
    this.showBirdInfo(this.correctAnswer);
  }

  startNextLevel() {
    if (!this.levelIsDone) return;

    this.level++;

    if (this.level > this.birdsData.length - 1) {
      localStorage.setItem('songbird-quiz-result', this.counter.get());
      window.location.href = "../result/";
    } else {
      this.startLevel();
    }
  }

  showBirdInfo(index) {
    const bird = document.querySelector(".bird");
    bird.classList.remove("no-display");

    const birdCap = document.querySelector(".bird-cap");
    birdCap.classList.add("no-display");

    const oBirdDataSet = this.birdsData[this.level];
    const oBirdData = oBirdDataSet[index];

    const birdTitle = document.querySelector(".section-info .bird-title");
    birdTitle.textContent = oBirdData.name;

    const birdSubtitle = document.querySelector(".bird-subtitle");
    birdSubtitle.textContent = oBirdData.species;

    const birdText = document.querySelector(".bird-text");
    birdText.textContent = oBirdData.description;

    const birdImage = document.querySelector(".section-info .bird-image");
    birdImage.src = oBirdData.image;

    this.oPlayerInfo.stop();
    this.oPlayerInfo.setTrack(oBirdData.audio);
  }

  hideBirdInfo() {
    const bird = document.querySelector(".bird");
    bird.classList.add("no-display");

    const birdCap = document.querySelector(".bird-cap");
    birdCap.classList.remove("no-display");

    const birdTitle = document.querySelector(".section-info .bird-title");
    birdTitle.textContent = "******";

    const birdSubtitle = document.querySelector(".bird-subtitle");
    birdSubtitle.textContent = "******";

    const birdText = document.querySelector(".bird-text");
    birdText.textContent = "";

    const birdImage = document.querySelector(".section-info .bird-image");
    birdImage.src = "../../assets/images/bird.jpg";

    this.oPlayerInfo.stop();
  }

  answer(element) {
    const answers = document.querySelectorAll(".answers-item");
    this.currentAnswer = Array.from(answers).indexOf(element);

    if (this.levelIsDone) {
      this.showBirdInfo(this.currentAnswer);
      return;
    }

    if (this.currentAnswer === this.correctAnswer) {
      this.processRightAnswer(element);
      this.finishLevel();
    } else {
      this.processWrongAnswer(element, this.currentAnswer);
      this.showBirdInfo(this.currentAnswer);
    }
  }

  processRightAnswer(element) {
    const audio = new Audio("../../assets/audio/win.wav");
    audio.play();

    const point = element.querySelector(".answers-point");
    point.classList.add("correct");
  }

  processWrongAnswer(element, answer) {
    const audio = new Audio("../../assets/audio/error.wav");
    audio.play();

    const point = element.querySelector(".answers-point");
    point.classList.add("error");

    if (!this.previousAnswers.includes(answer)) {
      this.currentScore--;
      this.previousAnswers.push(answer);
    }
  }

  changeLang() {
    this.lang = localStorage.getItem('songbird-language');
    this.setBirdsData();

    const oBirdDataSet = this.birdsData[this.level];

    const answers = document.querySelectorAll(".answers-value");
    for (let i = 0; i < answers.length; i++) {
      answers[i].textContent = oBirdDataSet[i].name;
    }

    if (this.levelIsDone) {
      const oBirdData = oBirdDataSet[this.correctAnswer];

      const birdTitle = document.querySelector(".section-question .bird-title");
      birdTitle.textContent = oBirdData.name;
    }

    const bird = document.querySelector(".bird");
    if (!bird.classList.contains("no-display")) {
      const oBirdData = oBirdDataSet[this.currentAnswer];

      const birdTitle = document.querySelector(".section-info .bird-title");
      birdTitle.textContent = oBirdData.name;

      const birdSubtitle = document.querySelector(".bird-subtitle");
      birdSubtitle.textContent = oBirdData.species;

      const birdText = document.querySelector(".bird-text");
      birdText.textContent = oBirdData.description;
    }
  }
}