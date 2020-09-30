import * as Constants from "../Constants";
import {ActiveEntity} from "./ActiveEntity";
import {intersectTwoRects, Rect} from "../Core/Utils";

export class Rhino extends ActiveEntity {

	assetName    = Constants.RHINO_RUN_LEFT;
	direction    = Constants.RHINO_DIRECTIONS.LEFT;
	state        = Constants.RHINO_STATES.IDLE;
	speed        = Constants.RHINO_STARTING_SPEED;
	defaultSpeed = Constants.RHINO_STARTING_SPEED;
	speedReducer = Constants.RHINO_DIAGONAL_SPEED_REDUCER;
	states       = Constants.RHINO_STATES;

	caught  = false;
	spawned = false;

	constructor(x, y) {
		super(x, y);
	}

	update(skier) {
		switch (this.state) {
			case this.states.IDLE:
				if (skier.y > Constants.RHINO_STARTING_DISTANCE) {
					this.spawn(skier.x + Constants.GAME_WIDTH / 2, Constants.RHINO_STARTING_DISTANCE);
					this.startRunning();
				}

				break;
			case this.states.RUN:
				this.hunt(skier);

				break;
			case this.states.EAT:
				break;
			case this.states.HIDE:
				break;
		}

		this.updateAsset();
	}

	updateAsset() {
		if (this.state === this.states.RUN) {
			this.assetName = Constants.RHINO_ASSET[this.direction];
		} else {
			this.assetName = Constants.RHINO_ASSET[this.state];
		}
	}

	spawn(x, y) {
		this.spawned = true;
		this.caught  = false;
		this.x       = x;
		this.y       = y;
	}

	startRunning() {
		this.setState(this.states.RUN);
		this.animator.start(80, true);
	}

	eat(skier) {
		this.caught = true;
		this.setState(Constants.RHINO_STATES.EAT);
		this.animator.start(200, false, () => {
			skier.kill();
			this.setState(Constants.RHINO_STATES.HIDE);
		});
	}

	hunt(skier) {
		if (this.x - this.speed > skier.x) {
			this.turnLeft();

			if (this.y < skier.y) {
				this.moveLeftDown();
			} else {
				this.moveLeft();
			}
		} else if (this.x + this.speed < skier.x) {
			this.turnRight();

			if (this.y < skier.y) {
				this.moveRightDown();
			} else {
				this.moveRight();
			}
		} else {
			this.moveDown();
		}
	}

	collide(skier) {
		if (!this.caught) {
			this.eat(skier);
		}
	}
}