import {intersectTwoRects, Rect} from "../Core/Utils";

export class CollisionManager {

	constructor() { }

	getEntityBounds(entity, assetManager) {
		const asset = assetManager.getAsset(entity.assetName, entity.animator.getFrame());

		return new Rect(
			entity.x - asset.width / 2,
			entity.y - asset.height / 2,
			entity.x + asset.width / 2,
			entity.y - asset.height / 4
		);
	}

	checkIfEntityHitObstacle(entity, obstacleManager, assetManager) {
		const entityBounds = this.getEntityBounds(entity, assetManager);

		const collision = obstacleManager.getObstacles().find((obstacle) => {
			const obstacleAsset    = assetManager.getAsset(obstacle.getAssetName());
			const obstaclePosition = obstacle.getPosition();
			const obstacleBounds   = new Rect(
				obstaclePosition.x - obstacleAsset.width / 2,
				obstaclePosition.y - obstacleAsset.height / 2,
				obstaclePosition.x + obstacleAsset.width / 2,
				obstaclePosition.y
			);

			return intersectTwoRects(entityBounds, obstacleBounds);
		});

		if (collision) {
			entity.collide(collision);
		}
	}

	checkIfSkierHitRhino(skier, rhino, assetManager) {
		const skierBounds = this.getEntityBounds(skier, assetManager);
		const rhinoBounds = this.getEntityBounds(rhino, assetManager);

		const collision = intersectTwoRects(skierBounds, rhinoBounds);

		if (collision) {
			rhino.collide(skier);
			skier.collide(rhino);
		}
	}

}