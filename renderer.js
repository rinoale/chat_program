var net = require('net');

var server_address = '192.168.33.11';

const chatLogPrint = document.getElementById('chat-log-print')

const chatSendButton = document.getElementById('chat-send-button')

const chatText = document.getElementById('chat-text');

const quitButton = document.getElementById('chat-quit-button')

function Message(operation, user, message) {
    this.operation = operation;
    this.user = user;
    this.message = message;
}

function UserSocket(name) {
    this.name = name;
}

UserSocket.prototype = new net.Socket();

UserSocket.prototype.sendInfo = function () {
    var message = new Message('inform', this.name);
    this.write(JSON.stringify(message));
};

UserSocket.prototype.sendChat = function (chat) {
    var message = new Message('chat', this.name, chat);
    this.write(JSON.stringify(message));
}

var client = new UserSocket('gbsong');

client.connect(1337, server_address, function() {
	console.log('Connected');
	// client.sendMessage('Hello, server! Love, Client.');
    
    client.sendInfo();
});

client.on('data', function(data) {
	console.log('Received: ' + data);
    var json_data = JSON.parse(data);

    updateLog(json_data.operation, json_data.user, json_data.message);
});

client.on('close', function() {
	console.log('Connection closed');
});

chatSendButton.addEventListener("click", function() {
    var chatTextElement = document.getElementById('chat-text');
    client.sendChat(chatTextElement.value);
    chatTextElement.value = '';
});

quitButton.addEventListener("click", function() {
    client.destroy();
});

function updateLog(operation, user, message) {
    var div_node = document.createElement('div');
    var a_node = document.createElement('a');
    var a_node_attr = document.createAttribute('href');
    var user_node = document.createTextNode(user);
    var chat_node = document.createTextNode(operation == 'chat' ? ': ' + message : message);
    
    // a_node_attr.value = '#';
    // a_node.setAttributeNode(a_node_attr);
    a_node.appendChild(user_node);
    div_node.appendChild(a_node);
    div_node.appendChild(chat_node);
    chatLogPrint.appendChild(div_node);
    chatLogPrint.scrollTop = chatLogPrint.scrollHeight;
	// client.destroy(); // kill client after server's response
};