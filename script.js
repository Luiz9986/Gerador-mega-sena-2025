function generateMegaSenaNumbers() {
  const numbers = new Set();

  while (numbers.size < 6) {
    const num = Math.floor(Math.random() * 60) + 1;
    numbers.add(num);
  }

  return Array.from(numbers).sort((a, b) => a - b);
}

const numGamesInput = document.getElementById('numGames');
const generateBtn = document.getElementById('generateBtn');
const gamesContainer = document.getElementById('gamesContainer');

function createGameElement(numbers, index) {
  const gameDiv = document.createElement('div');
  gameDiv.classList.add('game');

  const numbersDiv = document.createElement('div');
  numbersDiv.classList.add('numbers');

  numbers.forEach(num => {
    const numDiv = document.createElement('div');
    numDiv.classList.add('number');
    numDiv.textContent = num.toString().padStart(2, '0');
    numbersDiv.appendChild(numDiv);
  });

  const copyBtn = document.createElement('button');
  copyBtn.classList.add('copyBtn');
  copyBtn.textContent = 'Copiar Jogo';

  const copiedMsg = document.createElement('span');
  copiedMsg.classList.add('copiedMsg');
  copiedMsg.textContent = 'Copiado!';
  copiedMsg.style.display = 'none';

  copyBtn.addEventListener('click', () => {
    const textToCopy = numbers.map(n => n.toString().padStart(2, '0')).join(' ');
    navigator.clipboard.writeText(textToCopy).then(() => {
      copiedMsg.style.display = 'inline';
      setTimeout(() => {
        copiedMsg.style.display = 'none';
      }, 1500);
    });
  });

  gameDiv.appendChild(numbersDiv);
  gameDiv.appendChild(copyBtn);
  gameDiv.appendChild(copiedMsg);

  return gameDiv;
}

function generateGames() {
  gamesContainer.innerHTML = '';
  let count = parseInt(numGamesInput.value, 10);

  if (isNaN(count) || count < 1) count = 1;
  if (count > 10) count = 10;

  numGamesInput.value = count;

  for (let i = 0; i < count; i++) {
    const numbers = generateMegaSenaNumbers();
    const gameElement = createGameElement(numbers, i + 1);
    gamesContainer.appendChild(gameElement);
  }
}

generateBtn.addEventListener('click', generateGames);

// Gerar 1 jogo na primeira carga
generateGames();
