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
    var div_node = document.createElement('div');
    var a_node = document.createElement('a');
    var a_node_attr = document.createAttribute('href');
    var text_node = document.createTextNode(data);
    
    // a_node_attr.value = '#';
    // a_node.setAttributeNode(a_node_attr);
    a_node.appendChild(text_node);
    div_node.appendChild(a_node);
    chatLogPrint.appendChild(div_node);
    chatLogPrint.scrollTop = chatLogPrint.scrollHeight;
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