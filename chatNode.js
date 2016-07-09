ObjectToNode = require('./objectToNode.js');

function ChatNode() {
    this.divElement = new ObjectToNode('div');
}

ChatNode.prototype.createNotice = function (name, message) {
    this.divElement.text = message;
    chatNode = this.divElement.getNode();

    return chatNode;
};

ChatNode.prototype.createChat = function (name, message) {
    this.divElement.text = ': ' + message;
    chatNode = this.divElement.getNode();

    aElement = new ObjectToNode('a', null, name);

    chatNode.insertBefore(aElement.getNode(), chatNode.firstChild);

    return chatNode;
};

ChatNode.prototype.createInfo = function (name, message) {
    this.divElement.text = message;
    chatNode = this.divElement.getNode();

    aElement = new ObjectToNode('a', null, name);

    chatNode.insertBefore(aElement.getNode(), chatNode.firstChild);

    return chatNode;
};

module.exports = ChatNode;