const socket = io();

const audio1 = new Audio('Piano_30_segundos/1_Dó 30 segundos.mp3');
const audio2 = new Audio('Piano_30_segundos/2_Re 30 segundos.mp3');
const audio3 = new Audio('Piano_30_segundos/3_Mi 30 segundos.mp3');
const audio4 = new Audio('Piano_30_segundos/4_Fa 30 segundos.mp3');
const audio5 = new Audio('Piano_30_segundos/5_Sol 30 segundos.mp3');
const audio6 = new Audio('Piano_30_segundos/6_La 30 segundos.mp3');
const audio7 = new Audio('Piano_30_segundos/7_Si 30 segundos.mp3');
const audio8 = new Audio('Piano_30_segundos/8_do 30 segundos.mp3');

const buttons = [
  { button: document.getElementById('audioButton1'), audio: audio1, isPlaying: false, key: 'a' },
  { button: document.getElementById('audioButton2'), audio: audio2, isPlaying: false, key: 's' },
  { button: document.getElementById('audioButton3'), audio: audio3, isPlaying: false, key: 'd' },
  { button: document.getElementById('audioButton4'), audio: audio4, isPlaying: false, key: 'f' },
  { button: document.getElementById('audioButton5'), audio: audio5, isPlaying: false, key: 'g' },
  { button: document.getElementById('audioButton6'), audio: audio6, isPlaying: false, key: 'h' },
  { button: document.getElementById('audioButton7'), audio: audio7, isPlaying: false, key: 'j' },
  { button: document.getElementById('audioButton8'), audio: audio8, isPlaying: false, key: 'k' }
];

buttons.forEach(button => {
  button.button.addEventListener('mousedown', () => {
    playAudio(button);
    socket.emit('playNote', button.key);
  });
  button.button.addEventListener('mouseup', () => stopAudio(button));
  button.button.addEventListener('mouseleave', () => {
    if (button.isPlaying) stopAudio(button);
  });
});

document.addEventListener('keydown', function(event) {
  buttons.forEach(button => {
    if (event.key.toLowerCase() === button.key && !button.isPlaying) {
      playAudio(button);
      socket.emit('playNote', button.key);
    }
  });
});

document.addEventListener('keyup', function(event) {
  buttons.forEach(button => {
    if (event.key.toLowerCase() === button.key && button.isPlaying) {
      stopAudio(button);
    }
  });
});

socket.on('playNote', (key) => {
  const button = buttons.find(b => b.key === key);
  if (button) playAudio(button);
});

function playAudio(button) {
  if (!button.isPlaying) {
    console.log(`Playing: ${button.key}`);
    buttons.forEach(otherButton => {
      if (otherButton.isPlaying) stopAudio(otherButton);
    });
    button.isPlaying = true;
    button.audio.currentTime = 0;
    button.audio.play();
  }
}

function stopAudio(button) {
  if (button.isPlaying) {
    console.log(`Stopping: ${button.key}`);
    button.isPlaying = false;
    button.audio.pause();
  }
}
