import { Tank } from "./Tank";
import { instance } from "../main";

export class GameController {

	constructor() {
		this.assetLoader = instance.AssetLoader();
		this.createAssetList();
	}

	createAssetList() {
		this.assetLoader.addAsset({ key: 'tankBase', url: './assets/TankBase.png' });
		this.assetLoader.addAsset({ key: 'tankGun', url: './assets/TankGun.png' });
		this.assetLoader.addAsset({ key: 'bullet', url: './assets/Bullet.png' });

		this.assetLoader.load().then(() => {
			this.createComponents();
		});
	}

	createComponents() {
		this.tank = new Tank();
	}

}