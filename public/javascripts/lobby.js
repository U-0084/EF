const thisServer = 'http://localhost:3000/',
      socketIO = io.connect(thisServer);

const msgList = document.getElementById('msgList');
// const myName = window.prompt('ユーザー名を入力してください');
const myName = Math.floor(Math.random() * 100);

socketIO.on('connected', name => {});
socketIO.on('publish', data => { addMessage(data.value); });
socketIO.on('disconnect', () => {});

function start(name) {
  socketIO.emit('connected', name);
}

function publishMessage() {
  let textInput = document.getElementById('inputArea__msg');
  let msg = '[' + myName + '] ' + textInput.value;

  socketIO.emit('publish', {value: msg});
  textInput.value = '';
}

function addMessage(msg) {
  let msgListItem = document.createElement('li');

  msgListItem.innerHTML = new Date().toLocaleTimeString() + ' ' + msg;
  msgList.appendChild(msgListItem);
}


addMessage(`${myName}さんがログインしました。`);
start(myName);