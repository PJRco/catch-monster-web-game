var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
    bgReady = true;
};
bgImage.src = "image/background.jpg";

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function(){
    heroReady = true;
}
heroImage.src = "image/hero.jpg";

var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function(){
    monsterReady = true;
}
monsterImage.src = "image/monster.jpg";

var hero = {
    speed : 256
};
var monster = {};
var monsterCaught = 0;

var keysDown={}

addEventListener("keydown", function (e){
    keysDown[e.keyCode]=true;
}, false);

addEventListener("keyup", function(e){
    delete keysDown[e.keyCode];
}, false);

var reset = function(){
    hero.x = canvas.width/2;
    hero.y = canvas.height/2;

    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};

var update = function(modifier){

    if (38 in keysDown) { // Player holding up															
            hero.y -= hero.speed * modifier;
        if( hero.y < 32 )//英雄到达边界时限制行动
            hero.y = 32;
        }
    if (40 in keysDown) { // Player holding down
        hero.y += hero.speed * modifier;
        if( hero.y >= 416) {
            hero.y = 416;
        }
        }
    if (37 in keysDown) { // Player holding left
        hero.x -= hero.speed * modifier;
        if( hero.x < 32){
            hero.x = 32;
        }
        }
    if (39 in keysDown) { // Player holding right
        hero.x += hero.speed * modifier;
        if( hero.x > 448){
            hero.x = 448;
        }
        }
    if(
        hero.x <= monster.x + 32
        && hero.x >= monster.x -32
        && hero.y <= monster.y +32
        && hero.y >= monster.y -32
    ){
        monsterCaught++;
        reset();
    }
};

var render = function(){
    if(bgReady){
        ctx.drawImage(bgImage, 0, 0);
    }

    if(heroReady){
        ctx.drawImage(heroImage, hero.x, hero.y, 32 , 32);
    }

    if(monsterReady){
        ctx.drawImage(monsterImage, monster.x, monster.y, 32, 32);
    }

    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica"
    ctx.textAlign = "left";
    ctx.textBaseline="top";
    ctx.fillText("佛哥抓住了: " + monsterCaught, 32, 32)
};

var main = function(){
    var now = Date.now();

    var delta = now - then;
    console.log(delta);
    update(delta/1000);
    render();
    then = now;
    requestAnimationFrame(main);
}

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
reset();
main();

