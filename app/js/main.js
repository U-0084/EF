'use strict';

enchant();

var screen_width = 960;
var screen_height = 450;

var player02_width = 80;
var player02_height = 80;

var player02_image = '../images/bigmonster2.gif';

var assets = [player02_image];

window.onload = function () {

	if (window.GamepadEvent) {
		window.addEventListener('gamepadconnected', function (e) {
			console.log("ゲームパッドが接続されました。");
			console.log(e.gamepad);
		});
	}

	var gamepad = navigator.getGamepads && navigator.getGamepads()[0];

	function errorLog() {
		console.log("Fail!");
		console.log(XMLHttpRequest.status);
		console.log(textStatus);
	}

	function battleScene() {
		var scene = new Scene();
		return scene;
	}

	var game = new Game(screen_width, screen_height);
	game.preload(assets);
	game.keybind(32, ' space');
	game.fps = 30;
	game.onload = function () {

		var LifeP1 = new Entity();
		LifeP1.width = screen_width / 2 - 10;
		LifeP1.height = 20;
		LifeP1.x = 10;
		LifeP1.y = 10;
		LifeP1.backgroundColor = '#27e4b2';

		var LifeP2 = new Entity();
		LifeP2.width = -screen_width / 2 + 10;
		LifeP2.height = 20;
		LifeP2.x = screen_width - 10;
		LifeP2.y = 10;
		LifeP2.backgroundColor = '#27e4b2';

		var Player02 = Class.create(Sprite, {
			initialize: function initialize(x, y) {
				Sprite.call(undefined, player02_width, player02_height);
				undefined.image = game.assets[player02_image];
				undefined.x = x;
				undefined.y = y;
				undefined.frame = 3;
			}
		});

		var battleScene = game.currentScene;
		game.rootScene.on('enterframe', function (battleScene) {
			var lifeGaugeGroup = new Group();
			lifeGaugeGroup.addChild(LifeP1);
			lifeGaugeGroup.addChild(LifeP2);

			game.rootScene.addChild(lifeGaugeGroup);

			var player02 = new Player02(screen_width / 2, screen_height / 2);
		});
	};
	game.start();
};