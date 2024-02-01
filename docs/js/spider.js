class Spider {
  constructor(gameScreen, width, height) {
    this.gameScreen = gameScreen;

    this.left = Math.floor(
      Math.random() * this.gameScreen.offsetWidth * 0.7 +
        this.gameScreen.offsetWidth * 0.15
    );
    this.top = Math.floor(
      Math.random() * this.gameScreen.offsetHeight * 0.3 +
        this.gameScreen.offsetHeight * 0.05
    );

    // size of the spider
    this.width = width;
    this.height = height;

    // create the HTML elements and default styling
    this.element = document.createElement("img");
    this.element.src = "docs/images/spider.png";
    this.element.style.position = "absolute";
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;
    // creating the id for that element do we can access it in the CSS
    this.element.setAttribute("id", "spider");

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
