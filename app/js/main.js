"use strict";

enchant();

if (window.GamepadEvent) {
	window.addEventListener('gamepadconnected', function (e) {
		console.log("ゲームパッドが接続されました。");
		console.log(e.gamepad);
	});
}

var gamepad = navigator.getGamepads && navigator.getGamepads()[0];

//汎用処理

hoge;