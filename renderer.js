var net = require('net');

var Message = require('./message.js');

var server_address = '192.168.33.11';

const chatLogPrint = document.getElementById('chat-log-print')

const chatSendButton = document.getElementById('chat-send-button')

const chatText = document.getElementById('chat-text');

const quitButton = document.getElementById('chat-quit-button')

var message = new Message();

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
    //create very top element
    var div_node = document.createElement('div');

    //create and add 'a' element if not notice
    if(operation != 'notice') {
        var a_node = document.createElement('a');
        var name_node = document.createTextNode(name);
        a_node.appendChild(name_node);
        div_node.appendChild(a_node);
    }

    var chat_node = document.createTextNode(operation == 'chat' ? ': ' + message : message);
    
    // var a_node_attr = document.createAttribute('href');
    // a_node_attr.value = '#';
    // a_node.setAttributeNode(a_node_attr);
    
    div_node.appendChild(chat_node);
    chatLogPrint.appendChild(div_node);
    chatLogPrint.scrollTop = chatLogPrint.scrollHeight;
	// client.destroy(); // kill client after server's response
};

function updateInfo() {
    console.log(Object.keys(message));
};