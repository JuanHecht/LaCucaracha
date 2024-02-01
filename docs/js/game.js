/* 2 functions to show are createObstacle and startgameonkeypress (script) */
class Game {
  constructor() {
    //Get all Game Screens
    //Game screen and end screen are initially not displayed.
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameContainer = document.getElementById("game-container");
    this.stats = document.getElementById("stats");
    this.gameEndScreen = document.getElementById("game-end");

    //Gonna create a player in the future, for now gonna keep it null
    this.player = new Player(
      this.gameScreen,
      200,
      500,
      "docs/images/car.png"
    );

    //Style for the game board
    this.height = window.innerHeight;
    if (window.innerWidth < 550) {
      // If so, set this.width to window.innerWidth
      this.width = window.innerWidth;
    } else {
      this.width = 550
    }

    //Obstacles
    this.obstacles = [];
    this.chanclas = [];
    this.spiders = [];

    //Score
    this.score = 0;
    //Lives
    this.lives = 3;
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

    //Hides the start screen.
    this.startScreen.style.display = "none";
    //Shows the game screen.
    this.stats.style.display = "block";
    this.gameScreen.style.display = "block";
    this.gameContainer.style.display = "flex";


    this.createObstacle();
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
  


  // WORKING METHOD TO CREATE ENEMIES IN ORDER
  createObstacle() {
    if (!this.isPushingObstacle) {
      this.isPushingObstacle = true;

      setTimeout(() => {
        if (this.score <= 3) {
          this.obstacles.push(new Obstacle(this.gameScreen));
        } else if (this.score > 3) {
          // Create two obstacles at the same time
          this.obstacles.push(new Obstacle(this.gameScreen));
          this.obstacles.push(new Obstacle(this.gameScreen));
        }

        this.isPushingObstacle = false;

        // Create chancla after creating obstacle
        this.createChancla();
      }, 1000);
    }
  }
  

  // New method to create chanclas
  createChancla() {
    if (!this.isPushingChancla) {
      this.isPushingChancla = true;

      setTimeout(() => {
        this.chanclas.push(new Chancla(this.gameScreen));
        this.isPushingChancla = false;

        // Create spider after creating chancla
        this.createSpider();
      }, 2500);
    }
  }

  // New method to create spiders
  createSpider() {
    if (!this.isPushingSpider) {
      this.isPushingSpider = true;

      setTimeout(() => {
        if (this.score <= 3){
          this.spiders.push(new Spider(this.gameScreen, 130, 130));
        } else if (this.score > 3  && this.score <= 4) {
          this.spiders.push(new Spider(this.gameScreen, 180, 180));
        } else if (this.score > 4 && this.score <= 6){
          this.spiders.push(new Spider(this.gameScreen, 120, 120));
          this.spiders.push(new Spider(this.gameScreen, 80, 80));
        } else if (this.score > 6 && this.score <= 22){
          this.spiders.push(new Spider(this.gameScreen, 140, 140));
          this.spiders.push(new Spider(this.gameScreen, 100, 100));
        } else {
          this.spiders.push(new Spider(this.gameScreen, 160, 140));
          this.spiders.push(new Spider(this.gameScreen, 140, 160));
        }
        
        this.isPushingSpider = false;

        // After creating spider, restart the sequence by creating obstacles again
        this.createObstacle();
      }, 3500);
    }
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
    } 

    // If the player hits the bottom the game ends
    else if (
      this.player.top + this.player.height >
      this.gameScreen.offsetHeight
    ) {
      this.endGame();
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
      if (this.score <= 3){
        chancla.move(2);
      }else if (this.score  >=6 && this.score <=15 ){
        chancla.move(4);
      } else if  (this.score > 15 && this.score <= 26) {
        chancla.move(6);
      } else {
        chancla.move(10)
      }
      /* chancla.move(6); */
      if (this.player.didCollide(chancla)) {
        chancla.element.remove();
        this.lives--;
        // remove obstacle from the array
        this.chanclas.splice(i, 1);
      } else if (chancla.top > this.height) {
        this.score++;
        chancla.element.remove();
        //remove the obstacle from the game class'obstacles array
        this.chanclas.splice(chancla, 1);
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
        // Remove obstacle from the array using its index
        this.spiders.splice(i, 1);
        // Decrease the loop variable to account for the removed spider
        i--;
      } else if (spider.top > this.height) {
        this.score++;
        spider.element.remove();
        // Remove obstacle from the array using its index
        this.spiders.splice(i, 1);
        // Decrease the loop variable to account for the removed spider
        i--;
      }
    }
  
    score.innerHTML = this.score;
    lives.innerHTML = this.lives;
  }
  

  endGame() {
    //CHange the game is over status. if true going to break animation loop
    this.gameIsOver = true;

    // pause the music when the game ends
    this.soundtrack.pause();

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
    this.gameContainer.style.display = "none";
    // in order, to display the game end screen
    this.gameEndScreen.style.display = "block";

    // Get the highest score
    const highestScore = localStorage.getItem("highestscore");
    if (this.score > highestScore && this.score > highestScore) {
      localStorage.setItem("highestscore", this.score);
    }
    // Print highestScore to the end-screen
    const highestScoreElement = document.getElementById("highest-score");
    highestScoreElement.textContent = highestScore;
  }
}
