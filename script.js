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
    messageElement.setAttribute('class','talk-bubble tri-right border round btm-left-in animate__animated animate__lightSpeedInLeft');
    messageElement.setAttribute('style','float: left; width: 50%; background-color: greenyellow;');

    const messageElement_innerDiv = document.createElement('div');
    messageElement_innerDiv.setAttribute('class','talktext');

    const messageElement_text = document.createElement('p');
    messageElement_text.innerText = message;

    messageElement_innerDiv.append(messageElement_text);
    messageElement.append(messageElement_innerDiv)
    messageContainer.append(messageElement);
}


function appendOwnMessage(message) {
    const ownMessage_outerDiv = document.createElement('div');
    ownMessage_outerDiv.setAttribute('class' , 'talk-bubble tri-right border round btm-right-in animate__animated animate__lightSpeedInRight');
    ownMessage_outerDiv.setAttribute('style' , 'float: right; width: 50%; background-color: lightgreen;');

    const ownMessage_innerDiv = document.createElement('div');
    ownMessage_innerDiv.setAttribute('class' , 'talktext');

    const ownMessage_text = document.createElement('p');
    ownMessage_text.innerText = message;

    ownMessage_innerDiv.append(ownMessage_text);
    ownMessage_outerDiv.append(ownMessage_innerDiv);
    messageContainer.append(ownMessage_outerDiv);
}


function userStatus(status) {
    const user_status = document.createElement('div');
    user_status.setAttribute('class','talk-bubble border animate__animated animate__bounceIn');
    user_status.setAttribute('style','width: 50%; display: inline-block; background-color: yellow;');

    const user_status_innerDiv = document.createElement('div');
    user_status_innerDiv.setAttribute('class','talktext');
    user_status_innerDiv.setAttribute('style','text-align: center;');

    const user_status_text = document.createElement('p');
    user_status_text.innerText = status;

    user_status_innerDiv.append(user_status_text);
    user_status.append(user_status_innerDiv);
    messageContainer.append(user_status);
}