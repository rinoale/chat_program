var net = require('net');

var server_address = '192.168.33.11';

const chatLogPrint = document.getElementById('chat-log-print')

const chatSendButton = document.getElementById('chat-send-button')

const quitButton = document.getElementById('chat-quit-button')

var client = new net.Socket();
client.connect(1337, server_address, function() {
	console.log('Connected');
	client.write('Hello, server! Love, Client.');
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
    client.write(chatTextElement.value);
    chatTextElement.value = '';
});

quitButton.addEventListener("click", function() {
    client.destroy();
});