var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/flappy_bird_bird.png";
bg.src = "img/flappy_bird_bg.png";
fg.src = "img/flappy_bird_fg.png";
pipeUp.src = "img/flappy_bird_pipeUp.png";
pipeBottom.src = "img/flappy_bird_pipeBottom.png";

var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

document.addEventListener("keydown", moveUp);

var score = 0;
var gap = 90;
var Xpos = 20;
var Ypos = 120;
var grav = 1.5;

var pipe = [];
pipe[0] = {
    x : cvs.width,
    y : 0
};

function draw() {
    ctx.drawImage(bg, 0, 0);
    
    for(var i = 0; i < pipe.length; i++){
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        pipe[i].x--;
        
        if(pipe[i].x == 100){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
        
        if(Xpos+bird.width >= pipe[i].x
          && Xpos <= pipe[i].x + pipeUp.width
          && (Ypos <= pipe[i].y + pipeUp.height
             || Ypos + bird.height >= pipe[i].y + pipeUp.height 
              + gap) || Ypos + bird.height >= bg.height - fg.height + 20){
            location.reload();
        }
        
        if(pipe[i].x == 5){
            score++;
            score_audio.play();
        }
    }
    
    
    
    ctx.drawImage(fg, 0, bg.height - fg.height + 20);
    
    ctx.drawImage(bird, Xpos, Ypos);
    Ypos += grav;
    
    ctx.font = "24px Verdana";
    ctx.fillText("Score: " + score, 15, cvs.height - 30);
    
    requestAnimationFrame(draw);
}

function moveUp(){
    Ypos -= 25;
    fly.play();
}

pipeBottom.onload = draw;
