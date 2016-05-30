const serviceName = 'Enginner Fighter';
const thisServer = 'http://localhost:3000/';
const socket = io.connect(thisServer);


const screen_width = 640;
const screen_height = 290;
const player02_width = 80;
const player02_height = 80;
const player01_image = thisServer + 'images/player01.gif';
const player02_image = thisServer + 'images/player02.gif';
const bg_battle_image01 = thisServer + 'images/bg_battle01.jpg';


const assets = [
	player01_image,
	player02_image,
	bg_battle_image01
];

// const name = window.prompt('ユーザー名を入力してください');

let player01;

const playerInfo = {
	id: '',
	loginName: 'イギー',
	x: screen_width / 5,
	y: 220,
	nameX: 0,
	nameY: 0,
	frame: 0,
	settingFile: `${thisServer}data/player01.json`,
	img: `${thisServer}images/main.png`,
	move: function(keyCode) {
		let jump = document.createElement('Event');
		let canvas = document.createElement('canvas');
		jump.initEvent('keydown', true, true);
		jump.keyCode = keyCode;
		canvas.dispatchEvent(jump);
	}
};
console.log(playerInfo);


const player = null;
const otherPlayers = {};


// 繋がった時の処理
socket.on('connect', () => {

	Push.create('Enginner Fighter', {
		body: `${playerInfo.loginName}がログインしました。`,
		icon: {
			x32: `${playerInfo.img}`
		},
		timeout: 3000
	});

	playerInfo.id = socket.id;

	socket.emit('name', playerInfo);
});


enchant();


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


		socket.on('name', otherPlayerInfo => {

			let id = otherPlayerInfo.id;
			const otherPlayer = otherPlayers[id] = new Sprite(64, 64);
			otherPlayer.id = id;
			otherPlayer.x = 0;
			otherPlayer.y = 0;


			otherPlayer.setPosition = pos => {
				otherPlayer.x = pos.x;
				otherPlayer.y = pos.y;
				otherPlayer.frame = pos.frame;
			}
			otherPlayer.setPosition.bind(otherPlayerInfo);


			// player01のジャンプ
			socket.on('pushUp01:' + id, pos => {
				player01.x = pos.x;
				player01.y = pos.y;
				player01.frame = pos.frame;
				// console.log(`y: ${player01.y}, frame: ${player01.frame}`);
			});


			// player01の右移動
			socket.on('pushRight01:' + id, pos => {
				// let move = document.createEvent('Event');
				// move.initEvent('keydown', true, true);
				// move.keyCode = 39;
				// document.dispatchEvent(move);
				// console.log(player01);
				// console.log(window);

				player01.x = pos.x;
				player01.y = pos.y;
				player01.frame = pos.frame;

				console.log(`x: ${player01.x}, frame: ${player01.frame}`);
				console.log(player01.frame);
			});


			// player01のかがみ
			socket.on('pushDown01:' + id, pos => {
				player01.x = pos.x;
				player01.y = pos.y;
				player01.frame = pos.frame;

				// console.log(`y: ${player01.y}, frame: ${player01.frame}`);
			});

　
			// player01の左移動
			socket.on('pushLeft01:' + id, pos => {
				// let move = document.createEvent('Event');
				// move.initEvent('keydown', true, true);
				// move.keyCode = 38;
				// document.dispatchEvent(move);

				player01.x = pos.x;
				player01.y = pos.y;
				player01.frame = pos.frame;

				console.log(`x: ${player01.x}, frame: ${player01.frame}`);
			});
		});


		const Player01 = Class.create(Sprite, {
			initialize: function(playerInfo) {
				let ground = 220;
				let preInput = false;
				let jump = false;

				Sprite.call(this, 64, 64);
				this.playerInfo = playerInfo;
				this.setSettingFile(playerInfo.settingFile);
				this.image = game.assets[player01_image];
				this.scaleX = -1;
				this.x = this.playerInfo.x;
				this.y = this.playerInfo.y;
				// 名前
				this.loginName = new Label(this.playerInfo.loginName);
				this.loginName.width = 100;
				this.loginName.color = 'black';
				this.loginName.x = this.x + 10;
				this.loginName.y = this.y - 15;
				this.frame = this.playerInfo.frame;
				this.on('enterframe', () => {
					if (playerInfo.id) {
						let tempy = this.y;
						let gravity = 1.0;

						this.frame = 0;
						this.scaleX = -1;

						if (input.up && !preInput && !jump) {
						  gravity = -12.0;
						  jump = true;

						  this.loginName.y = this.y - 15;

						  socket.emit('pushUp01', {
						  	x: this.x,
						  	y: this.y,
						  	frame: this.frame
						  });
						}
						if (input.right) {
							this.x += player_speed;
							this.loginName.x += player_speed;
							this.frame = this.age % 3 + 1;
							socket.emit('pushRight01', {
								x: this.x,
								y: this.y,
								frame: this.frame
							});
						}

						if (input.down) {
							this.frame = 8;
							socket.emit('pushDown01', {
								x: this.x,
								y: this.y,
								frame: this.frame
							});
						}

						if (input.left) {
							this.scaleX = 1;
							this.x -= player_speed;
							this.loginName.x -= player_speed;
							this.frame = this.age % 3 + 1;
							socket.emit('pushLeft01', {
								x: this.x,
								y: this.y,
								frame: this.frame
							});
						}

						this.y += (this.y - ground) + gravity;

						if (this.y > 220) {
							this.y = 220;
							jump = false;
						}

						ground = tempy;
						preInput = input.up;
					}


					let [left, top] = [0, 0];
					let [right, bottom] = [screen_width - this.width, screen_height - this.heigh];

					if (this.x < left || this.loginName.x < left) {
						this.x = left;
						this.loginName.x = left;
					} else if (this.x > right || this.loginName.x > right) {
						this.x = right;
						this.loginName.x = right;
					}
					if (this.y < top || this.loginName.y < top) {
						this.y = top;
						this.loginName.y = top;
					} else if (this.y > bottom || this.loginName.y > bottom) {
						this.y = bottom;
						this.loginName.y = bottom;
					}
				});

				return this;
			},
			setSettingFile: function(settingFile) {
				this.settingFile = settingFile;
				let core = enchant.Core.instance;
				if (core.assets[this.settingFile]) {
					this.setSetting(core.assets[this.settingFile]);
				}
			},
			setSetting: function(setting) {
				let info = JSON.parse(setting);

				this.width = info.width;
				this.height = info.height;
				this.x = info.x;
				this.y = info.y;
				console.log(this.x);
				this.setImage(info.image);
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

			root.addChild(bg);
			root.addChild(LifeP1);
			root.addChild(LifeP2);

			player01 = new Player01(playerInfo);
			root.addChild(player01);
			root.addChild(player01.loginName);

			const player02 = new Player02(screen_width / 1.5, 220);
			root.addChild(player02);

			const player03 = new Player03(screen_width / 2, 100);

			if (player01.x > player02.x) {
				player01.scaleX = 1;
				console.log(player01);
			}
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