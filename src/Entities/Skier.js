import * as Constants from "../Constants";
import {ActiveEntity} from "./ActiveEntity";
import {Rhino} from "./Rhino";

export class Skier extends ActiveEntity {

	assetName    = Constants.SKIER_DOWN;
	direction    = Constants.SKIER_DIRECTIONS.DOWN;
	state        = Constants.SKIER_STATES.NORMAL;
	speed        = Constants.SKIER_STARTING_SPEED;
	defaultSpeed = Constants.SKIER_STARTING_SPEED;
	speedReducer = Constants.SKIER_DIAGONAL_SPEED_REDUCER;

	travelled = 0;

	constructor(x, y) {
		super(x, y);
		this.originalY = y;
	}

	update() {
		if (this.canMove()) {
			this.move();
		}

		this.updateAsset();
	}

	updateAsset() {
		if (this.isStanding()) {
			this.assetName = Constants.SKIER_ASSET[this.direction];
		} else {
			this.assetName = Constants.SKIER_ASSET[this.state];
		}
	}

	move() {
		switch (this.direction) {
			case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
				this.moveLeftDown();
				break;
			case Constants.SKIER_DIRECTIONS.DOWN:
				this.moveDown();
				break;
			case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
				this.moveRightDown();
				break;
		}

		this.travelled = this.y - this.originalY;
	}

	stand(direction = this.direction) {
		this.setState(Constants.SKIER_STATES.NORMAL);
		this.setDirection(direction);
	}

	jump() {
		if (this.canJump()) {
			this.setState(Constants.SKIER_STATES.JUMP);
			this.animator.start(80, false, () => {
				this.stand();
			});
		}
	}

	crash() {
		this.animator.stop();
		this.setState(Constants.SKIER_STATES.CRASH);
	}

	hide() {
		this.animator.stop();
		this.setState(Constants.SKIER_STATES.HIDE);
	}

	kill() {
		this.animator.stop();
		this.setState(Constants.SKIER_STATES.DEAD);
	}

	isJumping() {
		return this.state === Constants.SKIER_STATES.JUMP;
	}

	isStanding() {
		return this.state === Constants.SKIER_STATES.NORMAL;
	}

	isCrashed() {
		return this.state === Constants.SKIER_STATES.CRASH;
	}

	isDead() {
		return this.state === Constants.SKIER_STATES.DEAD;
	}

	isHidden() {
		return this.state === Constants.SKIER_STATES.HIDE;
	}

	canMove() {
		return !this.isCrashed() && !this.isDead() && !this.isHidden();
	}

	canTurn() {
		return !this.isJumping() && !this.isDead() && !this.isHidden();
	}

	canJump() {
		return !this.isJumping() && !this.isCrashed();
	}

	turnLeft() {
		if (!this.canTurn()) {
			return;
		}
		if (this.state === Constants.SKIER_STATES.CRASH) {
			this.stand(Constants.SKIER_DIRECTIONS.LEFT);
		}
		if (this.direction === Constants.SKIER_DIRECTIONS.LEFT) {
			this.moveLeft();
		} else {
			this.setDirection(this.direction - 1);
		}
	}

	turnRight() {
		if (!this.canTurn()) {
			return;
		}
		if (this.isCrashed()) {
			this.stand(Constants.SKIER_DIRECTIONS.RIGHT);
		}
		if (this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
			this.moveRight();
		} else {
			this.setDirection(this.direction + 1);
		}
	}

	turnUp() {
		if (!this.canTurn()) {
			return;
		}
		if (this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
			this.moveUp();
		}
	}

	turnDown() {
		if (!this.canTurn()) {
			return;
		}
		this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
	}

	collide(entity) {
		if (this.isDead() || this.isHidden()) {
			return;
		}

		if (entity instanceof Rhino) {
			this.hide();
		}

		if (this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
			return;
		}

		switch (entity.assetName) {
			case Constants.TREE:
			case Constants.TREE_CLUSTER:
				this.crash();
				break;
			case Constants.ROCK1:
			case Constants.ROCK2:
				if (!this.isJumping()) {
					this.crash();
				}
				break;
			case Constants.RAMP:
				this.jump();
				break;
		}
	}
}