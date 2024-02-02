class Player {
  constructor(gameScreen, left, top, imgSrc) {
    // gameScreen HTML element
    this.gameScreen = gameScreen;

    //position values
    this.left = left;
    this.top = top;

    if (window.innerWidth < 550) {
      this.width = 40; // Adjust the width for smaller screens
    } else {
      this.width = 50;
    }

    if (window.innerWidth < 550) {
      this.height = 60; // Adjust the width for smaller screens
    } else {
      this.height = 70;
    }


    this.element = document.createElement("img");
    this.element.src = imgSrc;
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.directionX = 0;
    this.directionY = 0;

    /* this.gravity = 0.4; */

    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.directionY += this.gravity;

    this.left += this.directionX;
    this.top += this.directionY;

    //handle the right side of the screen: car stoping
    if (this.left + this.width > this.gameScreen.offsetWidth) {
      this.left = this.gameScreen.offsetWidth - this.width;
    }

    //handle the left side of the screen: car stoping
    else if (this.left <= 0) {
      this.left = 0;
    }

    //handle the bottom side of the screen: car stoping
    if (this.top + this.height > this.gameScreen.offsetHeight) {
      // return gameIsOver;
    }

    //handle the top side of the screen: car stoping
    else if (this.top <= 0) {
      this.top = 0;
    }

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
