var net = require('net');

var ClientMessage = require('./messages/clientMessage.js');

var ChatNode = require('./chatNode.js');

var UserNode = require('./userNode.js');

var server_address = '52.197.79.219';

const chatLogPrint = document.getElementById('chat-log-print')

const chatSendButton = document.getElementById('chat-send-button')

const chatText = document.getElementById('chat-text');

const userList = document.getElementById('user-list');

const quitButton = document.getElementById('chat-quit-button')

var message = new ClientMessage();

var chatNode = new ChatNode();

var userNode = new UserNode();

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

var client = new UserSocket('gbsong');

client.connect(1337, server_address, function() {
	console.log('Connected');
    
    client.sendInfo();
});

client.on('data', function(data) {
	console.log('Received: ' + data);
    var json_data = JSON.parse(data);

    updateChat(json_data.operation, json_data.name, json_data.message);

    if(json_data.operation == 'inform') {
        updateStatus(json_data.operation, json_data.name, json_data.message);
    }
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

function updateChat(operation, name, message) {
    var div_node;
    switch(operation) {
        case 'notice':
            div_node = chatNode.createNotice(name, message);
            break;
        case 'inform':
            div_node = chatNode.createInfo(name, message);
            break;
        case 'chat':
            div_node = chatNode.createChat(name, message);
            break;
    };

    chatLogPrint.appendChild(div_node);
    chatLogPrint.scrollTop = chatLogPrint.scrollHeight;
	// client.destroy(); // kill client after server's response
};

function updateStatus(operation, name, message) {
    var div_node;

    div_node = userNode.createUser(name);

    userList.appendChild(div_node);
    chatLogPrint.scrollTop = chatLogPrint.scrollHeight;
}

function updateInfo() {
    console.log(Object.keys(message));
};
