import * as PIXI from "pixi.js";
import { Component } from "../core/Component";
import { Bullet } from "./Bullet";


export class Tank extends Component {
	tank;
	gun;
	firetargetPoint = { x: 0, y: -100 };
	targetDistance = 10;
	colorNum = 0;
	colorType = [0xFFFFFF, 0x77FFEE, 0xFFFF00];

	tankRotateNum = 0;
	gunRotateNum = 180;

	constructor() {
		super();
		this.tankContainer = new PIXI.Container();
		this.tankContainer.name = 'Tank';
		this.createTank();
	}

	addListener() {
		document.addEventListener("click", this.fireEvent.bind(this));
		document.addEventListener("keydown", this.keyboardEvent.bind(this));
	}

	createTank() {
		this.tank = new PIXI.Sprite.from('tankBase');
		this.tank.position.set(400, 300);
		this.tank.scale.set(0.1, 0.1);
		this.tank.anchor.set(0.5, 0.5);
		this.tank.rotation = this.tankRotateNum * (Math.PI / 180);
		this.tank.tint = this.colorType[this.colorNum];
		this.tankContainer.addChild(this.tank);

		this.gun = new PIXI.Sprite.from('tankGun');
		this.gun.position.set(0, 0);
		this.gun.scale.set(1, 1);
		this.gun.anchor.set(0.5, 0.5);
		this.gun.rotation = this.gunRotateNum * (Math.PI / 180);
		this.gun.tint = this.colorType[this.colorNum];
		this.tank.addChild(this.gun);

		this.container.addComponent(this.tankContainer);
	}

	keyboardEvent(e) {
		switch (e.key) {
			case "q":
			case "e":
				this.gunRotate(e.key);
				break;
			case "w":
			case "s":
			case "a":
			case "d":
				this.tankMove(e.key);
				break;
			case "c":
				this.changeColor();
				break;

		}
	}

	fireEvent() {
		const bullet = new Bullet(
			{ x: this.tank.position.x, y: this.tank.position.y },
			{ x: this.firetargetPoint.x, y: this.firetargetPoint.y }
		);
		bullet.fire();

	}

	gunRotate(key) {
		let num = (key == "q") ? -3 : 3;
		this.gunRotateNum += num;
		this.gun.rotation = this.gunRotateNum * (Math.PI / 180);
	}

	tankMove(key) {
		switch (key) {
			case "w":
			case "s":
				const rad = this.tankRotateNum * (Math.PI / 180);
				let endPointX = this.targetDistance * Math.sin(rad);
				let endPointY = this.targetDistance * Math.cos(rad);

				if (this.tankRotateNum <= 90 && this.tankRotateNum >= 0) {
					endPointX = (key == "w") ? endPointX : -endPointX;
					endPointY = (key == "w") ? -endPointY : endPointY;
				} else if (this.tankRotateNum <= 180 && this.tankRotateNum > 90) {
					endPointX = (key == "w") ? endPointX : -endPointX;
					endPointY = (key == "w") ? -endPointY : endPointY;
				} else if (this.tankRotateNum <= 270 && this.tankRotateNum > 180) {
					endPointX = (key == "w") ? -endPointX : endPointX;
					endPointY = (key == "w") ? endPointY : -endPointY;
				} else {
					endPointX = (key == "w") ? endPointX : -endPointX;
					endPointY = (key == "w") ? -endPointY : endPointY;
				}

				this.tank.position.x += endPointX;
				this.tank.position.y += endPointY;

				break;
			case "a":
			case "d":
				let rotateNum = (key == "a") ? -3 : 3;
				this.tankRotateNum += rotateNum;
				this.tankRotateNum = (this.tankRotateNum >= 360) ? 0 : this.tankRotateNum;
				this.tank.rotation = this.tankRotateNum * (Math.PI / 180);

				const tankRad = this.tankRotateNum * (Math.PI / 180);
				let targetPointX = 100 * Math.sin(tankRad);
				let targetPointY = 100 * Math.cos(tankRad);

				if (this.tankRotateNum <= 90 && this.tankRotateNum >= 0) {
					targetPointY = (key == "w") ? -targetPointY : targetPointY;
				} else if (this.tankRotateNum <= 180 && this.tankRotateNum > 90) {
					targetPointY = (key == "w") ? -targetPointY : targetPointY;
				} else if (this.tankRotateNum <= 270 && this.tankRotateNum > 180) {
					targetPointX = (key == "w") ? -targetPointX : targetPointX;
				} else {
					targetPointY = (key == "w") ? -targetPointY : targetPointY;
				}
				this.firetargetPoint.x = targetPointX;
				this.firetargetPoint.y = targetPointY;
				break;

		}
	}

	changeColor() {
		if (this.colorNum < this.colorType.length - 1) {
			this.colorNum++
		} else {
			this.colorNum = 0;
		}

		this.tank.tint = this.colorType[this.colorNum];
	}
}