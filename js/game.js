class Game {
  constructor() {
    //Get all Game Screens
    //Game screen and end screen are initially not displayed.
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    //Gonna create a player in the future, for now gonna keep it null
    this.player = new Player(
      this.gameScreen,
      200,
      500,
      70,
      90,
      "./images/car.png"
    );
    //Style for the game board
    this.height = 700;
    this.width = 500;
    //Obstacles
    this.obstacles = [];
    this.chanclas = [];
    this.spiders = [];
    //Score
    this.score = 0;
    //Lives
    this.lives = 56;
    //Variable to check if im in the process of creating obstacles
    this.isPushingObstacle = false;
    this.isPushingChancla = false;
    this.isPushingSpider = false;
    //Variable to check if the game is over
    this.gameIsOver = false;
    this.soundtrack = null;
  }
  start() {
    //Sets the height and width of the game screen.
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.soundtrack = document.getElementById("soundtrack");
    this.soundtrack.play();
    // Create chanclas
    // In case it doesnt work uncomment
    /*     setInterval(() => {
      this.chanclas.push(new Chancla(this.gameScreen));
      this.isPushingChancla = false;
    }, 3000);
    // Create spiders
    setInterval(() => {
      this.spiders.push(new Spider(this.gameScreen));
      this.isPushingSpider = false;
    }, 6500); */
    //Hides the start screen.
    this.startScreen.style.display = "none";
    //Shows the game screen.
    this.gameScreen.style.display = "block";
    /*  this.soundtrack.getElementById("soundtrack");
    this.soundtrack.play();
 */
    //Starts the game loop.
    this.gameLoop();
  }
  gameLoop() {
    if (this.gameIsOver) {
      return;
    }
    this.update();
    this.updateSpider();
    this.updateChancla();
    window.requestAnimationFrame(() => this.gameLoop());
  }
  update() {
    /* score, lives scoreboard */
    let score = document.getElementById("score");
    let lives = document.getElementById("lives");
    /*every frame of the game; i want to check if the car is moving  */
    this.player.move();
    //Iterate over the obstacles array and make them move
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();
      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        this.lives--;
      } else if (obstacle.top > this.height) {
        this.score++;
        ///remove the obstacle HTML from the HTML
        obstacle.element.remove();
        //remove the obstacle from the game class'obstacles array
        this.obstacles.splice(obstacle, 1);
      }
    }
    if (this.lives === 0) {
      this.endGame();
    } else if (
      this.player.top + this.player.height >
      this.gameScreen.offsetHeight
    ) {
      this.endGame();
    }
    //if there are no obstacles
    else if (this.obstacles.length === 0 && !this.isPushingObstacle) {
      this.isPushingObstacle = true;
      setTimeout(() => {
        this.obstacles.push(new Obstacle(this.gameScreen));
        this.isPushingObstacle = false;
      }, 1500);
      setInterval(() => {
        this.chanclas.push(new Chancla(this.gameScreen));
        this.isPushingChancla = false;
      }, 5000);
      // Create spiders
      setInterval(() => {
        this.spiders.push(new Spider(this.gameScreen));
        this.isPushingSpider = false;
      }, 7000);
    }
    score.innerHTML = this.score;
    lives.innerHTML = this.lives;
  }
  updateChancla() {
    let score = document.getElementById("score");
    let lives = document.getElementById("lives");

    // Iterate over the echanclas array and make them move
    for (let i = 0; i < this.chanclas.length; i++) {
      const chancla = this.chanclas[i];
      chancla.move();
      if (this.player.didCollide(chancla)) {
        chancla.element.remove();
        this.lives--;
        // remove obstacle from the array
        this.chanclas.splice(i, 1);
      }
    }
    score.innerHTML = this.score;
    lives.innerHTML = this.lives;
  }
  updateSpider() {
    let score = document.getElementById("score");
    let lives = document.getElementById("lives");
    // Create spiders
    for (let i = 0; i < this.spiders.length; i++) {
      const spider = this.spiders[i];
      spider.move();
      if (this.player.didCollide(spider)) {
        spider.element.remove();
        this.lives--;
        // remove obstacle from the array
        this.spiders.splice(i, 1);
      }
    }
    score.innerHTML = this.score;
    lives.innerHTML = this.lives;
  }
  endGame() {
    //CHange the game is over status. if true going to break animation loop
    this.gameIsOver = true;
    //remove player from html
    this.player.element.remove();
    //remove all obstacles
    this.obstacles.forEach((obstacle, index) => {
      //remove obstacles from JS
      this.obstacles.splice(index, 1);
      //remove obstacles from HTML
      obstacle.element.remove();
    });
    //Hide the current game screen
    this.gameScreen.style.display = "none";
    // in order, to display the game end screen
    this.gameEndScreen.style.display = "block";
    const highestScore = localStorage.getItem("highestScore");
    if (this.score > highestScore && this.score > highestScore) {
      localStorage.setItem("highestscore", this.score);
    }
  }
}
