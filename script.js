// Toggle play/pause icon
const showPlayIcon = () => {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("fa-pause", "fa-play");
};

// Play
const togglePlay = () => {
  if (video.paused) {
    video.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("fa-play", "fa-pause");
  } else {
    video.pause();
    showPlayIcon();
  }
};

// Calculate display time format
const displayTime = (time) => {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
};

// Update progress bar as video plays
const updateProgress = (e) => {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = `${displayTime(video.currentTime)} /`;
  duration.textContent = `${displayTime(video.duration)}`;
};

// Seek

const setProgress = (e) => {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
};

let lastVolume = 1; //100%

// Volume
const changeVolume = (e) => {
  let volume = e.offsetX / volumeRange.offsetWidth;
  // Rounding volume up or down
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;
  // Change icon depending on volume
  volumeIcon.className = "";
  if (volume > 0.6) {
    volumeIcon.classList.add("fas", "fa-volume-up");
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add("fas", "fa-volume-down");
  } else if (volume === 0 || volume === 0.1) {
    volumeIcon.classList.add("fas", "fa-volume-off");
  }
  lastVolume = volume;
};

// Mute/Unmute which remembers last volume level
const toggleMute = () => {
  volumeIcon.className = "";
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon.classList.add("fas", "fa-volume-mute");
    volumeIcon.setAttribute("title", "Unmute");
  } else {
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    volumeIcon.classList.add("fas", "fa-volume-up");
    volumeIcon.setAttribute("title", "Mute");
  }
};

// Change video speed

const changeSpeed = () => {
  video.playbackRate = speed.value;
};

// Fullscreen

const openFullscreen = (elem) => {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add("video-fullscreen");
};

/* Close fullscreen */
const closeFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove("video-fullscreen");
};

let fullscreen = false;

const toggleFullscreen = () => {
  if (!fullscreen) {
    openFullscreen(player);
  } else {
    closeFullscreen();
  }
  fullscreen = !fullscreen;
};

// Event Listeners
// On video end show play button icon
video.addEventListener("ended", showPlayIcon);
playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);
speed.addEventListener("change", changeSpeed);
fullScreenBtn.addEventListener("click", toggleFullscreen);
