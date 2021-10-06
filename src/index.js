import './style.css';

const createGame = () => {
  let value;
  const newGame = document.querySelector('#game');
  const createBtn = document.querySelector('#new-game-btn');
  newGame.addEventListener('change', (e) => {
    value = e.target.value;
  });

  createBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('clicked');
    console.log('value', value);
  });
};

createGame();
