'use strict';
'use  strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var thisServer = 'http://localhost:3000';
var socket = io.connect(thisServer);

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
var fps = 30;

var player = null;
var otherPlayers = {};

var playerInfo = {
	id: '',
	loginName: 'hoge',
	x: 128,
	y: 220,
	nameX: 0,
	nameY: 0,
	frame: 1,
	settingFile: thisServer + '/data/player01.json',
	img: thisServer + '/images/player01.gif'
};

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

function Canvas(canvasImg) {
	canvas.id = 'canvasWindow';
	canvas.width = 640;
	canvas.height = 290;
	document.body.appendChild(canvas);

	if (!canvas || !canvas.getContext) {
		return false;
	}

	var img = new Image();
	img.src = canvasImg;
	img.onload = function () {
		ctx.drawImage(img, 0, 0);
	};
}

var Player = function () {
	function Player(x, y) {
		_classCallCheck(this, Player);

		var img = new Image();
		img.src = playerInfo.img;
		img.onload = function () {
			ctx.drawImage(img, 0, 0, 64, 64, x, y, 64, 64);
		};

		this.id = playerInfo.id;
		this.name = playerInfo.loginName;
		this.img = img.src;
		this.x = x;
		this.y = y;
	}

	_createClass(Player, [{
		key: 'onkeydown',
		value: function onkeydown() {
			document.onkeydown = function (e) {
				var keycode = e.keyCode;
				console.log(e.keyCode);
			};
		}
	}]);

	return Player;
}();

var MoveChar = function MoveChar(keyCode) {
	_classCallCheck(this, MoveChar);

	var moveChar = document.createEvent('Event');
	moveChar.initEvent('keydown', true, true);
	moveChar.keyCode = keyCode;
	document.dispatchEvent(moveChar);
	console.log(moveChar);
};

function battleScene() {

	ctx.clearRect(0, 0, 640, 290);
	console.log(ctx);

	// 背景
	var canvas = new Canvas(thisServer + '/images/bg_battle01.jpg');

	// player01のインスタンス生成
	var player01 = new Player(128, 220);
	console.log(player01);
}

window.onload = function () {

	battleScene();
};