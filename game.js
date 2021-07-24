// console.log("vyshu");
const canvas =document.getElementById("Canvas");
const context = canvas.getContext("2d");
const width= 1000;
const height=580;
canvas.width =width;
canvas.height =height;


function Enemy(x, y, dx){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.draw = function(){
        context.beginPath();
        context.arc(this.x,this.y, 30, 2 * Math.PI, false);
        context.fillStyle = "white";
        context.fill();
    }
    this.update = function(){
        this.x = this.x - this.dx;
        this.draw();
    }
}
function Shooting(x, y, dx){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.draw = function(){
        context.beginPath();
        context.arc(this.x,this.y, 10, 2 * Math.PI, false);
        context.fillStyle = "green";
        context.fill();
    }
    this.update = function(){
        this.x = this.x + this.dx;
        this.draw();
    }
}
const shoots = [];

const elien = [];
function Elien(){
    // setInterval(() =>{
        // x = Math.random() + canvas.width;
        // y = Math.random() * canvas.height;
        // dx = 1;
        elien.push(new Enemy(800, 290, 3));
    // }, 1500);
};
// const spaceship = new Enemy(200, 290, 0);
// spaceship.draw(); removed by clearRect so we need to add in animate after clearRect

function getdistance(x1,x2){
    // const Xdist = x2 - x1;
    return x2-x1;
};


function animate() {
     requestAnimationFrame(animate);
     context.clearRect(0, 0, canvas.width, canvas.height);//removes previous from canvas
     elien.forEach((Enemy,index) =>{
         Enemy.update();
        shoots.forEach((Shooting,index) =>{
            const Xdist = Enemy.x - Shooting.x;
        if( Xdist < 40){
            Enemy.splice(index,1);
            Shooting.splice(index,1);
        };
            // console.log(Xdist);
        })
     });
     shoots.forEach((Shooting) =>{
         Shooting.update();
         
     });
     
    //  spaceship.draw();
     context.beginPath();
     context.arc(200, 290, 30, 2 * Math.PI, false);
     context.fillStyle = 'red';
     context.fill();
    //  context.beginPath();
    //  context.arc(120, 470, 60, 2 * Math.PI, false);
    //  context.fillStyle = 'grey';
    //  context.fill();
}
addEventListener('click', () =>{
    const ball = new Shooting(200, 290, 5);
    shoots.push(ball);
    // console.log(getdistance(ball.x, ball.y));
},false);

animate();
Elien();


