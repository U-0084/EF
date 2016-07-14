(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _main = require('./main.js');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./main.js":2}],2:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var serviceName = 'Enginner Fighter',
    thisServer = 'http://localhost:3000/',
    socket = io.connect(thisServer);

var screen_width = 640;
var screen_height = 290;
var player02_width = 80;
var player02_height = 80;
var player01_image = thisServer + 'images/player01.gif';
var player02_image = thisServer + 'images/player02.gif';
var bg_battle_image01 = thisServer + 'images/bg_battle01.jpg';

var assets = [player01_image, player02_image, bg_battle_image01];

var player01 = void 0;

var playerInfo = {
	id: '',
	loginName: 'hoge',
	x: 128,
	y: 220,
	nameX: 0,
	nameY: 0,
	frame: 1
};

console.log(playerInfo);

var player = null;
var otherPlayers = {};

// 繋がった時の処理
socket.on('connect', function () {

	Push.create('Enginner Fighter', {
		body: playerInfo.loginName + 'がログインしました。',
		icon: {
			x32: '' + playerInfo.img
		},
		timeout: 3000
	});

	playerInfo.id = socket.id;

	socket.emit('name', playerInfo);
});

enchant();

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
	game.fps = 30;
	game.keybind(32, 'space');
	game.keybind(65, 'a');
	game.onload = function () {

		var root = game.rootScene;
		var input = game.input;
		var player_speed = 15;

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

		var scene = new Scene();
		var bg = new Sprite(screen_width, screen_height);
		bg.image = game.assets[bg_battle_image01];
		bg.x = 0;
		bg.y = 0;

		socket.on('name', function (otherPlayerInfo) {

			var id = otherPlayerInfo.id;
			var otherPlayer = otherPlayers[id] = new Sprite(64, 64);
			otherPlayer.id = id;
			otherPlayer.x = 0;
			otherPlayer.y = 0;

			otherPlayer.setPosition = function (pos) {
				otherPlayer.x = pos.x;
				otherPlayer.y = pos.y;
				otherPlayer.frame = pos.frame;
			};
			otherPlayer.setPosition.bind(otherPlayerInfo);

			// player01のジャンプ
			socket.on('pushUp01:' + id, function (pos) {
				console.log(id);
				player01.x = pos.x;
				player01.y = pos.y;
				player01.frame = pos.frame;
				// console.log(`y: ${player01.y}, frame: ${player01.frame}`);
			});

			// player01の右移動
			socket.on('pushRight01:' + id, function (pos) {
				// let move = document.createEvent('Event');
				// move.initEvent('keydown', true, true);
				// move.keyCode = 39;
				// document.dispatchEvent(move);
				// console.log(player01);
				// console.log(window);

				player01.x = pos.x;
				player01.y = pos.y;
				player01.frame = pos.frame;

				console.log('x: ' + player01.x + ', frame: ' + player01.frame);
				console.log(player01);
				console.log(player01.frame);
			});

			// player01のかがみ
			socket.on('pushDown01:' + id, function (pos) {
				player01.x = pos.x;
				player01.y = pos.y;
				player01.frame = pos.frame;

				// console.log(`y: ${player01.y}, frame: ${player01.frame}`);
			});

			// player01の左移動
			socket.on('pushLeft01:' + id, function (pos) {
				// let move = document.createEvent('Event');
				// move.initEvent('keydown', true, true);
				// move.keyCode = 38;
				// document.dispatchEvent(move);

				player01.x = pos.x;
				player01.y = pos.y;
				player01.frame = pos.frame;

				console.log('x: ' + player01.x + ', frame: ' + player01.frame);
			});
		});

		var Player01 = Class.create(Sprite, {
			initialize: function initialize(playerInfo) {
				var _this = this;

				var ground = 220;
				var preInput = false;
				var jump = false;

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
				this.on('enterframe', function () {
					if (playerInfo.id) {
						var tempy = _this.y;
						var gravity = 1.0;

						_this.frame = 0;
						_this.scaleX = -1;

						if (input.up && !preInput && !jump) {
							gravity = -12.0;
							jump = true;

							_this.loginName.y = _this.y - 15;

							socket.emit('pushUp01', {
								x: _this.x,
								y: _this.y,
								frame: _this.frame
							});
						}
						if (input.right) {
							_this.x += player_speed;
							_this.loginName.x += player_speed;
							_this.frame = _this.age % 3 + 1;
							socket.emit('pushRight01', {
								x: _this.x,
								y: _this.y,
								frame: _this.frame
							});
						}

						if (input.down) {
							_this.frame = 8;
							socket.emit('pushDown01', {
								x: _this.x,
								y: _this.y,
								frame: _this.frame
							});
						}

						if (input.left) {
							_this.scaleX = 1;
							_this.x -= player_speed;
							_this.loginName.x -= player_speed;
							_this.frame = _this.age % 3 + 1;
							socket.emit('pushLeft01', {
								x: _this.x,
								y: _this.y,
								frame: _this.frame
							});
						}

						_this.y += _this.y - ground + gravity;

						if (_this.y > 220) {
							_this.y = 220;
							jump = false;
						}

						ground = tempy;
						preInput = input.up;
					}

					var left = 0;
					var top = 0;
					var right = screen_width - _this.width;
					var bottom = screen_height - _this.heigh;


					if (_this.x < left || _this.loginName.x < left) {
						_this.x = left;
						_this.loginName.x = left;
					} else if (_this.x > right || _this.loginName.x > right) {
						_this.x = right;
						_this.loginName.x = right;
					}
					if (_this.y < top || _this.loginName.y < top) {
						_this.y = top;
						_this.loginName.y = top;
					} else if (_this.y > bottom || _this.loginName.y > bottom) {
						_this.y = bottom;
						_this.loginName.y = bottom;
					}
				});

				return this;
			},
			setSettingFile: function setSettingFile(settingFile) {
				this.settingFile = settingFile;
				var core = enchant.Core.instance;
				if (core.assets[this.settingFile]) {
					this.setSetting(core.assets[this.settingFile]);
				}
			},
			setSetting: function setSetting(setting) {
				var info = JSON.parse(setting);

				this.width = info.width;
				this.height = info.height;
				this.x = info.x;
				this.y = info.y;
				console.log(this.x);
				this.setImage(info.image);
			},
			attack: function attack() {
				this.frame = this.age % 3 + 4;
				console.log(player01);
			}
		});

		var Attack01 = Class.create(Sprite, {
			initialize: function initialize(x, y) {
				sprite.call(this, 64, 64);
				this.destroy = false;
				this.x = x;
				this.y = y;
				this.on('enterframe', function () {
					if (game.input.a) {
						Attack01Fuc();
					}
					console.log(Attack01);
				});
			}
		});

		var Player03 = function Player03(x, y) {
			_classCallCheck(this, Player03);

			var player03_img = new Image();
			player03_img.src = 'http://localhost:3000/images/bigmonster2.gif';
			this.x = x;
			this.y = y;
			this.width = 254;
			this.height = 254;
			this.image = game.assets[player01_image];
			this.frame = 0;
		};

		var Player02 = Class.create(Sprite, {
			initialize: function initialize(x, y) {
				var _this2 = this;

				Sprite.call(this, 64, 64);
				this.image = game.assets[player02_image];
				var p01_image = this.image;
				this.x = x;
				this.y = y;
				this.scaleX = 1;
				this.frame = 0;
				this.on('enterframe', function () {
					_this2.frame = _this2.direction * 3 + _this2.walk;
				});
			}
		});

		function Attack01Fuc() {
			var attack01 = new Attack01();
			root.addChild(attack01);
			console.log(attack01);
		}

		function topScene() {
			var scene = new Scene();
			var bg = new Sprite(screen_width, screen_height);

			return scene;
		}

		function battleScene() {

			root.addChild(bg);
			root.addChild(LifeP1);
			root.addChild(LifeP2);

			player01 = new Player01(playerInfo);
			root.addChild(player01);
			root.addChild(player01.loginName);

			var player02 = new Player02(screen_width / 1.5, 220);
			root.addChild(player02);

			var player03 = new Player03(screen_width / 2, 100);

			if (player01.x > player02.x) {
				player01.scaleX = 1;
				console.log(player01);
			}
			return scene;
		}

		game.rootScene.on('enterframe', function () {

			topScene();

			if (game.input.space) {
				battleScene();
			}
		});
	};
	game.start();
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvamF2YXNjcmlwdHMvYXBwLmpzIiwicHVibGljL2phdmFzY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBLElBQU0sY0FBYyxrQkFBcEI7SUFDTSxhQUFhLHdCQURuQjtJQUVNLFNBQVMsR0FBRyxPQUFILENBQVcsVUFBWCxDQUZmOztBQUlBLElBQU0sZUFBZSxHQUFyQjtBQUNBLElBQU0sZ0JBQWdCLEdBQXRCO0FBQ0EsSUFBTSxpQkFBaUIsRUFBdkI7QUFDQSxJQUFNLGtCQUFrQixFQUF4QjtBQUNBLElBQU0saUJBQWlCLGFBQWEscUJBQXBDO0FBQ0EsSUFBTSxpQkFBaUIsYUFBYSxxQkFBcEM7QUFDQSxJQUFNLG9CQUFvQixhQUFhLHdCQUF2Qzs7QUFHQSxJQUFNLFNBQVMsQ0FDZCxjQURjLEVBRWQsY0FGYyxFQUdkLGlCQUhjLENBQWY7O0FBTUEsSUFBSSxpQkFBSjs7QUFFQSxJQUFNLGFBQWE7QUFDbEIsS0FBSSxFQURjO0FBRWxCLFlBQVcsTUFGTztBQUdsQixJQUFHLEdBSGU7QUFJbEIsSUFBRyxHQUplO0FBS2xCLFFBQU8sQ0FMVztBQU1sQixRQUFPLENBTlc7QUFPbEIsUUFBTztBQVBXLENBQW5COztBQVVBLFFBQVEsR0FBUixDQUFZLFVBQVo7O0FBR0EsSUFBTSxTQUFTLElBQWY7QUFDQSxJQUFNLGVBQWUsRUFBckI7OztBQUdBLE9BQU8sRUFBUCxDQUFVLFNBQVYsRUFBcUIsWUFBTTs7QUFFMUIsTUFBSyxNQUFMLENBQVksa0JBQVosRUFBZ0M7QUFDL0IsUUFBUyxXQUFXLFNBQXBCLGVBRCtCO0FBRS9CLFFBQU07QUFDTCxhQUFRLFdBQVc7QUFEZCxHQUZ5QjtBQUsvQixXQUFTO0FBTHNCLEVBQWhDOztBQVFBLFlBQVcsRUFBWCxHQUFnQixPQUFP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QUFXLElBQUksUUFBSixDQUFhLFVBQWIsQ0FBWDtBQUNBLFFBQUssUUFBTCxDQUFjLFFBQWQ7QUFDQSxRQUFLLFFBQUwsQ0FBYyxTQUFTLFNBQXZCOztBQUVBLE9BQU0sV0FBVyxJQUFJLFFBQUosQ0FBYSxlQUFlLEdBQTVCLEVBQWlDLEdBQWpDLENBQWpCO0FBQ0EsUUFBSyxRQUFMLENBQWMsUUFBZDs7QUFFQSxPQUFNLFdBQVcsSUFBSSxRQUFKLENBQWEsZUFBZSxDQUE1QixFQUErQixHQUEvQixDQUFqQjs7QUFFQSxPQUFJLFNBQVMsQ0FBVCxHQUFhLFNBQVMsQ0FBMUIsRUFBNkI7QUFDNUIsYUFBUyxNQUFULEdBQWtCLENBQWxCO0FBQ0EsWUFBUSxHQUFSLENBQVksUUFBWjtBQUNBO0FBQ0QsVUFBTyxLQUFQO0FBQ0E7O0FBRUQsT0FBSyxTQUFMLENBQWUsRUFBZixDQUFrQixZQUFsQixFQUFnQyxZQUFNOztBQUVyQzs7QUFFQSxPQUFJLEtBQUssS0FBTCxDQUFXLEtBQWYsRUFBc0I7QUFDckI7QUFDQTtBQUNELEdBUEQ7QUFRQSxFQS9URDtBQWdVQSxNQUFLLEtBQUw7QUFDQSxDQTNWRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgbWFpbiBmcm9tICcuL21haW4uanMnOyIsImNvbnN0IHNlcnZpY2VOYW1lID0gJ0VuZ2lubmVyIEZpZ2h0ZXInLFxuICAgICAgdGhpc1NlcnZlciA9ICdodHRwOi8vbG9jYWxob3N0OjMwMDAvJyxcbiAgICAgIHNvY2tldCA9IGlvLmNvbm5lY3QodGhpc1NlcnZlcik7XG5cbmNvbnN0IHNjcmVlbl93aWR0aCA9IDY0MDtcbmNvbnN0IHNjcmVlbl9oZWlnaHQgPSAyOTA7XG5jb25zdCBwbGF5ZXIwMl93aWR0aCA9IDgwO1xuY29uc3QgcGxheWVyMDJfaGVpZ2h0ID0gODA7XG5jb25zdCBwbGF5ZXIwMV9pbWFnZSA9IHRoaXNTZXJ2ZXIgKyAnaW1hZ2VzL3BsYXllcjAxLmdpZic7XG5jb25zdCBwbGF5ZXIwMl9pbWFnZSA9IHRoaXNTZXJ2ZXIgKyAnaW1hZ2VzL3BsYXllcjAyLmdpZic7XG5jb25zdCBiZ19iYXR0bGVfaW1hZ2UwMSA9IHRoaXNTZXJ2ZXIgKyAnaW1hZ2VzL2JnX2JhdHRsZTAxLmpwZyc7XG5cblxuY29uc3QgYXNzZXRzID0gW1xuXHRwbGF5ZXIwMV9pbWFnZSxcblx0cGxheWVyMDJfaW1hZ2UsXG5cdGJnX2JhdHRsZV9pbWFnZTAxXG5dO1xuXG5sZXQgcGxheWVyMDE7XG5cbmNvbnN0IHBsYXllckluZm8gPSB7XG5cdGlkOiAnJyxcblx0bG9naW5OYW1lOiAnaG9nZScsXG5cdHg6IDEyOCxcblx0eTogMjIwLFxuXHRuYW1lWDogMCxcblx0bmFtZVk6IDAsXG5cdGZyYW1lOiAxXG59O1xuXG5jb25zb2xlLmxvZyhwbGF5ZXJJbmZvKTtcblxuXG5jb25zdCBwbGF5ZXIgPSBudWxsO1xuY29uc3Qgb3RoZXJQbGF5ZXJzID0ge307XG5cbi8vIOe5i+OBjOOBo+OBn+aZguOBruWHpueQhlxuc29ja2V0Lm9uKCdjb25uZWN0JywgKCkgPT4ge1xuXG5cdFB1c2guY3JlYXRlKCdFbmdpbm5lciBGaWdodGVyJywge1xuXHRcdGJvZHk6IGAke3BsYXllckluZm8ubG9naW5OYW1lfeOBjOODreOCsOOCpOODs+OBl+OBvuOBl+OBn+OAgmAsXG5cdFx0aWNvbjoge1xuXHRcdFx0eDMyOiBgJHtwbGF5ZXJJbmZvLmltZ31gXG5cdFx0fSxcblx0XHR0aW1lb3V0OiAzMDAwXG5cdH0pO1xuXG5cdHBsYXllckluZm8uaWQgPSBzb2NrZXQuaWQ7XG5cblx0c29ja2V0LmVtaXQoJ25hbWUnLCBwbGF5ZXJJbmZvKTtcbn0pO1xuXG5cblxuZW5jaGFudCgpO1xuXG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG5cblxuXHRpZiAod2luZG93LkdhbWVwYWRFdmVudCkge1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdnYW1lcGFkY29ubmVjdGVkJywgZSA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIuOCsuODvOODoOODkeODg+ODieOBjOaOpee2muOBleOCjOOBvuOBl+OBn+OAglwiKTtcblx0XHRcdGNvbnNvbGUubG9nKGUuZ2FtZXBhZCk7XG5cdFx0fSk7XG5cdH1cblxuXG5cdGNvbnN0IGdhbWVwYWQgPSBuYXZpZ2F0b3IuZ2V0R2FtZXBhZHMgJiYgbmF2aWdhdG9yLmdldEdhbWVwYWRzKClbMF07XG5cblxuXHRmdW5jdGlvbiBlcnJvckxvZygpIHtcblx0XHRjb25zb2xlLmxvZyhcIkZhaWwhXCIpO1xuXHRcdGNvbnNvbGUubG9nKFhNTEh0dHBSZXF1ZXN0LnN0YXR1cyk7XG5cdFx0Y29uc29sZS5sb2codGV4dFN0YXR1cyk7XG5cdH1cblxuXG5cdGNvbnN0IGdhbWUgPSBuZXcgR2FtZShzY3JlZW5fd2lkdGgsIHNjcmVlbl9oZWlnaHQpO1xuXHRnYW1lLnByZWxvYWQoYXNzZXRzKTtcblx0Z2FtZS5mcHMgPSAzMDtcblx0Z2FtZS5rZXliaW5kKDMyLCAnc3BhY2UnKTtcblx0Z2FtZS5rZXliaW5kKDY1LCAnYScpO1xuXHRnYW1lLm9ubG9hZCA9ICgpID0+IHtcblxuXG5cdFx0Y29uc3Qgcm9vdCA9IGdhbWUucm9vdFNjZW5lO1xuXHRcdGNvbnN0IGlucHV0ID0gZ2FtZS5pbnB1dDtcblx0XHRjb25zdCBwbGF5ZXJfc3BlZWQgPSAxNTtcblxuXG5cdFx0Y29uc3QgTGlmZVAxID0gbmV3IEVudGl0eSgpO1xuXHRcdExpZmVQMS53aWR0aCA9IHNjcmVlbl93aWR0aCAvIDIgLSAxMDtcblx0XHRMaWZlUDEuaGVpZ2h0ID0gMjA7XG5cdFx0TGlmZVAxLnggPSAxMDtcblx0XHRMaWZlUDEueSA9IDEwO1xuXHRcdExpZmVQMS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzI3ZTRiMic7XG5cblxuXHRcdGNvbnN0IExpZmVQMiA9IG5ldyBFbnRpdHkoKTtcblx0XHRMaWZlUDIud2lkdGggPSAtc2NyZWVuX3dpZHRoIC8gMiArIDEwO1xuXHRcdExpZmVQMi5oZWlnaHQgPSAyMDtcblx0XHRMaWZlUDIueCA9IHNjcmVlbl93aWR0aCAtIDEwO1xuXHRcdExpZmVQMi55ID0gMTA7XG5cdFx0TGlmZVAyLmJhY2tncm91bmRDb2xvciA9ICcjMjdlNGIyJztcblxuXG5cdFx0bGV0IHNjZW5lID0gbmV3IFNjZW5lKCk7XG5cdFx0bGV0IGJnID0gbmV3IFNwcml0ZShzY3JlZW5fd2lkdGgsIHNjcmVlbl9oZWlnaHQpO1xuXHRcdGJnLmltYWdlID0gZ2FtZS5hc3NldHNbYmdfYmF0dGxlX2ltYWdlMDFdO1xuXHRcdGJnLnggPSAwO1xuXHRcdGJnLnkgPSAwO1xuXG5cblx0XHRzb2NrZXQub24oJ25hbWUnLCBvdGhlclBsYXllckluZm8gPT4ge1xuXG5cdFx0XHRsZXQgaWQgPSBvdGhlclBsYXllckluZm8uaWQ7XG5cdFx0XHRjb25zdCBvdGhlclBsYXllciA9IG90aGVyUGxheWVyc1tpZF0gPSBuZXcgU3ByaXRlKDY0LCA2NCk7XG5cdFx0XHRvdGhlclBsYXllci5pZCA9IGlkO1xuXHRcdFx0b3RoZXJQbGF5ZXIueCA9IDA7XG5cdFx0XHRvdGhlclBsYXllci55ID0gMDtcblxuXG5cdFx0XHRvdGhlclBsYXllci5zZXRQb3NpdGlvbiA9IHBvcyA9PiB7XG5cdFx0XHRcdG90aGVyUGxheWVyLnggPSBwb3MueDtcblx0XHRcdFx0b3RoZXJQbGF5ZXIueSA9IHBvcy55O1xuXHRcdFx0XHRvdGhlclBsYXllci5mcmFtZSA9IHBvcy5mcmFtZTtcblx0XHRcdH1cblx0XHRcdG90aGVyUGxheWVyLnNldFBvc2l0aW9uLmJpbmQob3RoZXJQbGF5ZXJJbmZvKTtcblxuXG5cdFx0XHQvLyBwbGF5ZXIwMeOBruOCuOODo+ODs+ODl1xuXHRcdFx0c29ja2V0Lm9uKCdwdXNoVXAwMTonICsgaWQsIHBvcyA9PiB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGlkKTtcblx0XHRcdFx0cGxheWVyMDEueCA9IHBvcy54O1xuXHRcdFx0XHRwbGF5ZXIwMS55ID0gcG9zLnk7XG5cdFx0XHRcdHBsYXllcjAxLmZyYW1lID0gcG9zLmZyYW1lO1xuXHRcdFx0XHQvLyBjb25zb2xlLmxvZyhgeTogJHtwbGF5ZXIwMS55fSwgZnJhbWU6ICR7cGxheWVyMDEuZnJhbWV9YCk7XG5cdFx0XHR9KTtcblxuXG5cdFx0XHQvLyBwbGF5ZXIwMeOBruWPs+enu+WLlVxuXHRcdFx0c29ja2V0Lm9uKCdwdXNoUmlnaHQwMTonICsgaWQsIHBvcyA9PiB7XG5cdFx0XHRcdC8vIGxldCBtb3ZlID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG5cdFx0XHRcdC8vIG1vdmUuaW5pdEV2ZW50KCdrZXlkb3duJywgdHJ1ZSwgdHJ1ZSk7XG5cdFx0XHRcdC8vIG1vdmUua2V5Q29kZSA9IDM5O1xuXHRcdFx0XHQvLyBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG1vdmUpO1xuXHRcdFx0XHQvLyBjb25zb2xlLmxvZyhwbGF5ZXIwMSk7XG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKHdpbmRvdyk7XG5cblx0XHRcdFx0cGxheWVyMDEueCA9IHBvcy54O1xuXHRcdFx0XHRwbGF5ZXIwMS55ID0gcG9zLnk7XG5cdFx0XHRcdHBsYXllcjAxLmZyYW1lID0gcG9zLmZyYW1lO1xuXG5cdFx0XHRcdGNvbnNvbGUubG9nKGB4OiAke3BsYXllcjAxLnh9LCBmcmFtZTogJHtwbGF5ZXIwMS5mcmFtZX1gKTtcblx0XHRcdFx0Y29uc29sZS5sb2cocGxheWVyMDEpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhwbGF5ZXIwMS5mcmFtZSk7XG5cdFx0XHR9KTtcblxuXG5cdFx0XHQvLyBwbGF5ZXIwMeOBruOBi+OBjOOBv1xuXHRcdFx0c29ja2V0Lm9uKCdwdXNoRG93bjAxOicgKyBpZCwgcG9zID0+IHtcblx0XHRcdFx0cGxheWVyMDEueCA9IHBvcy54O1xuXHRcdFx0XHRwbGF5ZXIwMS55ID0gcG9zLnk7XG5cdFx0XHRcdHBsYXllcjAxLmZyYW1lID0gcG9zLmZyYW1lO1xuXG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKGB5OiAke3BsYXllcjAxLnl9LCBmcmFtZTogJHtwbGF5ZXIwMS5mcmFtZX1gKTtcblx0XHRcdH0pO1xuXG7jgIBcblx0XHRcdC8vIHBsYXllcjAx44Gu5bem56e75YuVXG5cdFx0XHRzb2NrZXQub24oJ3B1c2hMZWZ0MDE6JyArIGlkLCBwb3MgPT4ge1xuXHRcdFx0XHQvLyBsZXQgbW92ZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuXHRcdFx0XHQvLyBtb3ZlLmluaXRFdmVudCgna2V5ZG93bicsIHRydWUsIHRydWUpO1xuXHRcdFx0XHQvLyBtb3ZlLmtleUNvZGUgPSAzODtcblx0XHRcdFx0Ly8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChtb3ZlKTtcblxuXHRcdFx0XHRwbGF5ZXIwMS54ID0gcG9zLng7XG5cdFx0XHRcdHBsYXllcjAxLnkgPSBwb3MueTtcblx0XHRcdFx0cGxheWVyMDEuZnJhbWUgPSBwb3MuZnJhbWU7XG5cblx0XHRcdFx0Y29uc29sZS5sb2coYHg6ICR7cGxheWVyMDEueH0sIGZyYW1lOiAke3BsYXllcjAxLmZyYW1lfWApO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblxuXHRcdGNvbnN0IFBsYXllcjAxID0gQ2xhc3MuY3JlYXRlKFNwcml0ZSwge1xuXHRcdFx0aW5pdGlhbGl6ZTogZnVuY3Rpb24ocGxheWVySW5mbykge1xuXHRcdFx0XHRsZXQgZ3JvdW5kID0gMjIwO1xuXHRcdFx0XHRsZXQgcHJlSW5wdXQgPSBmYWxzZTtcblx0XHRcdFx0bGV0IGp1bXAgPSBmYWxzZTtcblxuXHRcdFx0XHRTcHJpdGUuY2FsbCh0aGlzLCA2NCwgNjQpO1xuXHRcdFx0XHR0aGlzLnBsYXllckluZm8gPSBwbGF5ZXJJbmZvO1xuXHRcdFx0XHR0aGlzLnNldFNldHRpbmdGaWxlKHBsYXllckluZm8uc2V0dGluZ0ZpbGUpO1xuXHRcdFx0XHR0aGlzLmltYWdlID0gZ2FtZS5hc3NldHNbcGxheWVyMDFfaW1hZ2VdO1xuXHRcdFx0XHR0aGlzLnNjYWxlWCA9IC0xO1xuXHRcdFx0XHR0aGlzLnggPSB0aGlzLnBsYXllckluZm8ueDtcblx0XHRcdFx0dGhpcy55ID0gdGhpcy5wbGF5ZXJJbmZvLnk7XG5cdFx0XHRcdC8vIOWQjeWJjVxuXHRcdFx0XHR0aGlzLmxvZ2luTmFtZSA9IG5ldyBMYWJlbCh0aGlzLnBsYXllckluZm8ubG9naW5OYW1lKTtcblx0XHRcdFx0dGhpcy5sb2dpbk5hbWUud2lkdGggPSAxMDA7XG5cdFx0XHRcdHRoaXMubG9naW5OYW1lLmNvbG9yID0gJ2JsYWNrJztcblx0XHRcdFx0dGhpcy5sb2dpbk5hbWUueCA9IHRoaXMueCArIDEwO1xuXHRcdFx0XHR0aGlzLmxvZ2luTmFtZS55ID0gdGhpcy55IC0gMTU7XG5cdFx0XHRcdHRoaXMuZnJhbWUgPSB0aGlzLnBsYXllckluZm8uZnJhbWU7XG5cdFx0XHRcdHRoaXMub24oJ2VudGVyZnJhbWUnLCAoKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHBsYXllckluZm8uaWQpIHtcblx0XHRcdFx0XHRcdGxldCB0ZW1weSA9IHRoaXMueTtcblx0XHRcdFx0XHRcdGxldCBncmF2aXR5ID0gMS4wO1xuXG5cdFx0XHRcdFx0XHR0aGlzLmZyYW1lID0gMDtcblx0XHRcdFx0XHRcdHRoaXMuc2NhbGVYID0gLTE7XG5cblx0XHRcdFx0XHRcdGlmIChpbnB1dC51cCAmJiAhcHJlSW5wdXQgJiYgIWp1bXApIHtcblx0XHRcdFx0XHRcdCAgZ3Jhdml0eSA9IC0xMi4wO1xuXHRcdFx0XHRcdFx0ICBqdW1wID0gdHJ1ZTtcblxuXHRcdFx0XHRcdFx0ICB0aGlzLmxvZ2luTmFtZS55ID0gdGhpcy55IC0gMTU7XG5cblx0XHRcdFx0XHRcdCAgc29ja2V0LmVtaXQoJ3B1c2hVcDAxJywge1xuXHRcdFx0XHRcdFx0ICBcdHg6IHRoaXMueCxcblx0XHRcdFx0XHRcdCAgXHR5OiB0aGlzLnksXG5cdFx0XHRcdFx0XHQgIFx0ZnJhbWU6IHRoaXMuZnJhbWVcblx0XHRcdFx0XHRcdCAgfSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoaW5wdXQucmlnaHQpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy54ICs9IHBsYXllcl9zcGVlZDtcblx0XHRcdFx0XHRcdFx0dGhpcy5sb2dpbk5hbWUueCArPSBwbGF5ZXJfc3BlZWQ7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZnJhbWUgPSB0aGlzLmFnZSAlIDMgKyAxO1xuXHRcdFx0XHRcdFx0XHRzb2NrZXQuZW1pdCgncHVzaFJpZ2h0MDEnLCB7XG5cdFx0XHRcdFx0XHRcdFx0eDogdGhpcy54LFxuXHRcdFx0XHRcdFx0XHRcdHk6IHRoaXMueSxcblx0XHRcdFx0XHRcdFx0XHRmcmFtZTogdGhpcy5mcmFtZVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKGlucHV0LmRvd24pIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5mcmFtZSA9IDg7XG5cdFx0XHRcdFx0XHRcdHNvY2tldC5lbWl0KCdwdXNoRG93bjAxJywge1xuXHRcdFx0XHRcdFx0XHRcdHg6IHRoaXMueCxcblx0XHRcdFx0XHRcdFx0XHR5OiB0aGlzLnksXG5cdFx0XHRcdFx0XHRcdFx0ZnJhbWU6IHRoaXMuZnJhbWVcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmIChpbnB1dC5sZWZ0KSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuc2NhbGVYID0gMTtcblx0XHRcdFx0XHRcdFx0dGhpcy54IC09IHBsYXllcl9zcGVlZDtcblx0XHRcdFx0XHRcdFx0dGhpcy5sb2dpbk5hbWUueCAtPSBwbGF5ZXJfc3BlZWQ7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZnJhbWUgPSB0aGlzLmFnZSAlIDMgKyAxO1xuXHRcdFx0XHRcdFx0XHRzb2NrZXQuZW1pdCgncHVzaExlZnQwMScsIHtcblx0XHRcdFx0XHRcdFx0XHR4OiB0aGlzLngsXG5cdFx0XHRcdFx0XHRcdFx0eTogdGhpcy55LFxuXHRcdFx0XHRcdFx0XHRcdGZyYW1lOiB0aGlzLmZyYW1lXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR0aGlzLnkgKz0gKHRoaXMueSAtIGdyb3VuZCkgKyBncmF2aXR5O1xuXG5cdFx0XHRcdFx0XHRpZiAodGhpcy55ID4gMjIwKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMueSA9IDIyMDtcblx0XHRcdFx0XHRcdFx0anVtcCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRncm91bmQgPSB0ZW1weTtcblx0XHRcdFx0XHRcdHByZUlucHV0ID0gaW5wdXQudXA7XG5cdFx0XHRcdFx0fVxuXG5cblx0XHRcdFx0XHRsZXQgW2xlZnQsIHRvcF0gPSBbMCwgMF07XG5cdFx0XHRcdFx0bGV0IFtyaWdodCwgYm90dG9tXSA9IFtzY3JlZW5fd2lkdGggLSB0aGlzLndpZHRoLCBzY3JlZW5faGVpZ2h0IC0gdGhpcy5oZWlnaF07XG5cblx0XHRcdFx0XHRpZiAodGhpcy54IDwgbGVmdCB8fCB0aGlzLmxvZ2luTmFtZS54IDwgbGVmdCkge1xuXHRcdFx0XHRcdFx0dGhpcy54ID0gbGVmdDtcblx0XHRcdFx0XHRcdHRoaXMubG9naW5OYW1lLnggPSBsZWZ0O1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodGhpcy54ID4gcmlnaHQgfHwgdGhpcy5sb2dpbk5hbWUueCA+IHJpZ2h0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLnggPSByaWdodDtcblx0XHRcdFx0XHRcdHRoaXMubG9naW5OYW1lLnggPSByaWdodDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHRoaXMueSA8IHRvcCB8fCB0aGlzLmxvZ2luTmFtZS55IDwgdG9wKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnkgPSB0b3A7XG5cdFx0XHRcdFx0XHR0aGlzLmxvZ2luTmFtZS55ID0gdG9wO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodGhpcy55ID4gYm90dG9tIHx8IHRoaXMubG9naW5OYW1lLnkgPiBib3R0b20pIHtcblx0XHRcdFx0XHRcdHRoaXMueSA9IGJvdHRvbTtcblx0XHRcdFx0XHRcdHRoaXMubG9naW5OYW1lLnkgPSBib3R0b207XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cdFx0XHRzZXRTZXR0aW5nRmlsZTogZnVuY3Rpb24oc2V0dGluZ0ZpbGUpIHtcblx0XHRcdFx0dGhpcy5zZXR0aW5nRmlsZSA9IHNldHRpbmdGaWxlO1xuXHRcdFx0XHRsZXQgY29yZSA9IGVuY2hhbnQuQ29yZS5pbnN0YW5jZTtcblx0XHRcdFx0aWYgKGNvcmUuYXNzZXRzW3RoaXMuc2V0dGluZ0ZpbGVdKSB7XG5cdFx0XHRcdFx0dGhpcy5zZXRTZXR0aW5nKGNvcmUuYXNzZXRzW3RoaXMuc2V0dGluZ0ZpbGVdKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHNldFNldHRpbmc6IGZ1bmN0aW9uKHNldHRpbmcpIHtcblx0XHRcdFx0bGV0IGluZm8gPSBKU09OLnBhcnNlKHNldHRpbmcpO1xuXG5cdFx0XHRcdHRoaXMud2lkdGggPSBpbmZvLndpZHRoO1xuXHRcdFx0XHR0aGlzLmhlaWdodCA9IGluZm8uaGVpZ2h0O1xuXHRcdFx0XHR0aGlzLnggPSBpbmZvLng7XG5cdFx0XHRcdHRoaXMueSA9IGluZm8ueTtcblx0XHRcdFx0Y29uc29sZS5sb2codGhpcy54KTtcblx0XHRcdFx0dGhpcy5zZXRJbWFnZShpbmZvLmltYWdlKTtcblx0XHRcdH0sXG5cdFx0XHRhdHRhY2s6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR0aGlzLmZyYW1lID0gdGhpcy5hZ2UgJSAzICsgNDtcblx0XHRcdFx0Y29uc29sZS5sb2cocGxheWVyMDEpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Y29uc3QgQXR0YWNrMDEgPSBDbGFzcy5jcmVhdGUoU3ByaXRlLCB7XG5cdFx0XHRpbml0aWFsaXplOiBmdW5jdGlvbih4LCB5KSB7XG5cdFx0XHRcdHNwcml0ZS5jYWxsKHRoaXMsIDY0LCA2NCk7XG5cdFx0XHRcdHRoaXMuZGVzdHJveSA9IGZhbHNlO1xuXHRcdFx0XHR0aGlzLnggPSB4O1xuXHRcdFx0XHR0aGlzLnkgPSB5O1xuXHRcdFx0XHR0aGlzLm9uKCdlbnRlcmZyYW1lJywgKCkgPT4ge1xuXHRcdFx0XHRcdGlmIChnYW1lLmlucHV0LmEpIHtcblx0XHRcdFx0XHRcdEF0dGFjazAxRnVjKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKEF0dGFjazAxKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRjbGFzcyBQbGF5ZXIwMyB7XG5cdFx0XHRjb25zdHJ1Y3Rvcih4LCB5KSB7XG5cdFx0XHRcdGNvbnN0IHBsYXllcjAzX2ltZyA9IG5ldyBJbWFnZSgpO1xuXHRcdFx0XHRwbGF5ZXIwM19pbWcuc3JjID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9pbWFnZXMvYmlnbW9uc3RlcjIuZ2lmJztcblx0XHRcdFx0dGhpcy54ID0geDtcblx0XHRcdFx0dGhpcy55ID0geTtcblx0XHRcdFx0dGhpcy53aWR0aCA9IDI1NDtcblx0XHRcdFx0dGhpcy5oZWlnaHQgPSAyNTQ7XG5cdFx0XHRcdHRoaXMuaW1hZ2UgPSBnYW1lLmFzc2V0c1twbGF5ZXIwMV9pbWFnZV07XG5cdFx0XHRcdHRoaXMuZnJhbWUgPSAwO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNvbnN0IFBsYXllcjAyID0gQ2xhc3MuY3JlYXRlKFNwcml0ZSwge1xuXHRcdFx0aW5pdGlhbGl6ZTogZnVuY3Rpb24oeCwgeSkge1xuXHRcdFx0XHRTcHJpdGUuY2FsbCh0aGlzLCA2NCwgNjQpO1xuXHRcdFx0XHR0aGlzLmltYWdlID0gZ2FtZS5hc3NldHNbcGxheWVyMDJfaW1hZ2VdO1xuXHRcdFx0XHRsZXQgcDAxX2ltYWdlID0gdGhpcy5pbWFnZTtcblx0XHRcdFx0dGhpcy54ID0geDtcblx0XHRcdFx0dGhpcy55ID0geTtcblx0XHRcdFx0dGhpcy5zY2FsZVggPSAxO1xuXHRcdFx0XHR0aGlzLmZyYW1lID0gMDtcblx0XHRcdFx0dGhpcy5vbignZW50ZXJmcmFtZScsICgpID0+IHtcblx0XHRcdFx0XHR0aGlzLmZyYW1lID0gdGhpcy5kaXJlY3Rpb24gKiAzICsgdGhpcy53YWxrO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGZ1bmN0aW9uIEF0dGFjazAxRnVjKCkge1xuXHRcdFx0Y29uc3QgYXR0YWNrMDEgPSBuZXcgQXR0YWNrMDEoKTtcblx0XHRcdHJvb3QuYWRkQ2hpbGQoYXR0YWNrMDEpO1xuXHRcdFx0Y29uc29sZS5sb2coYXR0YWNrMDEpO1xuXHRcdH1cblxuXG5cdFx0ZnVuY3Rpb24gdG9wU2NlbmUoKSB7XG5cdFx0XHRsZXQgc2NlbmUgPSBuZXcgU2NlbmUoKTtcblx0XHRcdGxldCBiZyA9IG5ldyBTcHJpdGUoc2NyZWVuX3dpZHRoLCBzY3JlZW5faGVpZ2h0KTtcblxuXHRcdFx0cmV0dXJuIHNjZW5lO1xuXHRcdH1cblxuXG5cdFx0ZnVuY3Rpb24gYmF0dGxlU2NlbmUoKSB7XG5cblx0XHRcdHJvb3QuYWRkQ2hpbGQoYmcpO1xuXHRcdFx0cm9vdC5hZGRDaGlsZChMaWZlUDEpO1xuXHRcdFx0cm9vdC5hZGRDaGlsZChMaWZlUDIpO1xuXG5cdFx0XHRwbGF5ZXIwMSA9IG5ldyBQbGF5ZXIwMShwbGF5ZXJJbmZvKTtcblx0XHRcdHJvb3QuYWRkQ2hpbGQocGxheWVyMDEpO1xuXHRcdFx0cm9vdC5hZGRDaGlsZChwbGF5ZXIwMS5sb2dpbk5hbWUpO1xuXG5cdFx0XHRjb25zdCBwbGF5ZXIwMiA9IG5ldyBQbGF5ZXIwMihzY3JlZW5fd2lkdGggLyAxLjUsIDIyMCk7XG5cdFx0XHRyb290LmFkZENoaWxkKHBsYXllcjAyKTtcblxuXHRcdFx0Y29uc3QgcGxheWVyMDMgPSBuZXcgUGxheWVyMDMoc2NyZWVuX3dpZHRoIC8gMiwgMTAwKTtcblxuXHRcdFx0aWYgKHBsYXllcjAxLnggPiBwbGF5ZXIwMi54KSB7XG5cdFx0XHRcdHBsYXllcjAxLnNjYWxlWCA9IDE7XG5cdFx0XHRcdGNvbnNvbGUubG9nKHBsYXllcjAxKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzY2VuZTtcblx0XHR9XG5cblx0XHRnYW1lLnJvb3RTY2VuZS5vbignZW50ZXJmcmFtZScsICgpID0+IHtcblxuXHRcdFx0dG9wU2NlbmUoKTtcblxuXHRcdFx0aWYgKGdhbWUuaW5wdXQuc3BhY2UpIHtcblx0XHRcdFx0YmF0dGxlU2NlbmUoKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fTtcblx0Z2FtZS5zdGFydCgpO1xufTsiXX0=
