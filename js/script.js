window.onload = function () {

  let game;
  let gameStarted = false;

  document.addEventListener("keydown", startGameOnKeyPress);

  function startGameOnKeyPress(event) {
    if (!gameStarted) {
      startGame();
      gameStarted = true;
      document.removeEventListener("keydown", startGameOnKeyPress);
    }
  }

  function startGame() {
    game = new Game();
    game.start();
  }

  function handleKeydown(event) {
    const key = event.key;
    const possibleKeys = ["ArrowLeft", "ArrowUp", "ArrowRight"];
    if (possibleKeys.includes(key)) {
      event.preventDefault();

      if (game) {
        switch (key) {
          case "ArrowLeft":
            game.player.directionX = -10;
            game.player.directionY = -5;
            break;
          case "ArrowUp":
            game.player.directionY = -13;
            break;
          case "ArrowRight":
            game.player.directionX = 10;
            game.player.directionY = -5;
            break;
        }
      }
    }
    if (game && game.gameIsOver) {
      location.reload();
    }
  }

  function handleKeyup(event) {
    const key = event.key;
    const possibleKeys = ["ArrowLeft", "ArrowUp", "ArrowRight"];
    if (possibleKeys.includes(key)) {
      event.preventDefault();

      if (game) {
        switch (key) {
          case "ArrowLeft":
            game.player.directionX = 0;
            break;
          case "ArrowUp":
            game.player.directionY = game.player.gravity;
            break;
          case "ArrowRight":
            game.player.directionX = 0;
            break;
        }
      }
    }
  }

  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);
};
