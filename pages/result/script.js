const MAX_SCORE = 30;

function changeLang() {
  setResult();
}

function setResult() {
  const lang = localStorage.getItem('songbird-language');
  const result = localStorage.getItem("songbird-quiz-result");

  const uiScore = document.querySelector(".score");
  const btRestart = document.querySelector(".button-restart");

  if (result) {
    if (result == MAX_SCORE) {
      switch (lang) {
        case "en":
          uiScore.textContent = "maximum";
          btRestart.textContent = "Start over!";
          break;
        case "ru":
          uiScore.textContent = "максимальное количество";
          btRestart.textContent = "Начать сначала!";
          break;
      }
    } else {
      uiScore.textContent = result;
    }
  } else {
    uiScore.textContent = 0;
  }
}

window.addEventListener("load", () => {
  setResult();

  const langEn = document.querySelector(".lang.en");
  langEn.addEventListener('click', () => changeLang());

  const langRu = document.querySelector(".lang.ru");
  langRu.addEventListener('click', () => changeLang());
});