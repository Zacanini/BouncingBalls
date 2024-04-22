// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}


class Shape{
 constructor (x,y,velX,velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = true;
  }
}

class EvilCircle extends Shape{
  constructor (x,y){
    super(x,y,20,20);
    this.color = 'white';
    this.size = 10;
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x,this.y,this.size,0, 2 * Math.PI);
    ctx.stroke();
  }

  checkBounds() {

    if ( (this.x + this.size) >= width ){
      this.x -= this.size;
    }
  
    if ( (this.x + this.size) <= 0 ){
      this.x += this.size;
    }
  
    if ( (this.y + this.size) >= height){
      this.y -= this.size;
    }
  
    if ( (this.y + this.size) <= 0){
      this.y += this.size;
    }
  
  }

  setControls() {
    var _this = this;
  
    window.onkeydown = function(e){
  
      if (e.key === 'a'){
        _this.x -= _this.velX;
      } else if (e.key === 'd'){
        _this.x += _this.velX;
      } else if (e.key === 'w'){
        _this.y -= _this.velY;
      } else if (e.key === 's'){
        _this.y += _this.velY;
      }
     
    };
  }

  collisionDetect() {
  
    balls.forEach( vizinha => {
      if (vizinha.exists){
        const dx = this.x - vizinha.x;
        const dy = this.y - vizinha.y;
        const distance = Math.sqrt(dx*dx+dy*dy);
  
        if (distance < (this.size + vizinha.size)){
          vizinha.exists = false;
          count--;
          para.textContent = `Ball count: ${count}`;
          this.size += 4;
        }
        if(count === 0){
          para.textContent = `Game Over`;
        }
      }
    });
  }
}








class Ball extends Shape{
  constructor(x,y,velX,velY,color,size){
    super(x,y,velX,velY);
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x,this.y,this.size,0, 2 * Math.PI);
    ctx.fill();
  }
  
  update() {

    if ( (this.x + this.size) >= width ){
      this.velX = -(this.velX);
    }
  
    if ( (this.x + this.size) <= 0 ){
      this.velX = -(this.velX);
    }
  
    if ( (this.y + this.size) >= height){
      this.velY = -(this.velY);
    }
  
    if ( (this.y + this.size) <= 0){
      this.velY = -(this.velY);
    }
  
  
    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
  
    balls.forEach( vizinha => {
      if ((vizinha.exists) && !(this === vizinha)){
        const dx = this.x - vizinha.x;
        const dy = this.y - vizinha.y;
        const distance = Math.sqrt(dx*dx+dy*dy);
  
        if (distance < (this.size + vizinha.size)){
          vizinha.color = randomRGB();
          this.velX *= -1;
          this.velY *= -1;
          vizinha.velX *= -1;
          vizinha.velY *= -1;
        }
      }
    });
  }
  
}
 


let balls = [];
let count = 25;
let para = document.querySelector('h1');

while (balls.length < count) {

  const size = random(10,20);
  const color = randomRGB();
  let ball = new Ball(
    random(0+size,width-size),
    random(0+size,height-size),
    random(-7,7),
    random(-7,7),
    color,
    size
  );

  balls.push(ball);
  
}

let evil = new EvilCircle(random(0,width-10),random(0,height-10));
evil.setControls();


function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);

  balls.forEach(ball =>{
    if (ball.exists){
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  });

  evil.draw();
  evil.checkBounds();
  evil.collisionDetect();

  requestAnimationFrame(loop);
}


loop();

