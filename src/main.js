import * as PIXI from "pixi.js";
import { InstanceManager } from "./core/InstanceManager";
import { GameController } from "./game/GameController";


export const instance = new InstanceManager();

window.onload = () => {
	const app = new PIXI.Application();
	document.body.appendChild(app.view);
	const game = new GameController();
	app.resize({ width: 640, height: 360 });
	app.stage.addChild(instance.Container()._container);

}