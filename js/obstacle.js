class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;

    this.top = 0;
    this.width = 180;
    this.height = 130;

    // Random position on the sides
    this.positions = [0, this.gameScreen.offsetWidth - this.width];
    this.left = this.positions[Math.round(Math.random())];
    if (this.left === 0) {
      this.imgSrc = "./images/redCar2.png";
    } else {
      this.imgSrc = "./images/redCar.png";
    }

    //create HTML element and create default styling
    this.element = document.createElement("img");

    this.element.src = this.imgSrc;
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.gameScreen.appendChild(this.element);
  }

  move() {
    // move obstacle down
    this.top += 4;
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
}