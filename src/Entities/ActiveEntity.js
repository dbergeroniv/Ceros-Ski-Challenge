import {Entity} from "./Entity";

export class ActiveEntity extends Entity {

	directions = [1, 2];

	constructor(x, y) {
		super(x, y);
	}

	setState(state) {
		this.state = state;
	}

	setDirection(direction) {
		this.direction = direction;
	}

	turnLeft() {
		if (this.direction !== this.directions[0]) {
			this.setDirection(this.direction - 1);
		}
	}

	turnRight() {
		if (this.direction !== this.directions[this.directions.length - 1]) {
			this.setDirection(this.direction + 1);
		}
	}

	moveLeft() {
		this.x -= this.defaultSpeed;
	}

	moveLeftDown() {
		this.x -= this.speed / this.speedReducer;
		this.y += this.speed / this.speedReducer;
	}

	moveDown() {
		this.y += this.speed;
	}

	moveRight() {
		this.x += this.defaultSpeed;
	}

	moveUp() {
		this.y -= this.defaultSpeed;
	}

	moveRightDown() {
		this.x += this.speed / this.speedReducer;
		this.y += this.speed / this.speedReducer;
	}

}