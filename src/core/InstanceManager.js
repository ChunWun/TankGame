import AssetLoader from "./AssetLoader";
import { MainContainer } from "./MainContainer";

export class InstanceManager {

	constructor() {
		this.container = new MainContainer();
		this.assetLoader = new AssetLoader();
	}

	Container() {
		if (this.container) {
			return this.container;
		}
	}

	AssetLoader() {
		if (this.assetLoader) {
			return this.assetLoader;
		}
	}
}