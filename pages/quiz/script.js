import Quiz from "../../assets/modules/quiz.js";

const quiz = new Quiz();
window.addEventListener("load", () => quiz.start());

const btNextLevel = document.querySelector(".button-next-level");
btNextLevel.addEventListener("click", () => quiz.startNextLevel());

const uiAnswers = document.querySelectorAll(".answers-item");
uiAnswers.forEach((uiAnswer) => {
  uiAnswer.addEventListener("click", (event) => quiz.answer(event.currentTarget));
});

const langEn = document.querySelector(".lang.en");
langEn.addEventListener('click', () => quiz.changeLang());

const langRu = document.querySelector(".lang.ru");
langRu.addEventListener('click', () => quiz.changeLang());
