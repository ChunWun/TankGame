import * as PIXI from "pixi.js";
import { Component } from "../core/Component";
import { Tween } from "@tweenjs/tween.js";

export class Bullet extends Component {
	constructor(startPoint, targetPoint) {
		super();
		this.startPoint = startPoint;
		this.direction;
		this.targetPoint = targetPoint;
		this.bulletContainer = new PIXI.Container();
		this.bulletContainer.name = 'Bullet';
		this.createBullet();

	}

	createBullet() {
		this.bullet = new PIXI.Sprite.from('bullet');
		this.bulletContainer.addChild(this.bullet);
		this.bullet.position.set(this.startPoint.x, this.startPoint.y);
		this.bullet.scale.set(0.1, 0.1);
		this.container.addComponent(this.bulletContainer);
	}

	fire() {

		console.error(this.bullet.position);
		console.error({ x: this.targetPoint.x, y: this.targetPoint.y });

		const fireTween = new Tween(this.bullet)
		fireTween.to({ x: this.targetPoint.x, y: this.targetPoint.y }, 500);
		fireTween.start();
	}

}