export class AssetManager {
	loadedAssets = [];

	constructor() {
	}

	async loadAssets(assets) {
		const assetPromises = [];

		for (const [assetName, assetContent] of Object.entries(assets)) {
			this.loadedAssets[assetName] = [];
			if (!Array.isArray(assetContent)) {
				assetPromises.push(
					this.loadGroupedAsset(assetContent, assetName)
				);
			} else {
				for (var i = 0; i < assetContent.length; i++) {
					assetPromises.push(
						this.loadGroupedAsset(assetContent[i], assetName)
					);
				}
			}
		}

		await Promise.all(assetPromises);
	}

	loadGroupedAsset(assetUrl, assetName) {
		return new Promise((resolve) => {
			const assetImage  = new Image();
			assetImage.onload = () => {
				assetImage.width /= 2;
				assetImage.height /= 2;

				this.loadedAssets[assetName].push(assetImage);
				resolve();
			};
			assetImage.src    = assetUrl;
		});
	}

	getAssets(assetName) {
		return this.loadedAssets[assetName];
	}

	getAsset(assetName, id = 0) {
		return this.loadedAssets[assetName][id];
	}
}