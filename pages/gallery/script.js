import Player from "../../assets/modules/audio-player.js";

import { default as birdsDataRu } from "../../assets/modules/birds-data-ru.js";
import { default as birdsDataEn } from "../../assets/modules/birds-data-en.js";

let birdsData;

function changeLang() {
  setBirdsData();
  const uiSections = document.querySelectorAll(".section-info");
  let n = 0;

  for (let i = 0; i < birdsData.length; i++) {
    for (let j = 0; j < birdsData[i].length; j++) {
      let section = uiSections[n];
      let oBirdData = birdsData[i][j];

      let birdTitle = section.querySelector(".bird-title");
      birdTitle.textContent = oBirdData.name;

      let birdSubtitle = section.querySelector(".bird-subtitle");
      birdSubtitle.textContent = oBirdData.species;

      let birdText = section.querySelector(".bird-text");
      birdText.textContent = oBirdData.description;

      n++;
    }
  }
}

function setBirdsData() {
  switch (localStorage.getItem('songbird-language')) {
    case 'en':
      birdsData = birdsDataEn;
      break;
    case 'ru':
      birdsData = birdsDataRu;
      break;
    default:
      birdsData = birdsDataEn;
      break;
  }
}

window.addEventListener("load", () => {
  function showBirdInfo(section, i, j) {
    const oBirdData = birdsData[i][j];

    const birdTitle = section.querySelector(".bird-title");
    birdTitle.textContent = oBirdData.name;

    const birdSubtitle = section.querySelector(".bird-subtitle");
    birdSubtitle.textContent = oBirdData.species;

    const birdText = section.querySelector(".bird-text");
    birdText.textContent = oBirdData.description;

    const birdImage = section.querySelector(".bird-image");
    birdImage.src = oBirdData.image;

    const uiPlayer = section.querySelector(".audio-player");
    const oPlayer = new Player(uiPlayer);
    oPlayer.setTrack(oBirdData.audio);
  }

  const uiSection = document.querySelector(".section-info");
  const uiContainer = document.querySelector(".container");

  uiContainer.innerHTML = "";
  setBirdsData();

  for (let i = 0; i < birdsData.length; i++) {
    for (let j = 0; j < birdsData[i].length; j++) {
      let section = uiSection.cloneNode(true);
      uiContainer.append(section);
      showBirdInfo(section, i, j);
    }
  }

  const langEn = document.querySelector(".lang.en");
  langEn.addEventListener('click', () => changeLang());

  const langRu = document.querySelector(".lang.ru");
  langRu.addEventListener('click', () => changeLang());
});