class Chancla {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;

    if (window.innerWidth < 550) {
      this.width = 90; // Adjust the width for smaller screens
    } else {
      this.width = 120;
    }

    if (window.innerWidth < 550) {
      this.height = 90; // Adjust the width for smaller screens
    } else {
      this.height = 120;
    }

    this.positions = [0, this.gameScreen.offsetWidth - this.width];
    this.left = this.positions[Math.round(Math.random())];
    this.top = 0;

    if (this.left === 0) {
      this.imgSrc = "docs/images/chancla.png";
    } else {
      this.imgSrc = "docs/images/chancla2.png";
    }

    // create the HTML element and default styling
    this.element = document.createElement("img");
    this.element.src = this.imgSrc;
    this.element.style.position = "absolute";
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;

    this.element.setAttribute("id", "chancla");

    this.gameScreen.appendChild(this.element);

    // initialize the movement variable
    // this.movement = -15;
    if (this.left != 0){
      this.movement = -10;
    } else {
      this.movement = 10;
    }
  }

  /*  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  } */

  move(speed) {
    // Define if it's a positive (goes to the right) or a negative (goes to the left) movement
    if (this.left <= 0) {
      this.movement = speed;
    } else if (this.left + this.width > this.gameScreen.offsetWidth) {
      this.movement = -speed;
    }

    // Movement itself
    this.left += this.movement;
    this.top += 4.5;

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
}
