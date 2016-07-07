var net = require('net');

var server_address = '192.168.33.11';

const chatLogPrint = document.getElementById('chat-log-print')

const chatSendButton = document.getElementById('chat-send-button')

const chatText = document.getElementById('chat-text');

const quitButton = document.getElementById('chat-quit-button')

function UserSocket(name) {
    this.name = name;
}

UserSocket.prototype = new net.Socket();

UserSocket.prototype.sendUserInfo = function () {
    this.write('{"operation": "userinfo", "body": "' + this.name + '"}');
};

UserSocket.prototype.sendMessage = function (message) {
    this.write('{"operation": "message", "body": "' + message + '"}');
}

var client = new UserSocket('gbsong');

client.connect(1337, server_address, function() {
	console.log('Connected');
	// client.sendMessage('Hello, server! Love, Client.');
    client.sendUserInfo();
});

client.on('data', function(data) {
	console.log('Received: ' + data);
    prevLog = chatLogPrint.innerText;
    prevLog = prevLog + data;
    chatLogPrint.innerText = prevLog;
	// client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});

chatSendButton.addEventListener("click", function() {
    var chatTextElement = document.getElementById('chat-text');
    client.sendMessage(chatTextElement.value);
    chatTextElement.value = '';
});

quitButton.addEventListener("click", function() {
    client.destroy();
});