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
function Shoots(x, y){
    this.x = x;
    this.y = y;
    this.draw = function(){
        context.beginPath();
        context.arc(this.x,this.y, 40, 2 * Math.PI, false);
        context.fillStyle = "white";
        context.fill();
    }
}
const shoots = [];
const shots = new Shoots(920,500);
function Spaceship(x, y){
    this.x = x;
    this.y = y;
    this.draw = function(){
        context.beginPath();
        context.arc(this.x,this.y, 30, 2 * Math.PI, false);
        context.fillStyle = "red";
        context.fill();
    }
}
const spaceship = new Spaceship(200, 290);

const lives = [];
const elien = [];
function Elien(){
    setInterval(() =>{
        x = Math.random() + canvas.width;
        y = Math.random() * (canvas.height -140);
        dx = 1;
        const enemy = new Enemy(x, y, dx);
        elien.push(enemy);
        // elien.push(Enemy(x, y, dx));
    }, 1500);
};
function life(x, y,dx){
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
//movement
function move(x, y){
    this.x = x;
    this.y = y;
    this.draw = function(){
        context.beginPath();
        context.arc(this.x,this.y, 10, 2 * Math.PI, false);
        context.fillStyle = "green";
        context.fill();
    }
}
//stars
const stars = [];
// function Movedown(){
//     setInterval(() =>{
//         stars.push( new Star(300,100,1));
//     }, 1500);
// }
function Star(x,y,dy){
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.draw = function(){
        context.beginPath();
        context.moveTo(this.x,this.y);
        context.lineTo(this.x +10,this.y +10);
        context.strokeStyle = 'white';
        context.stroke();
    }
    this.update = function(){
        this.y = this.y + this.dy;
        this.draw();
    }
}
const star = new Star(300, 100,1);
// console.log(Star);
function Movedown(){
    setInterval(() =>{
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;
        dy = 1;
        // const fab = new Star(x, y,1);
        stars.push( new Star(x, y,dy));
        // console.log(x);
    }, 1500);
};


// spaceship.draw(); removed by clearRect so we need to add in animate after clearRect
let getscore  =  0;
let animationframe;
function animate() {
     animationframe = requestAnimationFrame(animate);
     context.clearRect(0, 0, canvas.width, canvas.height);//removes previous from canvas
     spaceship.draw();
     shots.draw();
     life1.draw();
    //  star.update();
     //movement
     context.beginPath();
     context.arc(97, 486, 70, 2 * Math.PI, false);
     context.fillStyle = 'grey' ;
     context.fill();
     //stars
     stars.forEach((Star) =>{
        Star.update();
    });
     lives.forEach((life) =>{
         life.draw();
     });
     shoots.forEach((Shooting) =>{
        Shooting.update();
        
    });
    //game over
     elien.forEach((Enemy,index) =>{
         Enemy.update();
         const Xdist =  Enemy.x - spaceship.x;
        //  console.log(Xdist);
         if(( Xdist <= 40 ) && (Enemy.y = spaceship.y)){
            //  alert("Game Over");
             cancelAnimationFrame(animationframe);
             cards.style.display ='block';
             numb.innerHTML = getscore;
             cards.style.display = 'flex';
            
         }
        shoots.forEach((Shooting,sindex) =>{
            const Xdist = Enemy.x - Shooting.x;
//remove when object touches
        if( (Xdist <= 40) && (Enemy.y = Shooting.y)){
            getscore = getscore + 100;
            document.getElementById("getscore").innerHTML = getscore;
            setTimeout(() =>{       
            elien.splice(index,1);
            shoots.splice(sindex,1);},0);
       
            };
            // console.log(Xdist);
        })
     });
    
     
}
// addEventListener('click', () =>{
//     const ball = new Shooting(200, 290, 5);
//     shoots.push(ball);
//     // console.log(getdistance(ball.x, ball.y));
// },false);
document.getElementById("top").addEventListener('click',()=>{
    spaceship.y = spaceship.y - 30;
    spaceship.draw();
},);
document.getElementById("left").addEventListener('click',()=>{
    spaceship.x = spaceship.x - 30;
    spaceship.draw();
},);
document.getElementById("right").addEventListener('click',()=>{
    spaceship.x = spaceship.x + 30;
    spaceship.draw();
},);
document.getElementById("bottom").addEventListener('click',()=>{
    spaceship.y = spaceship.y + 30;
    spaceship.draw();
},);
//shooting icon
document.getElementById("shot").addEventListener('click',() =>{
    const ball = new Shooting(200, 290, 5);
    shoots.push(ball);
    shoots.forEach((Shooting) =>{
        ball.y = spaceship.y;
        ball.x = spaceship.x;
        Shooting.draw();
    });
});

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
    //lifes 5 min
    setInterval(() =>{
        // alert("YOU HAVE GOT ONE LIFE :)");
        i ++;
        x = 30+ (20 * i);
        const lifes = new life(x,50,0);
        lives.push(lifes);
        // console.log(x);
        // console.log(getscore);
    },300000);
    //levels 10 min
    setInterval(() => {
        alert("YOU HAVE REACHED NEXT LEVEL :)");
        elien.forEach((Enemy) =>{
            Enemy.dx = Enemy.dx + 1;
            Enemy.update();
            console.log(Enemy.dx); 
        })
    },600000);
    // points 15 min
    setInterval(() => {
        alert("BONUS POINTS('1000') :)");
        getscore = getscore + 1000;
        document.getElementById("getscore").innerHTML = getscore;
        
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
});



