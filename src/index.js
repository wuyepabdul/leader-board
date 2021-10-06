import './style.css';
import { postData, fetchData, postScoreData } from './scripts.js/apiCalls.js';

const gameIdFromStorage = () => {
  const gameId = localStorage.getItem('gameId')
    ? JSON.parse(localStorage.getItem('gameId'))
    : null;
  return gameId;
};

const dismisAlert = () => {
  const alertMessage = document.querySelector('.alert');
  setTimeout(() => {
    alertMessage.classList.remove('success', 'error', 'info');
    alertMessage.classList.add('invisible');
    window.location.reload();
  }, 2000);
};

const createGame = () => {
  const data = { name: '' };
  const newGame = document.querySelector('#game');
  const createBtn = document.querySelector('#new-game-btn');
  newGame.addEventListener('change', (e) => {
    data.name = e.target.value;
  });

  createBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const alertDiv = document.querySelector('.alert');

    const response = await postData(data, `${process.env.BASE_URL}/games`);
    if (response) {
      localStorage.setItem(
        'gameId',
        JSON.stringify(response.result.slice(14, 34))
      );
      alertDiv.innerHTML = `Game created with ID ${response.result.slice(
        14,
        34
      )}`;
      alertDiv.classList.remove('invisible', 'info');
      alertDiv.classList.add('success', 'visible');
      dismisAlert();
     
    }
  });
};

const displayScores = async () => {
  const gameId = gameIdFromStorage();
  const scoresUlTag = document.querySelector('.scoreboard-container');
  const liTag = document.createElement('li');
  const smallTag1 = document.createElement('small');
  const smallTag2 = document.createElement('small');
  const alertDiv = document.querySelector('.alert');

  if (gameId) {
    const { result } = await fetchData(
      `${process.env.BASE_URL}/games/${gameId}/scores`
    );
    if (result.length > 0) {
      result.forEach((score) => {
        smallTag1.textContent = `${score.user} :`;
        smallTag2.textContent = ` ${score.score}`;
        liTag.appendChild(smallTag1);
        liTag.appendChild(smallTag2);
        scoresUlTag.appendChild(liTag.cloneNode(true));
      });
    }
  } else {
    alertDiv.innerHTML = 'No game has been created';
    alertDiv.classList.remove('invisible');
    alertDiv.classList.add('info', 'visible');
  }
};

const createScore = () => {
  const data = { user: '', score: '' };
  const userNameInput = document.querySelector('#username');
  const userScoreInput = document.querySelector('#userscore');
  const createScoreBtn = document.querySelector('#add-score-btn');
  const alertDiv = document.querySelector('.alert');

  userNameInput.addEventListener('change', (e) => {
    data.user = e.target.value;
  });
  userScoreInput.addEventListener('change', (e) => {
    data.score = e.target.value;
  });

  createScoreBtn.addEventListener('click', async (e) => {
    const gameId = gameIdFromStorage();
    e.preventDefault();
    const response = await postScoreData(
      data,
      `${process.env.BASE_URL}/games/${gameId}/scores`
    );
    if (response) {
      alertDiv.innerHTML = 'User score added successfully';
      alertDiv.classList.remove('invisible');
      alertDiv.classList.add('success', 'visible');
      dismisAlert();
    }
  });
};

displayScores();
createGame();
createScore();
