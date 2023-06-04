'use strict';
(() => {
  const marbles = {
    player: 5,
    computer: 5,
    quit: false,
    checkPoints() {
      switch (true) {
        case this.player <= 0:
          alert('Поражение! Игра окончена.');
          return false;
        case this.computer <= 0:
          alert('Победа! Игра окончена.');
          return false;
        default:
          return true;
      }
    },
    resetPoints() {
      this.player = 5;
      this.computer = 5;
    },
    playerWins(bet) {
      this.player += bet;
      this.computer -= bet;
      if (this.player > 10) this.player = 10;
      alert(`Раунд выигран! Ваш счет: ${this.player < 0 ? 0 : this.player}.`);
    },
    computerWins(bet) {
      this.computer += bet;
      this.player -= bet;
      alert(`Раунд проигран! Ваш счет: ${this.player < 0 ? 0 : this.player}.`);
    },
  };

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const figures = ['камень', 'ножницы', 'бумага'];

  const game = () => {
    const whoWins = (bet, guess) => {
      if ((guess === 0 && bet % 2 === 0) ||
      (guess === 1 && bet % 2 !== 0)) return;
      return true;
    };

    const playerTurn = () => {
      let playerBet;
      do {
        playerBet = prompt('Сколько шариков ставите?\nДоступно: ' +
      marbles.player + '.');

        if (playerBet === null) {
          if (confirm('Закончить игру?')) {
            marbles.quit = true;
            return;
          }
        }
      } while (+playerBet < 1 || +playerBet > marbles.player ||
        isNaN(playerBet));

      whoWins(+playerBet, Math.round(Math.random())) ?
      marbles.playerWins(+playerBet) : marbles.computerWins(+playerBet);

      return marbles.checkPoints();
    };

    const compTurn = () => {
      const compBet = getRandomIntInclusive(1, marbles.computer);
      const userGuess = confirm('Ставка оппонента четная?') ? 0 : 1;

      whoWins(compBet, userGuess) ?
      marbles.computerWins(compBet) : marbles.playerWins(compBet);

      return marbles.checkPoints();
    };

    const playMarbles = (goesFirst, goesSecond) => {
      while (goesFirst()) {
        if (!goesSecond()) break;
      }
    };

    const rps = () => {
      const userFig = prompt('Выиграй, чтобы ходить первым!\n' +
                                 'Камень? Ножницы? Бумага?');

      if (userFig === null) {
        if (confirm('Закончить игру?')) return;
        rps();
      }

      const userIndex = figures.findIndex(value =>
        userFig.trim().toLowerCase() === value);

      const compIndex = getRandomIntInclusive(0, 2);

      const playAgain = () => {
        if (marbles.quit) return;
        if (confirm('Сыграть еще раз?')) {
          marbles.resetPoints();
          rps();
        }
      };

      switch (true) {
        case userIndex === -1:
          rps();
          break;
        case (userIndex + 1) % 3 === compIndex:
          alert('Победа! Вы ходите первым.');
          playMarbles(playerTurn, compTurn);
          playAgain();
          break;
        case userIndex !== compIndex:
          alert('Проигрыш! Оппонент ходит первым.');
          playMarbles(compTurn, playerTurn);
          playAgain();
          break;
        default:
          alert('Ничья! Повторный раунд.');
          rps();
      }
    };

    alert('Игра "Марблы"!');

    return function start() {
      rps();
    };
  };

  window.rpsAndMarbles = game;
})();
