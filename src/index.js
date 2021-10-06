import './style.css';
import { postData, fetchData } from './scripts.js/apiCalls.js';

const createGame = () => {
  let inputValue;
  const newGame = document.querySelector('#game');
  const createBtn = document.querySelector('#new-game-btn');
  newGame.addEventListener('change', (e) => {
    inputValue = e.target.value;
  });

  createBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const alertDiv = document.querySelector('.alert');

    const response = postData(inputValue, `${process.env.BASE_URL}/games`);
    localStorage.setItem(
      'gameId',
      JSON.stringify(response.result.slice(14, 34))
    );
  });
};

const displayScores = async () => {
  const gameId = localStorage.getItem('gameId')
    ? JSON.parse(localStorage.getItem('gameId'))
    : null;

  if (gameId) {
    const response = await fetchData(
      `${process.env.BASE_URL}/games/${gameId}/scores`
    );
    console.log('response', response);
  } else {
    console.log('No game created');
  }
};

const createScore = async () => {
  const userNameInput = document.querySelector('#username');
  const userScoreInput = document.querySelector('#userscore');
  console.log(userNameInput, userScoreInput);
};

displayScores();
createGame();
createScore();
