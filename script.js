const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const sendMessageButton = document.getElementById('send-button');

const name = prompt("What is your name ?");
userStatus("You Joined");
socket.emit('new-user' , name);

socket.on('chat-message' , data => {
    appendMessage(`${data.name} : ${data.message}`);
});


socket.on('user-connected' , name => {
    userStatus(`${name} Connected`);
});


socket.on('user-disconnected' , name => {
    userStatus(`${name} Disconnected`);
});


// messageForm.addEventListener('submit' , e => {
//     e.preventDefault();     // Prevent the page from refreshing or else we will lose all our chat

//     const message = messageInput.value;
//     appendOwnMessage(`You : ${message}`);
//     socket.emit('send-chat-message' , message);     // emit() is going to emit information from Client to Server
//     messageInput.value = "";
// });


sendMessageButton.addEventListener('click' , e => {
    const message = messageInput.value;
    appendOwnMessage(`You : ${message}`);
    socket.emit('send-chat-message' , message);     // emit() is going to emit information from Client to Server
    messageInput.value = "";
});


function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.setAttribute('class','alert alert-success float-left mx-2 my-2');
    messageElement.setAttribute('role','alert');
    messageElement.setAttribute('style','border:solid; width:50%; height: auto; overflow-wrap: break-word; text-align: left;');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}


function appendOwnMessage(message) {
    const messageOwnElement = document.createElement('div');
    messageOwnElement.setAttribute('class','alert alert-primary float-right mx-2 my-2');
    messageOwnElement.setAttribute('role','alert');
    messageOwnElement.setAttribute('style','border:solid; width:50%; height: auto; overflow-wrap: break-word; text-align: left;');
    messageOwnElement.innerText = message;
    messageContainer.append(messageOwnElement);
}


function userStatus(status) {
    const user_status = document.createElement('div');
    user_status.setAttribute('class','alert alert-warning mx-2 my-2');
    user_status.setAttribute('role','alert');
    user_status.setAttribute('style','border:solid; width:50%; height: auto; overflow-wrap: break-word; display: inline-block;');
    user_status.innerText = status;
    messageContainer.append(user_status);
}