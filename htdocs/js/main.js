enchant();


const screen_width = 960;
const screen_height = 450;

const player02_width = 80;
const player02_height = 80;

const player02_image = '../images/bigmonster2.gif';

const assets = [
	player02_image
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

	function battleScene() {
		let scene = new Scene();
		return scene;
	}


	let game = new Game(screen_width, screen_height);
	game.preload(assets);
	game.keybind(32, ' space');
	game.fps = 30;
	game.onload = () => {

		let LifeP1 = new Entity();
		LifeP1.width = screen_width / 2 - 10;
		LifeP1.height = 30;
		LifeP1.x = 10;
		LifeP1.y = 10;
		LifeP1.backgroundColor = '#27e4b2';

		let LifeP2 = new Entity();
		LifeP2.width = -screen_width / 2 + 10;
		LifeP2.height = 30;
		LifeP2.x = screen_width - 10;
		LifeP2.y = 10;
		LifeP2.backgroundColor = '#27e4b2';


		let Player = Class.create(Sprite, {
			initialize: (x, y) => {
				Sprite.call(this, player02_width, player02_height);
				this.image = game.assets[player02_image];
				this.x = x;
				this.y = y;
				this.frame = 3;
			}
		});

		let battleScene = game.currentScene;
		game.rootScene.on('enterframe', (battleScene) => {
			let lifeGaugeGroup = new Group();
			lifeGaugeGroup.addChild(LifeP1);
			lifeGaugeGroup.addChild(LifeP2);

			game.rootScene.addChild(lifeGaugeGroup);
		});
	};
	game.start();
};