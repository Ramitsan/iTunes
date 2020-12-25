import { addZero } from './supScript.js';

export const musicPlayerInit = () => {
  const audio = document.querySelector('.audio');
  const audioImg = document.querySelector('.audio-img');
  const audioHeader = document.querySelector('.audio-header');
  const audioPlayer = document.querySelector('.audio-player');
  const audioNavigation = document.querySelector('.audio-navigation');
  const audioButtonPlay = document.querySelector('.audio-button__play');
  const audioProgress = document.querySelector('.audio-progress');
  const audioTimePassed = document.querySelector('.audio-time__passed');
  const audioProgressTiming = document.querySelector('.audio-progress__timing');
  const audioTimeTotal = document.querySelector('.audio-time__total');

  // массив аудиозаписей
  const playList = ['hello', 'flow', 'speed'];
  let trackIndex = 0;

  // функция показа названия текущего трека
  const showTitleCurrentTrack = (item) => {
    audioHeader.textContent = item.toUpperCase();
  };

  // функция воспроизведения текущего трека
  const loadTrack = () => {
    const isPlayed = audioPlayer.paused; // стоит ли сейчас пауза
    const track = playList[trackIndex];

    audioPlayer.src = `./audio/${track}.mp3`;
    audioImg.src = `./audio/${track}.jpg`;
    showTitleCurrentTrack(track);

    if (isPlayed) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
  };

  // функция воспроизведения следующего трека 
  const nextTrack = () => {
    if (trackIndex === playList.length - 1) {
      trackIndex = 0;
    } else {
      trackIndex++;
    }
    loadTrack();
  };

  // функция воспроизведения предыдущего трека
  const prevTrack = () => {
    if (trackIndex !== 0) {
      trackIndex--;
    } else {
      trackIndex = playList.length - 1;
    }
    loadTrack();
  };

  audioNavigation.addEventListener('click', (evt) => {
    const target = evt.target;
    // если нажали на кнопку воспроизведения
    if (target.classList.contains('audio-button__play')) {
      audio.classList.toggle('play');
      audioButtonPlay.classList.toggle('fa-play');
      audioButtonPlay.classList.toggle('fa-pause');

      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
      const track = playList[trackIndex];
      showTitleCurrentTrack(track);
    }

    // при нажатии на кнопку предыдущего трека воспроизводим предыдущий трэк
    if (target.classList.contains('audio-button__prev')) {
      prevTrack();
    }

    // при нажатии на кнопку следующего трека воспроизводим следующий трэк
    if (target.classList.contains('audio-button__next')) {
      nextTrack();
    }
  });

  // если трек закончился, воспроизведение автоматически переключается на следующий
  audioPlayer.addEventListener('ended', () => {
    nextTrack();
    audioPlayer.play();
  });

  // прогресс бар и показатели времени
  audioPlayer.addEventListener('timeupdate', () => {
    const duration = audioPlayer.duration;
    const currentTime = audioPlayer.currentTime;
    const progress = currentTime / duration * 100;

    audioProgressTiming.style.width = `${progress}%`;

    // текущее время трека
    const minutesPassed = Math.floor(currentTime / 60) || '0';
    const secondsPassed = Math.floor(currentTime % 60) || '0';

    // общее время трека
    const minutesTotal = Math.floor(duration / 60) || '0';
    const secondsTotal = Math.floor(duration % 60) || '0';

    audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
    audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
  });

  //переключение прогресс бара
  audioProgress.addEventListener('click', evt => {
    const x = evt.offsetX;
    const allWidth = audioProgress.clientWidth;
    const progress = (x / allWidth) * audioPlayer.duration;
    audioPlayer.currentTime = progress;
  });

  // останавливаем воспроизведение
  musicPlayerInit.stop = () => {
    audioPlayer.pause();
    audio.classList.remove('play');
  };
};