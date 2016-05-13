'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

enchant();

var screen_width = 640;
var screen_height = 290;

var player02_width = 80;
var player02_height = 80;

var player02_image = '../images/bigmonster2.gif';
var bg_battle_image01 = '../images/bg_battle01.jpg';

var assets = [player02_image, bg_battle_image01];

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

	var game = new Game(screen_width, screen_height);
	game.preload(assets);
	game.fps = 15;
	game.keybind(32, 'space');
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

		var Player01 = function () {
			_createClass(Player01, [{
				key: 'initialize',
				value: function initialize() {
					var player01 = new Avatar("2:2:1:2004:21230:22480");
					game.rootScene.addChild(player01);
					player01.x = screen_width / 3;
					player01.y = 220;
				}
			}]);

			function Player01(attack) {
				_classCallCheck(this, Player01);

				this.action = 'attack';
			}

			return Player01;
		}();

		game.rootScene.on('enterframe', function (topScene) {

			var rootScene = game.rootScene;

			function topScene() {
				var scene = new Scene();
				var bg = new Sprite(screen_width, screen_height);

				return scene;
			}

			function battleScene() {
				var scene = new Scene();
				var bg = new Sprite(screen_width, screen_height);
				bg.image = game.assets[bg_battle_image01];
				bg.x = 0;
				bg.y = 0;
				rootScene.addChild(bg);

				var lifeGaugeGroup = new Group();
				lifeGaugeGroup.addChild(LifeP1);
				lifeGaugeGroup.addChild(LifeP2);
				rootScene.addChild(lifeGaugeGroup);

				// rootScene.addChild(player01);

				// const player02 = new Player02(screen_width / 1.5, 130);
				// rootScene.addChild(player02);

				// if (player01.x > player02.x) {
				// 	player01.left();
				// } else {
				// 	player01.right();
				// }

				var player01 = new Player01();
				player01.initialize();

				console.log(player01.initialize);

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

// player01.x = screen_width / 3;
// player01.y = 220;
// const player_speed = 30;
// if (game.input.left) {
// 	player01.x -= player_speed;
// 	player01.action = 'attack';
// }
// if (game.input.right) {
// 	player01.x += player_speed;
// }
// if (game.input.up) {
// 	player01.y -= player_speed;
// }
// if (game.input.down) {
// 	player01.y += player_speed;
// }

// const Player02 = Class.create(Sprite, {
// 	initialize: function(x, y) {
// 		Sprite.call(this, 160, 160);
// 		this.image = game.assets[player02_image];
// 		this.x = x;
// 		this.y = y;
// 		this.frame = 3;
// 	},
// 	onenterframe: function() {
// 		const player_speed = 30;
// 		const [top, left] = [0, 0];
// 		const [right, bottom] = [screen_width - this.width, screen_height - this.height];

// 		if (gamepad) {
// 			if (gamepad.axes[0] < -0.5) {
// 				this.x -= player_speed;
// 				this.frame = this.age % 3 + 9;
// 			}
// 			if (gamepad.axes[0] > 0.5) {
// 				this.x += player_speed;
// 				this.frame = this.age % 3 + 18;
// 			}
// 			if (gamepad.axes[1] < -0.5) {
// 				this.y -= player_speed;
// 				this.frame = this.age % 3 + 27;
// 			}
// 			if (gamepad.axes[1] > 0.5) {
// 				this.y += player_speed;
// 				this.frame = this.age % 3;
// 			}
// 		}
// 		if (input.left) {
// 			this.x -= player_speed;
// 			this.frame = this.age % 3 + 2;
// 		}
// 		if (input.right) {
// 			this.x += player_speed;
// 			this.frame = this.age % 3 + 2;
// 		}
// 		if (input.up) {
// 			this.y -= player_speed;
// 			this.frame = this.age % 3 + 27;
// 		}
// 		if (input.down) {
// 			this.y += player_speed;
// 			this.frame = 7;
// 		}

// 		if (this.x < left) {
// 			this.x = left;
// 		} else if (this.x > right) {
// 			this.x = right;
// 		}
// 		if (this.y < top) {
// 			this.y = top;
// 		} else if (this.y > bottom) {
// 			this.y = bottom;
// 		}
// 	},
// 	attack: function() {

// 	}
// });