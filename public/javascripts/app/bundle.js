(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _game = require('./game.js');

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./game.js":2}],2:[function(require,module,exports){
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
		this.scaleX;
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
	var player01 = new Player(180, 220);
	console.log(player01);
}

window.onload = function () {

	battleScene();
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvamF2YXNjcmlwdHMvYXBwLmpzIiwicHVibGljL2phdmFzY3JpcHRzL2dhbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0NBOzs7Ozs7OztBQ0RBOzs7Ozs7QUFFQSxJQUFNLGFBQWEsdUJBQW5CO0FBQ0EsSUFBTSxTQUFTLEdBQUcsT0FBSCxDQUFXLFVBQVgsQ0FBZjs7QUFHQSxJQUFNLFNBQVMsU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQWY7QUFDQSxJQUFNLE1BQU0sT0FBTyxVQUFQLENBQWtCLElBQWxCLENBQVo7QUFDQSxJQUFNLE1BQU0sRUFBWjs7QUFHQSxJQUFNLFNBQVMsSUFBZjtBQUNBLElBQU0sZUFBZSxFQUFyQjs7QUFHQSxJQUFNLGFBQWE7QUFDbEIsS0FBSSxFQURjO0FBRWxCLFlBQVcsTUFGTztBQUdsQixJQUFHLEdBSGU7QUFJbEIsSUFBRyxHQUplO0FBS2xCLFFBQU8sQ0FMVztBQU1sQixRQUFPLENBTlc7QUFPbEIsUUFBTyxDQVBXO0FBUWxCLGNBQWdCLFVBQWhCLHdCQVJrQjtBQVNsQixNQUFRLFVBQVI7QUFUa0IsQ0FBbkI7OztBQWNBLE9BQU8sRUFBUCxDQUFVLFNBQVYsRUFBcUIsWUFBTTs7QUFFMUIsTUFBSyxNQUFMLENBQVksa0JBQVosRUFBZ0M7QUFDL0IsUUFBUyxXQUFXLFNBQXBCLGVBRCtCO0FBRS9CLFFBQU07QUFDTCxhQUFRLFdBQVc7QUFEZCxHQUZ5QjtBQUsvQixXQUFTO0FBTHNCLEVBQWhDOztBQVFBLFlBQVcsRUFBWCxHQUFnQixPQUFPLEVBQXZCOztBQUVBLFFBQU8sSUFBUCxDQUFZLE1BQVosRUFBb0IsVUFBcEI7QUFDQSxDQWJEOztBQWdCQSxTQUFTLE1BQVQsQ0FBZ0IsU0FBaEIsRUFBMkI7QUFDMUIsUUFBTyxFQUFQLEdBQVksY0FBWjtBQUNBLFFBQU8sS0FBUCxHQUFlLEdBQWY7QUFDQSxRQUFPLE1BQVAsR0FBZ0IsR0FBaEI7QUFDQSxVQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLE1BQTFCOztBQUVBLEtBQUksQ0FBQyxNQUFELElBQVcsQ0FBQyxPQUFPLFVBQXZCLEVBQW1DO0FBQ2xDLFNBQU8sS0FBUDtBQUNBOztBQUVELEtBQUksTUFBTSxJQUFJLEtBQUosRUFBVjtBQUNBLEtBQUksR0FBSixHQUFVLFNBQVY7QUFDQSxLQUFJLE1BQUosR0FBYSxZQUFNO0FBQ2xCLE1BQUksU0FBSixDQUFjLEdBQWQsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEI7QUFDQSxFQUZEO0FBR0E7O0lBR0ssTTtBQUVMLGlCQUFZLENBQVosRUFBZSxDQUFmLEVBQWtCO0FBQUE7O0FBQ2pCLE1BQUksTUFBTSxJQUFJLEtBQUosRUFBVjtBQUNBLE1BQUksR0FBSixHQUFVLFdBQVcsR0FBckI7QUFDQSxNQUFJLE1BQUosR0FBYSxZQUFNO0FBQ2xCLE9BQUksU0FBSixDQUFjLEdBQWQsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsRUFBekIsRUFBNkIsRUFBN0IsRUFBaUMsQ0FBakMsRUFBb0MsQ0FBcEMsRUFBdUMsRUFBdkMsRUFBMkMsRUFBM0M7QUFDQSxHQUZEOztBQUlBLE9BQUssRUFBTCxHQUFVLFdBQVcsRUFBckI7QUFDQSxPQUFLLElBQUwsR0FBWSxXQUFXLFNBQXZCO0FBQ0EsT0FBSyxHQUFMLEdBQVcsSUFBSSxHQUFmO0FBQ0EsT0FBSyxNQUFMO0FBQ0E7Ozs7OEJBRVc7QUFDWCxZQUFTLFNBQVQsR0FBcUIsYUFBSztBQUN6QixRQUFJLFVBQVUsRUFBRSxPQUFoQjtBQUNBLFlBQVEsR0FBUixDQUFZLEVBQUUsT0FBZDtBQUNBLElBSEQ7QUFJQTs7Ozs7O0lBS0ksUSxHQUNMLGtCQUFZLE9BQVosRUFBcUI7QUFBQTs7QUFDcEIsS0FBSSxXQUFXLFNBQVMsV0FBVCxDQUFxQixPQUFyQixDQUFmO0FBQ0EsVUFBUyxTQUFULENBQW1CLFNBQW5CLEVBQThCLElBQTlCLEVBQW9DLElBQXBDO0FBQ0EsVUFBUyxPQUFULEdBQW1CLE9BQW5CO0FBQ0EsVUFBUyxhQUFULENBQXVCLFFBQXZCO0FBQ0EsU0FBUSxHQUFSLENBQVksUUFBWjtBQUNBLEM7O0FBSUYsU0FBUyxXQUFULEdBQXVCOztBQUV0QixLQUFJLFNBQUosQ0FBYyxDQUFkLEVBQWlCLENBQWpCLEVBQW9CLEdBQXBCLEVBQXlCLEdBQXpCO0FBQ0EsU0FBUSxHQUFSLENBQVksR0FBWjs7O0FBR0EsS0FBSSxTQUFTLElBQUksTUFBSixDQUFjLFVBQWQsNkJBQWI7OztBQUdBLEtBQUksV0FBVyxJQUFJLE1BQUosQ0FBVyxHQUFYLEVBQWdCLEdBQWhCLENBQWY7QUFDQSxTQUFRLEdBQVIsQ0FBWSxRQUFaO0FBRUE7O0FBRUQsT0FBTyxNQUFQLEdBQWdCLFlBQU07O0FBRXJCO0FBRUEsQ0FKRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IG1haW4gZnJvbSAnLi9nYW1lLmpzJztcbi8vIGltcG9ydCBlbmNoYW50IGZyb20gJy4vbGliL2VuY2hhbnQuanMnO1xuLy8gaW1wb3J0IGF2YXRhckVuY2hhbnQgZnJvbSAnLi9saWIvYXZhdGFyLmVuY2hhbnQuanMnO1xuLy8gaW1wb3J0IHVpRW5jaGFudCBmcm9tICcuL2xpYi91aS5lbmNoYW50LmpzJ1xuLy8gaW1wb3J0IG1haW4gZnJvbSAnLi9tYWluLmpzJzsiLCIndXNlICBzdHJpY3QnO1xuXG5jb25zdCB0aGlzU2VydmVyID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCc7XG5jb25zdCBzb2NrZXQgPSBpby5jb25uZWN0KHRoaXNTZXJ2ZXIpO1xuXG5cbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5jb25zdCBmcHMgPSAzMDtcblxuXG5jb25zdCBwbGF5ZXIgPSBudWxsO1xuY29uc3Qgb3RoZXJQbGF5ZXJzID0ge307XG5cblxuY29uc3QgcGxheWVySW5mbyA9IHtcblx0aWQ6ICcnLFxuXHRsb2dpbk5hbWU6ICdob2dlJyxcblx0eDogMTI4LFxuXHR5OiAyMjAsXG5cdG5hbWVYOiAwLFxuXHRuYW1lWTogMCxcblx0ZnJhbWU6IDEsXG5cdHNldHRpbmdGaWxlOiBgJHt0aGlzU2VydmVyfS9kYXRhL3BsYXllcjAxLmpzb25gLFxuXHRpbWc6IGAke3RoaXNTZXJ2ZXJ9L2ltYWdlcy9wbGF5ZXIwMS5naWZgXG59O1xuXG5cbi8vIOe5i+OBjOOBo+OBn+aZguOBruWHpueQhlxuc29ja2V0Lm9uKCdjb25uZWN0JywgKCkgPT4ge1xuXG5cdFB1c2guY3JlYXRlKCdFbmdpbm5lciBGaWdodGVyJywge1xuXHRcdGJvZHk6IGAke3BsYXllckluZm8ubG9naW5OYW1lfeOBjOODreOCsOOCpOODs+OBl+OBvuOBl+OBn+OAgmAsXG5cdFx0aWNvbjoge1xuXHRcdFx0eDMyOiBgJHtwbGF5ZXJJbmZvLmltZ31gXG5cdFx0fSxcblx0XHR0aW1lb3V0OiAzMDAwXG5cdH0pO1xuXG5cdHBsYXllckluZm8uaWQgPSBzb2NrZXQuaWQ7XG5cblx0c29ja2V0LmVtaXQoJ25hbWUnLCBwbGF5ZXJJbmZvKTtcbn0pO1xuXG5cbmZ1bmN0aW9uIENhbnZhcyhjYW52YXNJbWcpIHtcblx0Y2FudmFzLmlkID0gJ2NhbnZhc1dpbmRvdyc7XG5cdGNhbnZhcy53aWR0aCA9IDY0MDtcblx0Y2FudmFzLmhlaWdodCA9IDI5MDtcblx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpO1xuXG5cdGlmICghY2FudmFzIHx8ICFjYW52YXMuZ2V0Q29udGV4dCkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcblx0aW1nLnNyYyA9IGNhbnZhc0ltZztcblx0aW1nLm9ubG9hZCA9ICgpID0+IHtcblx0XHRjdHguZHJhd0ltYWdlKGltZywgMCwgMCk7XG5cdH1cbn1cblxuXG5jbGFzcyBQbGF5ZXIge1xuXG5cdGNvbnN0cnVjdG9yKHgsIHkpIHtcblx0XHRsZXQgaW1nID0gbmV3IEltYWdlKCk7XG5cdFx0aW1nLnNyYyA9IHBsYXllckluZm8uaW1nO1xuXHRcdGltZy5vbmxvYWQgPSAoKSA9PiB7XG5cdFx0XHRjdHguZHJhd0ltYWdlKGltZywgMCwgMCwgNjQsIDY0LCB4LCB5LCA2NCwgNjQpO1xuXHRcdH1cblxuXHRcdHRoaXMuaWQgPSBwbGF5ZXJJbmZvLmlkO1xuXHRcdHRoaXMubmFtZSA9IHBsYXllckluZm8ubG9naW5OYW1lO1xuXHRcdHRoaXMuaW1nID0gaW1nLnNyYztcblx0XHR0aGlzLnNjYWxlWFxuXHR9XG5cblx0b25rZXlkb3duKCkge1xuXHRcdGRvY3VtZW50Lm9ua2V5ZG93biA9IGUgPT4ge1xuXHRcdFx0bGV0IGtleWNvZGUgPSBlLmtleUNvZGU7XG5cdFx0XHRjb25zb2xlLmxvZyhlLmtleUNvZGUpO1xuXHRcdH1cblx0fVxuXG59XG5cblxuY2xhc3MgTW92ZUNoYXIge1xuXHRjb25zdHJ1Y3RvcihrZXlDb2RlKSB7XG5cdFx0bGV0IG1vdmVDaGFyID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG5cdFx0bW92ZUNoYXIuaW5pdEV2ZW50KCdrZXlkb3duJywgdHJ1ZSwgdHJ1ZSk7XG5cdFx0bW92ZUNoYXIua2V5Q29kZSA9IGtleUNvZGU7XG5cdFx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChtb3ZlQ2hhcik7XG5cdFx0Y29uc29sZS5sb2cobW92ZUNoYXIpO1xuXHR9XG59XG5cblxuZnVuY3Rpb24gYmF0dGxlU2NlbmUoKSB7XG5cblx0Y3R4LmNsZWFyUmVjdCgwLCAwLCA2NDAsIDI5MCk7XG5cdGNvbnNvbGUubG9nKGN0eCk7XG5cblx0Ly8g6IOM5pmvXG5cdGxldCBjYW52YXMgPSBuZXcgQ2FudmFzKGAke3RoaXNTZXJ2ZXJ9L2ltYWdlcy9iZ19iYXR0bGUwMS5qcGdgKTtcblxuXHQvLyBwbGF5ZXIwMeOBruOCpOODs+OCueOCv+ODs+OCueeUn+aIkFxuXHRsZXQgcGxheWVyMDEgPSBuZXcgUGxheWVyKDE4MCwgMjIwKTtcblx0Y29uc29sZS5sb2cocGxheWVyMDEpO1xuXG59XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG5cblx0YmF0dGxlU2NlbmUoKTtcblxufTsiXX0=
