import txtSelfCheck from "./self-check.js";
console.log(txtSelfCheck);

window.addEventListener("load", () => setLang());

const langEn = document.querySelector(".lang.en");
langEn.addEventListener('click', () => setEnLang());

const langRu = document.querySelector(".lang.ru");
langRu.addEventListener('click', () => setRuLang());

const uiMenuItems = document.querySelectorAll(".menu-item");
const uiLevelItems = document.querySelectorAll(".level-item");

const uiScore = document.querySelector(".score-lable");
const uiBirdCap = document.querySelector(".bird-cap");
const uiCongratulations = document.querySelector(".congratulations");
const uiCongratulationsText = document.querySelector(".congratulations-text");

const btStart = document.querySelector(".button-start");
const btNextLevel = document.querySelector(".button-next-level");
const btRestart = document.querySelector(".button-restart");

function setLang() {
  switch (localStorage.getItem("songbird-language")) {
    case "en":
      setEnLang(); break;
    case "ru":
      setRuLang(); break;
    default:
      setEnLang();
  }
}

function setContent(uiElement, content) {
  if (uiElement) {
    uiElement.innerHTML = content;
  }
}

function setEnLang() {
  localStorage.setItem('songbird-language', 'en');

  if (uiMenuItems.length > 0) {
    uiMenuItems[0].textContent = "Main";
    uiMenuItems[1].textContent = "Quiz";
    uiMenuItems[2].textContent = "Gallery";
  }

  if (uiLevelItems.length > 0) {
    uiLevelItems[0].textContent = "Warm up";
    uiLevelItems[1].textContent = "Passerines";
    uiLevelItems[2].textContent = "Forest birds";
    uiLevelItems[3].textContent = "Songbirds";
    uiLevelItems[4].textContent = "Predator birds";
    uiLevelItems[5].textContent = "Sea birds";
  }

  setContent(btStart, "Start Quiz");
  setContent(btNextLevel, "Next Level");
  setContent(btRestart, "Try again!");

  setContent(uiScore, "Score:");
  setContent(uiBirdCap, "Listen to the player<br>Select a bird from the list");
  setContent(uiCongratulations, "Congratulations!");
  setContent(uiCongratulationsText, 'You passed the quiz and scored <strong><span class="score">0</span></strong> out of <strong>30</strong> possible points');
}

function setRuLang() {
  localStorage.setItem('songbird-language', 'ru');

  if (uiMenuItems.length > 0) {
    uiMenuItems[0].textContent = "Главная";
    uiMenuItems[1].textContent = "Викторина";
    uiMenuItems[2].textContent = "Галерея";
  }

  if (uiLevelItems.length > 0) {
    uiLevelItems[0].textContent = "Разминка";
    uiLevelItems[1].textContent = "Воробьиные";
    uiLevelItems[2].textContent = "Лесные птицы";
    uiLevelItems[3].textContent = "Певчие птицы";
    uiLevelItems[4].textContent = "Хищные птицы";
    uiLevelItems[5].textContent = "Морские птицы";
  }

  setContent(btStart, "Начать викторину");
  setContent(btNextLevel, "Следующий уровень");
  setContent(btRestart, "Попробовать еще раз!");

  setContent(uiScore, "Счет:");
  setContent(uiBirdCap, "Послушайте плеер<br>Выберите птицу из списка");
  setContent(uiCongratulations, "Поздравляем!");
  setContent(uiCongratulationsText, 'Вы прошли викторину и набрали <strong><span class="score">0</span></strong> из <strong>30</strong> возможных баллов');
}