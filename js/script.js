window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  let game;
  let gameStarted = false;

  /* startButton.addEventListener("click", function () {
    startGame();
  }); */
  /* document.addEventListener("keydown", function () {
    startGame();
  }); */

  document.addEventListener("keydown", function () {
    if (!gameStarted) {
      startGame();
      gameStarted = true;
      document.removeEventListener("keydown", startGameOnKeyPress);
    }
  });
  restartButton.addEventListener("click", function () {
    //js in the current tab is going to refresh the page
    location.reload();
  });

  function startGameOnKeyPress(event) {
    if (!gameStarted) {
      startGame();
      gameStarted = true;
      document.removeEventListener("keydown", startGameOnKeyPress);
    }
  }

  function startGame() {
    //   console.log("start game");
    game = new Game();
    game.start();
  }

  function handleKeydown(event) {
    const key = event.key;
    const possibleKeys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];
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
  }

  function handleKeyup(event) {
    const key = event.key;
    const possibleKeys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];
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
