class Snake {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.dx = 0;
		this.dy = 0;
		this.body = [{x: this.x, y: this.y}];
		this.size = 1;
		this.keyspressed = [];
	}

	draw() {
		if (document.getElementById("colorfulSnakeMode").checked) {
			canvasContext.fillStyle = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
		} else {
			canvasContext.fillStyle = "green";
		}

		canvasContext.fillRect(this.x, this.y, 10, 10);
	}

	update() {
		for (let i = 0; i < this.keyspressed.length; i++) {
			switch (this.keyspressed[i]) {
				case 38:
					if (this.dy == 0) {
						this.dx = 0;
						this.dy = -10;
					}
					break;
	
				case 37:
					if (this.dx == 0) {
						this.dy = 0;
						this.dx = -10;
					}
					break;
	
				case 40:
					if (this.dy == 0) {
						this.dx = 0;
						this.dy = 10;
					}
					break;
	
				case 39:
					if (this.dx == 0) {
						this.dy = 0;
						this.dx = 10;
					}
					break;
			}

			this.keyspressed.splice(i, 1);
		}

		this.x += this.dx;
		this.y += this.dy;

		this.body.push({x: this.x, y: this.y});

		if (this.body.length > this.size) {
			this.tail = [];

			for (let i = 0; i < this.body.length - this.size; i++) {
				this.tail.push(this.body.shift());
			}

			for (let i = 0; i < this.tail.length; i++) {
				canvasContext.clearRect(this.tail[i].x, this.tail[i].y, 10, 10);
			}
		}

		if (apple.x == this.x && apple.y == this.y) {
			apple.x = Math.floor(Math.random() * 30) * 10;
			apple.y = Math.floor(Math.random() * 30) * 10;
			score++;
			this.size++;
		}

		if (document.getElementById("immortalMode").checked) {
			if (this.x > 300) {
				this.x = 0;
			} else if (this.x < 0) {
				this.x = 300;
			} else if (this.y > 300) {
				this.y = 0;
			} else if (this.y < 0) {
				this.y = 300;
			}

			if (this.body[0].x > 300 || this.body[0].y > 300) {
				canvasContext.clearRect(0, 0, 300, 10);
				canvasContext.clearRect(0, 0, 10, 300);
			}

			return;
		}

		if (this.x >= 300 || this.y >= 300 || this.x < 0 || this.y < 0) {
			gameOver();
		}

		for (let i = 0; i < this.body.length - 1; i++) {
			if (this.x == this.body[i].x && this.y == this.body[i].y) {
				gameOver();
			}
		}
	}

	keyDown(event) {
		this.keyspressed.push(event.keyCode);
	}
}

class Apple {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	draw() {
		canvasContext.fillStyle = "red";
		canvasContext.fillRect(this.x, this.y, 10, 10);
	}
}

const canvas = document.querySelector("canvas");
const canvasContext = canvas.getContext("2d");
let apple = new Apple(150, 140);
let snake = new Snake(50, 140, 38, 37, 40, 39);
let score = 0;

function keyPressed(event) {
	snake.keyDown(event);
}

function update() {
	snake.update();
	snake.draw();
	apple.draw();
	document.getElementById("scoreText").innerHTML = "Score: " + score;
}

document.addEventListener("keydown", keyPressed);

document.getElementById("resetButton").onclick = function() {
	window.location.href = window.location.href;
}

document.getElementById("pauseButton").onclick = function() {
	alert("Game paused, press OK to continue.");
}

let gameLoop = setInterval(update, 1000/10);

function gameOver() {
	alert("GAME OVER!");
	clearInterval(gameLoop);
	location.reload();
}