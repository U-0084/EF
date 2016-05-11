enchant();


const screen_width = 640;
const screen_height = 290;

const player02_width = 80;
const player02_height = 80;

const player02_image = '../images/bigmonster2.gif';
const bg_battle_image01 = '../images/bg_battle01.jpg';

const assets = [
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


	let game = new Game(screen_width, screen_height);
	game.preload(assets);
	game.fps = 30;
	game.onload = () => {

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


		const Player02 = Class.create(Sprite, {
			initialize: function(x, y) {
				Sprite.call(this, 160, 160);
				this.image = game.assets[player02_image];
				this.x = x;
				this.y = y;
				this.frame = 2;
				this.on('enterframe', function() {
					const input = game.input;
					const player_speed = 15;
					let [vx, vy] = [0, 0];
					if (gamepad) {
						if (gamepad.axes[0] < -0.5) {
							this.x -= player_speed;
							this.frame = this.age % 3 + 9;
						}
						if (gamepad.axes[0] > 0.5) {
							this.x += player_speed;
							this.frame = this.age % 3 + 18;
						}
						if (gamepad.axes[1] < -0.5) {
							this.y -= player_speed;
							this.frame = this.age % 3 + 27;
						}
						if (gamepad.axes[1] > 0.5) {
							this.y += player_speed;
							this.frame = this.age % 3;
						}
					}
					if (input.left) {
						this.x -= player_speed;
						this.frame = this.age % 2 + 3;
					}
					if (input.right) {
						this.x += player_speed;
						this.frame = this.age % 2 + 18;
					}
					if (input.up) {
						this.y -= player_speed;
						this.frame = this.age % 3 + 27;
					}
					if (input.down) {
						this.y += player_speed;
						this.frame = this.age % 3;
					}
					// 斜めの移動補正
					if (vx !== 0 && vy !== 0) {
						var length = Math.sqrt(vx*vx + vy*vy);
						vx /= length;
						vy /= length;
						vx *= player_speed;
						vy *= player_speed;
					}
				});
			}
		})

		game.rootScene.on('enterframe', (battleScene) => {

			function topScene() {
				const scene = new Scene();
				const bg = new Sprite(screen_width, screen_height);
			}


			function battleScene() {
				const scene = new Scene();
				const bg = new Sprite(screen_width, screen_height);
				bg.image = game.assets[bg_battle_image01];
				bg.x = 0;
				bg.y = 0;
				game.rootScene.addChild(bg);


				const lifeGaugeGroup = new Group();
				lifeGaugeGroup.addChild(LifeP1);
				lifeGaugeGroup.addChild(LifeP2);
				game.rootScene.addChild(lifeGaugeGroup);

				const player02 = new Player02(screen_width / 1.5, 130);
				game.rootScene.addChild(player02);

				return scene;
			}

			if (game.input.up) {
				battleScene();
			}
		});
	};
	game.start();
};