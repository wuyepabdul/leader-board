import './style.css';
import { postData, fetchData, postScoreData } from './scripts.js/apiCalls.js';

const gameIdFromStorage = () => {
  const gameId = localStorage.getItem('gameId')
    ? JSON.parse(localStorage.getItem('gameId'))
    : null;
  return gameId;
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
    console.log(response);
    localStorage.setItem(
      'gameId',
      JSON.stringify(response.result.slice(14, 34))
    );
  });
};

const displayScores = async () => {
  const gameId = gameIdFromStorage();
  if (gameId) {
    const response = await fetchData(
      `${process.env.BASE_URL}/games/${gameId}/scores`
    );
    console.log('response', response);
  } else {
    console.log('No game created');
  }
};

const createScore = () => {
  const data = { user: '', score: '' };
  const userNameInput = document.querySelector('#username');
  const userScoreInput = document.querySelector('#userscore');
  const createScoreBtn = document.querySelector('#add-score-btn');

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
    console.log('data', response);
  });
};

displayScores();
createGame();
createScore();
