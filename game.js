// console.log("vyshu");
const canvas =document.getElementById("Canvas");
const context = canvas.getContext("2d");
const width= 1000;
const height=580;
canvas.width =width;
canvas.height =height;
context.fillStyle = "black";
context.fill();
const startgame =document.getElementById("startgame");
const numb = document.getElementById("numb");

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
        context.arc(this.x,this.y, 5, 2 * Math.PI, false);
        context.fillStyle = "green";
        context.fill();
    }
    this.update = function(){
        this.x = this.x + this.dx;
        this.draw();
    }
}
function Spaceship(x, y, dx){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.draw = function(){
        context.beginPath();
        context.arc(this.x,this.y, 30, 2 * Math.PI, false);
        context.fillStyle = "red";
        context.fill();
    }
}
const spaceship = new Spaceship(200, 290, 0);
const shoots = [];
const lives = [];

const elien = [];
function Elien(){
    setInterval(() =>{
        x = Math.random() + canvas.width;
        y = Math.random() * canvas.height;
        dx = 1;
        elien.push(new Enemy(x, y, dx));
    }, 1500);
};
function life(x, y, dx){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.draw = function(){
        context.beginPath();
        context.arc(this.x,this.y, 5, 2 * Math.PI, false);
        context.fillStyle = "green";
        context.fill();
    }
}
const life1 = new life(30,50,0);
const life2 = new life(50,50,0);
const life3 = new life(70,50,0);
const life4 = new life(90,50,0);
const life5 = new life(110,50,0);
// spaceship.draw(); removed by clearRect so we need to add in animate after clearRect
let getscore  =  0;
let animationframe;
function animate() {
     animationframe = requestAnimationFrame(animate);
    //  context.fillStyle = "rgba(0,0,0,0.1)";
     context.clearRect(0, 0, canvas.width, canvas.height);//removes previous from canvas
     spaceship.draw();
     life1.draw();
     life2.draw();
     life3.draw();
     life4.draw();
     life5.draw();
     lives.forEach((life) =>{
         life.draw();
     })
     shoots.forEach((Shooting) =>{
        Shooting.update();
        
    });
    //game over
     elien.forEach((Enemy,index) =>{
         Enemy.update();
         const Xdist = Enemy.x - spaceship.x;
         if(( Xdist <= 40 )){
            //  alert("Game Over");
             cancelAnimationFrame(animationframe);
             cards.style.display ='block';
             numb.innerHTML = getscore;
            // console.log(Xdist);
         };

        shoots.forEach((Shooting,sindex) =>{
            const Xdist = Enemy.x - Shooting.x;
//remove when object touches
        if( (Xdist <= 40) ){
            getscore = getscore + 100;
            document.getElementById("getscore").innerHTML = getscore;
            setTimeout(() =>{
            elien.splice(index,1);
            shoots.splice(sindex,1);},0);
       
            };
            // console.log(Xdist);
        })
     });

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
let timesec=0;
let timemin=0;
let timehrs=0;
let displaysec=0;
let displaymin=0;
let displayhrs=0;
let i = 0;

startgame.addEventListener('click',() =>{
    timesec=0;
    timemin=0;
    timehrs=0;
    getscore=0;
    //levels
    setInterval(() => {
        alert("YOU HAVE REACHED NEXT LEVEL :)");
        elien.forEach((Enemy) =>{
            Enemy.dx = Enemy.dx + 1;
            Enemy.update();
            console.log(Enemy.dx); 
        })
    },1200000);
    // points
    setInterval(() => {
        alert("YOU HAVE WON EXTRA POINTS('1000') + 1 life :)");
        getscore = getscore + 1000;
        document.getElementById("getscore").innerHTML = getscore;
        //lifes
        i ++;
        x = 110 + (20 * i);
        const lifes = new life(x,50,0);
        lives.push(lifes);
        // console.log(x);
        // console.log(getscore);
    },900000);
    setInterval(() => {
        timesec++;
        if((timesec/60) ==1){
            timesec =0;
            timemin++;
            if((timemin/60)==1){
                timemin=0;
                timehrs++;
            }
        } 
    
        if(timesec< 10){
            displaysec="0"+timesec.toString();
        }
        else{
            displaysec=timesec;
        }
        if(timemin<10){
            displaymin="0"+timemin.toString();
        }
        else{
            displaymin=timemin;
        }
        if(timehrs<10){
            displayhrs="0"+timehrs.toString();
        }
        else{
            displayhrs=timehrs;
        }
        document.getElementById("gettime").innerHTML =displayhrs +":"+displaymin +":"+displaysec ;

    }, 1000);
    
    cards.style.display ='none';
    animate();
    Elien();
    // console.log("go");
},false);



