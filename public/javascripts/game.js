const serviceName = 'Enginner Fighter';
const thisServer = 'http://localhost:3000';
const socket = io.connect(thisServer);


const player = null;
const otherPlayers = {};


const playerInfo = {
	id: '',
	loginName: 'hoge',
	x: 128,
	y: 220,
	nameX: 0,
	nameY: 0,
	frame: 1,
	settingFile: `${thisServer}/data/player01.json`,
	img: `${thisServer}/images/player01.gif`
};


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


const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');


const Canvas = {
	constructor: function(canvasImg) {

		canvas.id = 'canvasWindow';
		canvas.width = 640;
		canvas.height = 290;
		document.body.appendChild(canvas);

		if (!canvas || !canvas.getContext) {
			return false;
		}

		let img = new Image();
		img.src = canvasImg;
		img.onload = () => {
			ctx.drawImage(img, 0, 0);
		}
	}
}


class Player {
	constructor(x, y) {
		let img = new Image();
		img.src = playerInfo.img;
		img.onload = () => {
			ctx.drawImage(img, 0, 0);
		}

		this.id = playerInfo.id;
		this.name = playerInfo.loginName;
		this.img = img.src;
		this.x = x;
		this.y = y;
	}
	onkeydown() {
		document.onkeydown = e => {
			let keycode = e.keyCode;
			console.log(e.keyCode);
		}
	}
}


class MoveChar {
	constructor(keyCode) {
		let moveChar = document.createEvent('Event');
		moveChar.initEvent('keydown', true, true);
		moveChar.keyCode = keyCode;
		document.dispatchEvent(moveChar);
		console.log(moveChar);
	}
}


function battleScene() {

	// 背景
	Canvas.constructor(`${thisServer}/images/bg_battle01.jpg`);

	// player01のインスタンス生成
	let player01 = new Player(180, 220);
	console.log(player01);

}

window.onload = () => {

	battleScene();

};