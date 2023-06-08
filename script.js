let mouseX = 0;
let mouseY = 0;

addEventListener("mousemove", function (event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

let gravity = 0.99;

function getRandomColor() {
  return (
    "rgba(" +
    Math.round(Math.random() * 330) +
    ", " +
    Math.round(Math.random() * 330) +
    ", " +
    Math.round(Math.random() * 330) +
    ", " +
    Math.ceil(Math.random() * 17) / 19 +
    ")"
  );
}
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

function BeginnerBall() {
  this.color = getRandomColor();
  this.radius = Math.random() * 25 + 20;
  this.startRadius = this.radius;
  this.x = Math.random() * (width - this.radius * 2) + this.radius;
  this.y = Math.random() * (height - this.radius);
  this.dy = Math.random() * 2;
  this.dx = Math.round((Math.random() - 0.5) * 10);
  this.vel = Math.random() / 5;
}

BeginnerBall.prototype.updateBeginnerBall = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  ctx.fillStyle = this.color;
  ctx.fill();
};

let beginnerBalls = [];
for (let i = 0; i < 50; i++) {
  beginnerBalls.push(new BeginnerBall());
}

function animateBeginnerCanvas() {
  if (width !== window.innerWidth || height !== window.innerHeight) {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  requestAnimationFrame(animateBeginnerCanvas);
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < beginnerBalls.length; i++) {
    beginnerBalls[i].updateBeginnerBall();
    beginnerBalls[i].y += beginnerBalls[i].dy;
    beginnerBalls[i].x += beginnerBalls[i].dx;
    if (beginnerBalls[i].y + beginnerBalls[i].radius >= height) {
      beginnerBalls[i].dy = -beginnerBalls[i].dy * gravity;
    } else {
      beginnerBalls[i].dy += beginnerBalls[i].vel;
    }
    if (
      beginnerBalls[i].x + beginnerBalls[i].radius > width ||
      beginnerBalls[i].x - beginnerBalls[i].radius < 0
    ) {
      beginnerBalls[i].dx = -beginnerBalls[i].dx;
    }
    if (
      mouseX > beginnerBalls[i].x - 20 &&
      mouseX < beginnerBalls[i].x + 20 &&
      mouseY > beginnerBalls[i].y - 50 &&
      mouseY < beginnerBalls[i].y + 50 &&
      beginnerBalls[i].radius < 70
    ) {
      beginnerBalls[i].radius += 5;
    } else {
      if (beginnerBalls[i].radius > beginnerBalls[i].startRadius) {
        beginnerBalls[i].radius -= 5;
      }
    }
  }
}

animateBeginnerCanvas();

setInterval(function () {
  beginnerBalls.push(new BeginnerBall());
  beginnerBalls.splice(0, 1);
}, 600);
