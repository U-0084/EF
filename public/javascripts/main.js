enchant();


const screen_width = 640;
const screen_height = 290;

const player02_width = 80;
const player02_height = 80;

const player01_image = '../images/player01.gif'
const player02_image = '../images/player02.gif';
const bg_battle_image01 = '../images/bg_battle01.jpg';

const assets = [
	player01_image,
	player02_image,
	bg_battle_image01
];


window.onload = () => {

	if (window.GamepadEvent) {
		window.addEventListener('gamepadconnected', e => {
			console.log("ゲームパッドが接続されました。");
			console.log(e.gamepad);
		});
	}

	const gamepad = navigator.getGamepads && navigator.getGamepads()[0];


	function errorLog() {
		console.log("Fail!");
		console.log(XMLHttpRequest.status);
		console.log(textStatus);
	}


	const game = new Game(screen_width, screen_height);
	game.preload(assets);
	game.fps = 20;
	game.keybind(32, 'space');
	game.onload = () => {

		const root = game.rootScene;
		const input = game.input;
		const player_speed = 15;

		const LifeP1 = new Entity();
		LifeP1.width = screen_width / 2 - 10;
		LifeP1.height = 20;
		LifeP1.x = 10;
		LifeP1.y = 10;
		LifeP1.backgroundColor = '#27e4b2';

		const LifeP2 = new Entity();
		LifeP2.width = -screen_width / 2 + 10;
		LifeP2.height = 20;
		LifeP2.x = screen_width - 10;
		LifeP2.y = 10;
		LifeP2.backgroundColor = '#27e4b2';

		const Player01 = Class.create(Sprite, {
			initialize: function(x, y) {
				Sprite.call(this, 64, 64);
				this.image = game.assets[player01_image];
				let p01_image = this.image;
				this.scaleX = -1;
				this.x = x;
				this.y = y;
				this.frame = 0;
				this.on('enterframe', () => {
					this.frame = this.direction * 3 + this.walk;
					this.scaleX = -1;
					if (input.up) {
						// gravity = -10.0;
						// jump = true;
					}
					if (input.right) {
						this.x += player_speed;
						this.frame = this.age % 2 + 2;
					}
					if (input.down) {
						this.frame = 8;
					}
					if (input.left) {
						this.scaleX = 1;
						this.x -= player_speed;
						this.frame = this.age % 2 + 2;
					}

					let [left, right] = [0, 0];
					let [top, bottom] = [screen_width - this.width, screen_height - this.height];
				});
			}
		});

		const Player02 = Class.create(Sprite, {
			initialize: function(x, y) {
				Sprite.call(this, 64, 64);
				this.image = game.assets[player02_image];
				let p01_image = this.image;
				this.x = x;
				this.y = y;
				this.scaleX = 1;
				this.frame = 0;
				this.on('enterframe', () => {
					this.frame = this.direction * 3 + this.walk;
					if (input.up) {
						// gravity = -10.0;
						// jump = true;
					}
					// if (input.right) {
					// 	this.x += player_speed;
					// 	this.frame = this.age % 2 + 2;
					// }
					// if (input.down) {
					// 	this.frame = 8;
					// }
					// if (input.left) {
					// 	this.scaleX = 1;
					// 	this.x -= player_speed;
					// 	this.frame = this.age % 2 + 2;
					// }

					let [left, right] = [0, 0];
					let [top, bottom] = [screen_width - this.width, screen_height - this.height];
				});
			}
		});

			// let gravity = 1.0;
			// let jump = false;
			// let preY = 220;
			// let preInput = false;
			// let tempty = player01.y;

			// player01.action = 'stop';
			// if (input.up) {
			// 	gravity = -10.0;
			// 	jump = true;
			// }
			// if (input.right) {
			// 	player01.x += player_speed;
			// 	player01.action = 'run';
			// }
			// if (input.down) {
			// 	player01.action = 'dead';
			// }
			// if (input.left) {
			// 	player01.x -= player_speed;
			// 	player01.action = 'run';
			// }

			// player01.y += (player01.y - preY) + gravity;
			// if (player01.y > 220) {
			// 	player01.y = 220;
			// 	jump = false;
			// }

			// preY = tempty;
			// preInput = input.up;
		function battleScene() {
			let scene = new Scene();
			let bg = new Sprite(screen_width, screen_height);
			bg.image = game.assets[bg_battle_image01];
			bg.x = 0;
			bg.y = 0;
			root.addChild(bg);

			root.addChild(LifeP1);
			root.addChild(LifeP2);

			const player01 = new Player01(screen_width / 5, 220);
			root.addChild(player01);

			const player02 = new Player02(screen_width / 1.5, 220);
			root.addChild(player02);

			if (player01.x > player02.x) {
				player01.scaleX = 1;
			}

			var hoge = new Avatar('1:5:0:2064:21580:2214');
			console.log(hoge);

			return scene;
		}
		game.rootScene.on('enterframe', (topScene) => {

			function topScene() {
				let scene = new Scene();
				let bg = new Sprite(screen_width, screen_height);

				return scene;
			}

			topScene();

			if (game.input.space) {
				battleScene();
			}
		});
	};
	game.start();
};