export default class Player {
  constructor(uiPlayer) {
    this.audio = new Audio();
    this.audio.addEventListener("loadeddata", () => this.refresh());
    this.audio.addEventListener("ended", () => this.stop());

    this.isPlaying = false;

    this.btPlayback = uiPlayer.querySelector(".playback-button");
    this.btPlayback.addEventListener("click", () => this.clickPlaybackButton());

    this.uiImagePlay = this.btPlayback.querySelector(".play");
    this.uiImagePause = this.btPlayback.querySelector(".pause");

    this.uiTimeStart = uiPlayer.querySelector(".time-start");
    this.uiTimeFinish = uiPlayer.querySelector(".time-finish");

    this.uiTimeBar = uiPlayer.querySelector(".timebar-bar");
    this.uiTimeBar.addEventListener("click", (event) => this.movePlayTime(event));

    this.uiTimeCircle = uiPlayer.querySelector(".timebar-circle");

    this.uiVolumeMax = uiPlayer.querySelector(".volume-control.max");
    this.uiVolumeMax.addEventListener("click", () => this.volumeUp());

    this.uiVolumeMin = uiPlayer.querySelector(".volume-control.min");
    this.uiVolumeMin.addEventListener("click", () => this.volumeDown());
  }

  clickPlaybackButton() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  setTrack(path) {
    this.audio.src = path;
  }

  movePlayTime(event) {
    const ratio = event.offsetX / event.target.offsetWidth;
    this.audio.currentTime = ratio * this.audio.duration;
    this.refresh();
  }

  volumeUp() {
    this.audio.volume = Math.min(1, this.audio.volume + .1).toFixed(1);
  }

  volumeDown() {
    this.audio.volume = Math.max(0, this.audio.volume - .1).toFixed(1);
  }

  play() {
    this.audio.play();
    this.isPlaying = true;

    this.uiImagePlay.classList.add("no-display");
    this.uiImagePause.classList.remove("no-display");

    this.refresh();
    this.interval = setInterval(() => this.refresh(), 200);
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;

    this.uiImagePlay.classList.remove("no-display");
    this.uiImagePause.classList.add("no-display");

    clearInterval(this.interval);
  }

  stop() {
    this.pause();
    this.audio.currentTime = 0;
    this.refresh();
  }

  refresh() {
    function format(sec) {
      function num(val) {
        val = Math.floor(val);
        return val < 10 ? '0' + val : val;
      }

      const minutes = sec / 60 % 60;
      const seconds = sec % 60;

      return num(minutes) + ":" + num(seconds);
    }

    const current = this.audio.currentTime || 0;
    const duration = this.audio.duration || 0;

    this.uiTimeStart.textContent = format(Math.round(current));
    this.uiTimeFinish.textContent = format(Math.round(duration));

    const percentage = Math.round(current / duration * 100);

    this.uiTimeCircle.style = `left: ${percentage}%;`;
    this.uiTimeBar.style = `background: linear-gradient(to right, rgb(0, 188, 140) 0%, 
      rgb(61, 133, 140) ${percentage}%, rgb(115, 115, 115) ${percentage}%, rgb(115, 115, 115) 100%);`;
  }
}