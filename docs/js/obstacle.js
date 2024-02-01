class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;

    this.top = 0;

    // Set initial dimensions
    if (window.innerWidth < 550) {
      this.width = 120; // Adjust the width for smaller screens
    } else {
      this.width = 200;
    }

    if (window.innerWidth < 550) {
      this.height = 90; // Adjust the width for smaller screens
    } else {
      this.height = 140;
    }

    // Random position on the sides
    this.positions = [0, this.gameScreen.offsetWidth - this.width];
    this.left = this.positions[Math.round(Math.random())];
    if (this.left === 0) {
      this.imgSrc = "docs/images/redCar2.png";
    } else {
      this.imgSrc = "docs/images/redCar.png";
    }

    // Create HTML element and set default styling
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
    // Move obstacle down
    this.top += 4;
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

  }
}


/* class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;

    this.top = 0;
    this.width = 200;
    this.height = 140;

    // Random position on the sides
    this.positions = [0, this.gameScreen.offsetWidth - this.width];
    this.left = this.positions[Math.round(Math.random())];
    if (this.left === 0) {
      this.imgSrc = "docs/images/redCar2.png";
    } else {
      this.imgSrc = "docs/images/redCar.png";
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
} */