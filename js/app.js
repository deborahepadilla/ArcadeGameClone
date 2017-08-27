var Enemy = function(x, y) {
    this.x = x;
    this.y = y;

    this.sprite = 'images/enemy-bug.png';
    this.speed = 50 + Math.floor(Math.random() * 200);
};

Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    if (this.x > 505) {
        this.x = 0;
    }
};


Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-horn-girl.png';
};

Player.prototype.update = function(dt) {
    this.checkCollisions();
    //this.reset();
};

Player.prototype.checkCollisions = function() {
    for (i = 0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 60 && this.x + 60 > allEnemies[i].x && this.y < allEnemies[i].y + 50 && this.y + 50 > allEnemies[i].y) {
            this.reset();
        }
    }
};


Player.prototype.reset = function() {
    var that = this;
    setTimeout(function() {
        that.y = 405;
        that.x = 200;
    }, 250);
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    if (direction === 'up' && this.y > -9) {
        this.y -= TILE_HEIGHT;
    } else if (direction === 'down' && player.y < 405) {
        this.y += TILE_HEIGHT;
    } else if (direction === 'left' && player.x > -1) {
        this.x -= TILE_WIDTH;
    } else if (direction === 'right' && player.x < 400) {
        this.x += TILE_WIDTH;
    } else {
        return;
    }
};

Player.prototype.checkWinGame = function() {
    if (this.y < 0) {
        setTimeout(function() {
            if (confirm("Congratulations!!")) {
                this.reset();
            }
        }.bind(this), 200);
    }
};

var enemy1 = new Enemy(-50, 225);
var enemy2 = new Enemy(-200, 145);
var enemy3 = new Enemy(-100, 60);
var enemy4 = new Enemy(-150, 145);

var allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);

var player = new Player(200, 405);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});