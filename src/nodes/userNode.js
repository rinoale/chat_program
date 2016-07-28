ObjectToNode = require('./objectToNode.js');

function UserNode() {
    this.divElement = new ObjectToNode('div');
}

UserNode.prototype.createUser = function (name) {
    userNode = this.divElement.getNode();

    user = new ObjectToNode('a', null, name);

    userNode.appendChild(user.getNode());


    return userNode;
};

module.exports = UserNode;