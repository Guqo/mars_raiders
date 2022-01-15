// canvas
const canvas = document.getElementById("canvas")
const c = canvas.getContext("2d")

// třídy

class Player {
    constructor() {
        this.w = 30;
        this.x = 540 - this.w / 2;
        this.y = 750;
        this.h = 20;
        this.xs = 0;
        this.holdA = false;
        this.holdD = false;
    }
    draw() {
        c.drawImage(rocket, this.x, this.y, this.w, this.h)
        this.x += this.xs;
        if (this.x > 1080 - this.w) {
            this.x = 1080 - this.w;
            this.xs = 0;
        }
        if (this.x < 0) {
            this.x = 0;
            this.xs = 0;
        }
        if (this.holdA) {
            this.xs -= 0.1;
        } else if (this.xs < 0) {
            this.xs += 0.1;
        }
        if (this.holdD) {
            this.xs += 0.1;
        } else if (this.xs > 0) {
            this.xs -= 0.1;
        }
    }
}

class Player2 {
    constructor() {
        this.w = 30;
        this.x = 540 - this.w / 2;
        this.y = 750;
        this.h = 20;
        this.xs = 0;
        this.holdA = false;
        this.holdD = false;
    }
    draw() {
        c.drawImage(hrac2, this.x, this.y, this.w, this.h)
        this.x += this.xs;
        if (this.x > 1080 - this.w) {
            this.x = 1080 - this.w;
            this.xs = 0;
        }
        if (this.x < 0) {
            this.x = 0;
            this.xs = 0;
        }
        if (this.holdA) {
            this.xs -= 0.1;
        } else if (this.xs < 0) {
            this.xs += 0.1;
        }
        if (this.holdD) {
            this.xs += 0.1;
        } else if (this.xs > 0) {
            this.xs -= 0.1;
        }
    }
}

class Shoot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.h = 20;
        this.w = 5;
    }
    draw() {
        c.drawImage(bullet, this.x, this.y, this.w, this.h);
        this.y -= 15;
    }
}

class Shoot2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.h = 20;
        this.w = 5;
    }
    draw() {
        c.drawImage(bullet2, this.x, this.y, this.w, this.h);
        this.y -= 15;
    }
}


class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 40;
        this.h = 30;
        this.destroy = false;
    }
    draw() {
        c.drawImage(emzak, this.x, this.y, this.w, this.h);
        if (kolize(this, shoot)) {
            this.destroy = true;
            shoot.y = -100;
        }
        if (kolize(this, shoot2)) {
            this.destroy = true;
            shoot.y = -100;
        }
        this.x += 1 * smer;
        if (this.x > 1080 - this.w) {
            zmenitSmer = true;
        }
        if (this.x < 0) {
            zmenitSmer = true;
        }
        if (this.y > 700) {
            gameOver = true;
        }
        if (Math.random() < 0.0002) {
            shootEnemy.push(new ShootEnemy(this.x, this.y));
        }
    }
}

class ShootEnemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.h = 20;
        this.w = 5;
    }
    draw() {
        c.drawImage(bulletEnemy, this.x, this.y, this.w, this.h);
        this.y += 1;
        if (kolize(player, this)) {
            gameOver = true;
        }
        if (kolize(player2, this)) {
            gameOver = true;
        }
    }
}


// funkce
function evalFPS(timestamp) { // funkce pro výpočet fps
    let lastRender = timeStamp
    timeStamp = timestamp
    dt = (timeStamp - lastRender) / (1000 / 60)
    fps = dt * 60
}
let kolize = (rect1, rect2) => (rect1.x > rect2.x - rect1.w && rect1.x < rect2.x + rect2.w && rect1.y > rect2.y - rect1.h && rect1.y < rect2.y + rect2.h) ? true : false;

// proměnné
let pause = false
let timeStamp = 0
let fps = 0
let dt = 0
let player = new Player();
let player2 = new Player();
let shoot = new Shoot(-100, -100);
let shoot2 = new Shoot(-100, -100);
let nepratele = [];
for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 10; j++) {
        nepratele.push(new Enemy(120 + i * 55, -200 + j * 55));
    }
}
let smer = 1;
let zmenitSmer = false;
let gameOver = false;
let shootEnemy = [];
let score = 0;
let rocket = new Image();
rocket.src = "img/player.png";
let bullet = new Image();
bullet.src = "img/bullet.png";
let bulletEnemy = new Image();
bulletEnemy.src = "img/bullet_enemy.png";
let emzak = new Image();
emzak.src = "img/enemy.png";
let star = new Image();
star.src = "img/star.png";
let hrac2 = new Image();
hrac2.src = "img/player2.png";
let bullet2 = new Image();
bullet2.src = "img/bullet2.png";

// main loop
function main(timestamp) {
    // výpočet fps
    evalFPS(timestamp)

    // váš kód
    c.drawImage(star, 0, 0);
    player.draw();
    player2.draw();
    shoot.draw();
    shoot2.draw();
    for (var i in nepratele) {
        nepratele[i].draw();
    }
    for (var i in shootEnemy) {
        shootEnemy[i].draw();
    }
    if (zmenitSmer == true) {
        smer *= -1;
        zmenitSmer = false;
        for (var i in nepratele) {
            nepratele[i].y += 30;
        }
    }
    for (var i in nepratele) {
        if (nepratele[i].destroy) {
            nepratele.splice(i, 1);
            score += 10;
        }
    }
    if (gameOver == true) {
        pause = true;
        c.fillStyle = "red";
        c.font = "100px calibri";
        c.textAlign = "center";
        c.fillText("Game Over!", 1080 / 2, 800 / 2);
    }
    if (nepratele.length == 0) {
        pause = true;
        c.fillStyle = "lime";
        c.font = "70px calibri";
        c.textAlign = "center";
        c.fillText("Game Over, but you won!", 1080 / 2, 800 / 2);
    }
    c.fillStyle = "white"
    c.font = "20px calibri";
    c.textAlign = "left";
    c.fillText("SCORE: " + score, 10, 25)

    // spuštění příštího cyklu
    if (!pause)
        requestAnimationFrame(main)
}

// eventy
canvas.addEventListener("click", e => {
    let click = { x: e.offsetX, y: e.offsetY }
    console.log(click.x, click.y)
});
addEventListener("keydown", function(e) {
    console.log(e.code);
    if (e.code == "ArrowLeft") {
        player2.holdA = true;
    }
    if (e.code == "ArrowRight") {
        player2.holdD = true;
    }
    if (e.code == "ArrowUp" && shoot2.y < 0) {
        shoot2.x = player2.x + player2.w / 2;
        shoot2.y = player2.y;
    }
    if (e.code == "KeyA") {
        player.holdA = true;
    }
    if (e.code == "KeyD") {
        player.holdD = true;
    }
    if (e.code == "KeyW" && shoot.y < 0) {
        shoot.x = player.x + player.w / 2;
        shoot.y = player.y;
    }
});

addEventListener("keyup", function(e) {
    console.log(e.code);
    if (e.code == "ArrowLeft") {
        player2.holdA = false;
    }
    if (e.code == "ArrowRight") {
        player2.holdD = false;
    }
    if (e.code == "KeyA") {
        player.holdA = false;
    }
    if (e.code == "KeyD") {
        player.holdD = false;
    }
});

// spuštění hry
main(0)