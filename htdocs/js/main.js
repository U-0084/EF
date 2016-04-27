enchant();

if (window.GamepadEvent) {
	window.addEventListener('gamepadconnected', e => {
		console.log("ゲームパッドが接続されました。");
		console.log(e.gamepad);
	});
}

const gamepad = navigator.getGamepads && navigator.getGamepads()[0];

//汎用処理

