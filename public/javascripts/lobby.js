const socketIO = io.connect('http://localhost:9000'),
      serviceName = 'Enginner Fighter',
      thisServer = 'http://localhost:3000/',
      socket = io.connect(thisServer);

const playerInfo = {
  id: '',
  loginName: 'イギー',
  x:  10,
  y: 220,
  nameX: 0,
  nameY: 0,
  frame: 0,
  settingFile: `${thisServer}data/player01.json`,
  img: `${thisServer}images/main.png`,
};


socketIO.on('connected', name => {
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

socketIO.on('publish', data => {
  addMessage(data.value);
});

socketIO.on('disconnect', () => {});


function start(name) {
  socketIO.emit('connected', name);
}

function publishMessage() {
  var textInput = document.getElementById('inputArea__msg');
  var msg = '[' + myName + '] ' + textInput.value;
  socketIO.emit('publish', {value: msg});
  textInput.value = '';
  console.log(textInput.value);
}

function addMessage(msg) {
  var msgListItem = document.createElement('li');
  msgListItem.innerHTML = new Date().toLocaleTimeString() + ' ' + msg;
  msgList.appendChild(msgListItem);
}


var msgList = document.getElementById('msgList');
var myName = Math.floor(Math.random() * 100);

addMessage(`${myName}さんがログインしました。`);
start(myName);