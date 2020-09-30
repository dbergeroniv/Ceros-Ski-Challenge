import {AnimationManager} from "../Core/AnimationManager";

export class Entity {

	x = 0;
	y = 0;

	constructor(x, y) {
		this.x = x;
		this.y = y;

		this.animator  = new AnimationManager();
	}

	updateAsset(asset) {
		this.assetName = asset;
	}

	getAssetName() {
		return this.assetName;
	}

	getPosition() {
		return {
			x: this.x,
			y: this.y
		};
	}

	draw(canvas, assetManager) {
		const assets = assetManager.getAssets(this.assetName);
		this.animator.update(assets.length);
		const asset = assets[this.animator.getFrame()];
		const drawX = this.x - asset.width / 2;
		const drawY = this.y - asset.height / 2;

		canvas.drawImage(asset, drawX, drawY, asset.width, asset.height);
	}
} 