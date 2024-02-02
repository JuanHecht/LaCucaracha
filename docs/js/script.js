
window.onload = function () {
  let game;
  let gameStarted = false;

  document.addEventListener("keydown", startGameOnKeyPress);
  document.addEventListener("touchstart", startGameOnKeyPress);

  function startGameOnKeyPress(event) {
    if (!gameStarted) {
      startGame();
      gameStarted = true;
      document.removeEventListener("keydown", startGameOnKeyPress);
      document.removeEventListener("touchstart", startGameOnKeyPress);
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
            game.player.directionX = -7;
            game.player.directionY = -4;
            break;
          case "ArrowUp":
            game.player.directionY = -10;
            break;
          case "ArrowRight":
            game.player.directionX = 7;
            game.player.directionY = -4;
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
            /* game.player.directionX = 0; */
            setTimeout(() => {
              game.player.directionX = 0;
            }, 200);
            break;
          case "ArrowUp":
            /* game.player.directionY = game.player.gravity; */
            break;
          case "ArrowRight":
            /* game.player.directionX = 0; */
            setTimeout(() => {
              game.player.directionX = 0;
            }, 200);
            break;
        }
      }
    }
  }

  function handleTouchStart(event) {
    if (gameStarted) {
      const touchX = event.touches[0].clientX;
      const screenWidth = window.innerWidth;

      if (touchX < screenWidth / 3) {
        // Left third of the screen
        game.player.directionX = -6.5;
        game.player.directionY = -4;
      } else if (touchX < (2 * screenWidth) / 3) {
        // Middle third of the screen
        game.player.directionY = -10;
      } else {
        // Right third of the screen
        game.player.directionX = 6.5;
        game.player.directionY = -4;
      }
    }
    if (game && game.gameIsOver) {
      location.reload();
    }
  }

  function handleTouchEnd() {
    if (game) {
      setTimeout(() => {
        game.player.directionX = 0;
      }, 200);
      /* game.player.directionY = game.player.gravity; */
    }
  }


  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);
  window.addEventListener("touchstart", handleTouchStart);
  window.addEventListener("touchend", handleTouchEnd);
};