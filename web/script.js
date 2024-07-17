import {tracks} from './data.js';
console.log(tracks)
let audio=document.querySelector('audio')
// Обновление полосы прогресса в соответствии с временем воспроизведения
let progress=document.querySelector('.player_inner__bottom .playbar_inner')
const beginElement = document.getElementById('begin');
const endElement = document.getElementById('end');
const trackTitleElement = document.getElementById('trackTitle');
const artistNameElement = document.getElementById('artistName');
// Обновление значения duration при загрузке трека
audio.addEventListener('loadedmetadata', updateDuration);

// Обновление значения currentTime при воспроизведении трека
audio.addEventListener('timeupdate', updateCurrentTime);

function updateDuration() {
  const duration = formatTime(audio.duration);
  endElement.textContent = duration;
}

function updateCurrentTime() {
  const currentTime = formatTime(audio.currentTime);
  beginElement.textContent = currentTime;
}

// Функция для форматирования времени в формат "мм:сс"
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${padZero(minutes)}:${padZero(seconds)}`;
}

// Функция для добавления ведущего нуля к числу, если оно меньше 10
function padZero(number) {
  return number < 10 ? '0' + number : number;
}
function updateProgress(e) {
  const {duration, currentTime} = e.srcElement
  const progressPercent=(currentTime/duration)*100
  progress.style.width=`${progressPercent}%`
}
audio.addEventListener('timeupdate', updateProgress)
function setProgress(e)
{
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration
    audio.currentTime=(clickX/width)*duration
}
let progressContainer=document.querySelector('.player_inner__bottom .playbar')
progressContainer.addEventListener('click', setProgress)
// Получаем номер последнего трека
// Сохраняем номер последнего трека в localStorage
console.log(localStorage.getItem('lastTrackNumber'))
let currentMusic=Number(localStorage.getItem('lastTrackNumber'));
let imagemusic=document.getElementById('album');
imagemusic.src=tracks[currentMusic].cover;
const fileName = tracks[currentMusic].file.split('/').reverse()[0];
const title = fileName.split('.').slice(0, -1).join('.');
console.log(title);
trackTitleElement.textContent = title;
artistNameElement.textContent = tracks[currentMusic].artist;
console.log()
localStorage.setItem('lastTrackNumber', currentMusic);
// Получаем сохраненный номер последнего трека из localStorage
let savedLastTrackNumber = localStorage.getItem('lastTrackNumber');
// Проверяем, было ли сохранено значение
if (savedLastTrackNumber) {
  console.log('Номер последнего трека:', savedLastTrackNumber);
} else {
  console.log('Номер последнего трека не найден');
}
let player=document.querySelector("audio")
player.src=tracks[currentMusic].file;

let playBtn=document.getElementById("play");
let nextBtn=document.getElementById("next");
let prevBtn=document.getElementById("prev");
playBtn.onclick = play;
nextBtn.onclick = next;
prevBtn.onclick = prev;
let isPlaying = false;
document.addEventListener('keydown', function(event) {
  if (event.keyCode == 179) {
    event.preventDefault(); // предотвращаем стандартное действие при нажатии клавиши
    if (isPlaying==true) {
      Pause();
    } else {
      Play();
    }
  }
});
document.addEventListener('keydown', function(event) {
  if (event.keyCode == 176) {
    event.preventDefault(); // предотвращаем стандартное действие при нажатии клавиши
    next();
  }
});
document.addEventListener('keydown', function(event) {
  if (event.keyCode == 177) {
    event.preventDefault(); // предотвращаем стандартное действие при нажатии клавиши
    prev();
  }
});
function Play() {
  isPlaying = true;
  player.play();
  playBtn.className = "fa fa-pause-circle";
}

function Pause() {
  isPlaying = false;
  player.pause();
  playBtn.className = "fa fa-play-circle";
}
const vol7Button = document.querySelector(".player_inner__middle .cube_inner__right .volume_pip:nth-of-type(14)");
vol7Button.onclick = setVolume7;
function setVolume7() {
  audio.volume = 0.07;
}
const vol14Button = document.querySelector("#vol14");
vol14Button.onclick = setVolume14;
function setVolume14() {
  audio.volume = 0.14;
}
const vol100Button = document.querySelector("#vol100");
vol100Button.onclick = setVolume100;
function setVolume100() {
  audio.volume = 1;
}
function prev()
{
    currentMusic=currentMusic-1;
    const fileName = tracks[currentMusic].file.split('/').reverse()[0];
    const title = fileName.split('.').slice(0, -1).join('.');
    console.log(title);
    trackTitleElement.textContent = title;
    artistNameElement.textContent = tracks[currentMusic].artist;
    imagemusic.src=tracks[currentMusic].cover;
    player.src=tracks[currentMusic].file;
    if (currentMusic<0)
    {
        currentMusic=tracks[currentMusic].length-1;
    }
    play();
    localStorage.setItem('lastTrackNumber', currentMusic);
    // Получаем сохраненный номер последнего трека из localStorage
    let savedLastTrackNumber = localStorage.getItem('lastTrackNumber');
    // Проверяем, было ли сохранено значение
    if (savedLastTrackNumber) {
      console.log('Номер последнего трека:', savedLastTrackNumber);
    } else {
      console.log('Номер последнего трека не найден');
    }
    play();
}
function play()
{
    if (isPlaying===false)
    {
        player.play();
        playBtn.className="fa fa-pause-circle";
        isPlaying = true;
        playBtn.onclick=pause;
    }
    else
    {
        pause();
    }
}
function pause()
{
    if (isPlaying===true)
    {
        isPlaying = false;
        player.pause();
        playBtn.className="fa fa-play-circle";
        playBtn.onclick=play;
    }
    else
    {
        play();
    }
}
function next()
{
    currentMusic=currentMusic+1;
    const fileName = tracks[currentMusic].file.split('/').reverse()[0];
    const title = fileName.split('.').slice(0, -1).join('.');
    console.log(title);
    trackTitleElement.textContent = title;
    artistNameElement.textContent = tracks[currentMusic].artist;
    imagemusic.src=tracks[currentMusic].cover;
    player.src=tracks[currentMusic].file;
    if (currentMusic>=tracks[currentMusic].length)
    {
        currentMusic=0
    }
    play();
    localStorage.setItem('lastTrackNumber', currentMusic);
    // Получаем сохраненный номер последнего трека из localStorage
    let savedLastTrackNumber = localStorage.getItem('lastTrackNumber');
    // Проверяем, было ли сохранено значение
    if (savedLastTrackNumber) {
      console.log('Номер последнего трека:', savedLastTrackNumber);
    } else {
      console.log('Номер последнего трека не найден');
    }
    play();
    console.log(isPlaying)
}
audio.addEventListener('ended', next)
console.log(isPlaying)