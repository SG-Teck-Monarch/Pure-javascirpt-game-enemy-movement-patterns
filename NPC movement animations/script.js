/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas_main");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 1000);
const numOfEnemies = 30;
const enemiesArray = [];
let gameFrame = 0;

class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "/img/enemy4.png";
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 213;
    this.spriteHeight = 213;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (CANVAS_WIDTH / 2 - this.width / 2);
    this.y = Math.random() * (CANVAS_HEIGHT - this.height);
    this.newX = Math.random() * CANVAS_WIDTH;
    this.newY = Math.random() * CANVAS_HEIGHT;
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.interval = Math.floor(Math.random() * 200 + 50);
  }

  update() {
    // this.x += 0;
    // this.y += 0;
    if (gameFrame % this.interval == 0) {
      this.newX = Math.random() * CANVAS_WIDTH;
      this.newY = Math.random() * CANVAS_HEIGHT;
    }

    let dx = this.x - this.newX;
    let dy = this.y - this.newY;

    this.x -= dx / 70;
    this.y -= dy / 70;

    if (this.x + this.width < 0) {
      this.x = CANVAS_WIDTH;
    }

    if (gameFrame % this.flapSpeed === 0) {
      this.frame = this.frame > 4 ? (this.frame = 0) : this.frame + 1;
    }
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

for (let i = 0; i < numOfEnemies; i++) {
  enemiesArray.push(new Enemy());
}

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  enemiesArray.forEach((enemy) => {
    enemy.draw();
    enemy.update();
  });
  gameFrame++;

  requestAnimationFrame(animate);
}

animate();
