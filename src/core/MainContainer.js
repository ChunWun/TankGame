import * as PIXI from "pixi.js";

export class MainContainer {
	constructor() {
		this._container = new PIXI.Container();
	}

	addComponent(container) {
		this._container.addChild(container);
	}

	removeComponent(container) {
		this._container.removeChild(container);
	}
}