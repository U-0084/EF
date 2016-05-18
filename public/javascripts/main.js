const socket = io.connect('http://localhost:3000');
name = window.prompt('ユーザー名を入力してください');

const playerInfo = {
	id: '',
	login_name: name
};
console.log(playerInfo);

const player = null;
const otherPlayer =  {};

socket.on('connect', () => {
	playerInfo.id = socket.id;
	console.log(socket.id);
	if (player) {
		player.id = playerInfo.id;
		console.log(playerInfo.id);
	}
	socket.emit('name', playerInfo);
});

enchant();

const screen_width = 640;
const screen_height = 290;

const player02_width = 80;
const player02_height = 80;

const player01_image = 'http://localhost:3000/images/player01.gif';
const player02_image = 'http://localhost:3000/images/player02.gif';
const bg_battle_image01 = 'http://localhost:3000/images/bg_battle01.jpg';

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
	game.fps = 30;
	game.keybind(32, 'space');
	game.keybind(65, 'a');
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

		let scene = new Scene();
		let bg = new Sprite(screen_width, screen_height);
		bg.image = game.assets[bg_battle_image01];
		bg.x = 0;
		bg.y = 0;

		const Player01 = Class.create(Sprite, {
			initialize: function(x, y) {
				let ground = 220;
				let preInput = false;
				let jump = false;

				Sprite.call(this, 64, 64);
				this.image = game.assets[player01_image];
				this.scaleX = -1;
				this.x = x;
				this.y = y;
				this.frame = 0;
				this.on('enterframe', () => {
					let tempy = this.y;
					let gravity = 1.0;

					this.frame = 0;
					this.scaleX = -1;
					if(input.up && !preInput && !jump) {
					  gravity = -12.0;
					  jump = true;
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

					this.y += (this.y - ground) + gravity;

					if (this.y > 220) {
						this.y = 220;
						jump = false;
					}

					ground = tempy;
					preInput = input.up;


					let [left, top] = [0, 0];
					let [right, bottom] = [screen_width - this.width, screen_height - this.heigh];

					if (this.x < left) {
						this.x = left;
					} else if (this.x > right) {
						this.x = right;
					}
					if (this.y < top) {
						this.y = top;
					} else if (this.y > bottom) {
						this.y = bottom;
					}
				});
			},
			attack: function() {
				this.frame = this.age % 3 + 4;
				console.log(player01);
			}
		});

		const Attack01 = Class.create(Sprite, {
			initialize: function(x, y) {
				sprite.call(this, 64, 64);
				this.destroy = false;
				this.x = x;
				this.y = y;
				this.on('enterframe', () => {
					if (game.input.a) {
						Attack01Fuc();
					}
					console.log(Attack01);
				});
			}
		});

		class Player03 {
			constructor(x, y) {
				const player03_img = new Image();
				player03_img.src = 'http://localhost:3000/images/bigmonster2.gif';
				this.x = x;
				this.y = y;
				this.width = 254;
				this.height = 254;
				this.image = game.assets[player01_image];
				this.frame = 0;
			}
		}

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
				});
			}
		});

		function Attack01Fuc() {
			const attack01 = new Attack01();
			root.addChild(attack01);
			console.log(attack01);
		}

		function topScene() {
			let scene = new Scene();
			let bg = new Sprite(screen_width, screen_height);

			return scene;
		}


		function battleScene() {
			socket.emit('request', () => {
				root.addChild(bg);
				root.addChild(LifeP1);
				root.addChild(LifeP2);

				const player01 = new Player01(screen_width / 5, 220);
				root.addChild(player01);

				const player02 = new Player02(screen_width / 1.5, 220);
				root.addChild(player02);

				const player03 = new Player03(screen_width / 2, 100);
				console.log(player03);

				if (player01.x > player02.x) {
					player01.scaleX = 1;
					console.log(player01);
				}
			});

			return scene;
		}

		game.rootScene.on('enterframe', () => {

			topScene();

			if (game.input.space) {
				battleScene();
			}
		});
	};
	game.start();
};