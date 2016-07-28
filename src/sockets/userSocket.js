var net = require('net');

var ClientMessage = require('../messages/clientMessage.js');

var message = new ClientMessage();

function UserSocket(name) {
    this.name = name;
}

UserSocket.prototype = new net.Socket();

UserSocket.prototype.sendInfo = function () {
    message.setInfo(this.name);
    this.write(JSON.stringify(message));
};

UserSocket.prototype.sendChat = function (chat) {
    message.setChat(chat);
    this.write(JSON.stringify(message));
}

module.exports = UserSocket;