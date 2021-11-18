import * as PIXI from "pixi.js";

class AssetLoader {

	constructor() {
		this.loader = PIXI.Loader.shared;
		this.assetArray = []
	}

	addAsset(obj) {
		this.assetArray.push(obj);
	}

	load() {
		return new Promise((resolve) => {
			this.assetArray.forEach(asset => {
				this.loader.add(asset);
			})
			this.loader.onComplete.add(() => {
				resolve();
			});
			this.loader.load();

		});

	}

}

export default AssetLoader;