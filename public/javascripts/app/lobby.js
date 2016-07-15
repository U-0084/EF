'use strict';

var thisServer = 'http://localhost:3000/',
    socketIO = io.connect(thisServer);

var msgList = document.getElementById('msgList');
// const myName = window.prompt('ユーザー名を入力してください');
var myName = Math.floor(Math.random() * 100);

socketIO.on('connected', function (name) {});
socketIO.on('publish', function (data) {
  addMessage(data.value);
});
socketIO.on('disconnect', function () {});

function start(name) {
  socketIO.emit('connected', name);
}

function publishMessage() {
  var textInput = document.getElementById('inputArea__msg');
  var msg = '[' + myName + '] ' + textInput.value;

  socketIO.emit('publish', { value: msg });
  textInput.value = '';
}

function addMessage(msg) {
  var msgListItem = document.createElement('li');

  msgListItem.innerHTML = new Date().toLocaleTimeString() + ' ' + msg;
  msgList.appendChild(msgListItem);
}

addMessage(myName + 'さんがログインしました。');
start(myName);