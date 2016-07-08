function Message() {
    // this.operation = operation;
    // this.message = message;
}

Message.prototype.setInfo = function (message) {
    this.operation = 'inform';
    this.message = message;
}

Message.prototype.setChat = function (message) {
    this.operation = 'chat';
    this.message = message;
}

module.exports = Message;