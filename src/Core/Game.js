import * as Constants from "../Constants";
import {AssetManager} from "./AssetManager";
import {Canvas} from './Canvas';
import {Skier} from "../Entities/Skier";
import {Rhino} from "../Entities/Rhino";
import {ObstacleManager} from "../Entities/Obstacles/ObstacleManager";
import {CollisionManager} from "./CollisionManager";
import {Score} from "./Score";
import {Rect} from './Utils';

export class Game {
	gameWindow = null;

	constructor() {
		this.assetManager     = new AssetManager();
		this.canvas           = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
		this.skier            = new Skier(0, 0);
		this.rhino            = new Rhino(Constants.GAME_WIDTH, -200);
		this.obstacleManager  = new ObstacleManager();
		this.collisionManager = new CollisionManager();
		this.score            = new Score();

		document.addEventListener('keydown', this.handleKeyDown.bind(this));
	}

	init() {
		this.obstacleManager.placeInitialObstacles();
		this.calculateGameWindow();
	}

	async load() {
		await this.assetManager.loadAssets(Constants.ASSETS);
	}

	run() {
		this.canvas.clearCanvas();

		this.updateGameWindow();
		this.drawGameWindow();

		requestAnimationFrame(this.run.bind(this));
	}

	updateGameWindow() {
		this.skier.update();
		this.rhino.update(this.skier);

		const previousGameWindow = this.gameWindow;
		this.calculateGameWindow();

		this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);

		this.collisionManager.checkIfEntityHitObstacle(this.skier, this.obstacleManager, this.assetManager);
		this.collisionManager.checkIfSkierHitRhino(this.skier, this.rhino, this.assetManager);
	}

	drawGameWindow() {
		this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);

		this.skier.draw(this.canvas, this.assetManager);
		this.obstacleManager.drawObstacles(this.canvas, this.assetManager);
		this.rhino.draw(this.canvas, this.assetManager);
		this.score.draw(this.canvas, this.skier);
	}

	calculateGameWindow() {
		const skierPosition = this.skier.getPosition();

		const left = skierPosition.x - (Constants.GAME_WIDTH / 2);
		const top  = skierPosition.y - (Constants.GAME_HEIGHT / 2);

		this.gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT);
	}

	handleKeyDown(event) {
		switch (event.which) {
			case Constants.KEYS.SPACE:
				this.skier.jump();
				event.preventDefault();
				break;
			case Constants.KEYS.LEFT:
				this.skier.turnLeft();
				event.preventDefault();
				break;
			case Constants.KEYS.RIGHT:
				this.skier.turnRight();
				event.preventDefault();
				break;
			case Constants.KEYS.UP:
				this.skier.turnUp();
				event.preventDefault();
				break;
			case Constants.KEYS.DOWN:
				this.skier.turnDown();
				event.preventDefault();
				break;
		}
	}
}