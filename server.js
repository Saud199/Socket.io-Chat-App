const express = require("express");
var cors = require("cors");

// Port
const port = process.env.PORT || 3000;

const app = express();

//  Middleware
app.use(express.json());

//  To solve CORS related issues
app.use(cors());


// Establishing Socket.io Connection
const server = require("http").createServer(app);

const io = require('socket.io')(server);

// Start the Server
server.listen(port, () => console.log(`Server is started on port : ${port}`)); 

const users = [];

io.on('connection' , socket => {    // Runs every time a new user connects
    //socket.emit('chat-message' , 'Hello World');

    socket.on('new-user' , name => {    // Responds to the "new-user" event from Client
        users[socket.id] = name;    // We are using "socket" in "socket.id" because each socket(user) has a unique ID.
        socket.broadcast.emit('user-connected' , name);
    });

    socket.on('send-chat-message' , message => {    // Responds to the "send-chat-message" event from Client
        socket.broadcast.emit('chat-message' , {
            message : message , name : users[socket.id]         // Sending both the message and user's name
        });    // This will send the message to all the Users connected except for the User who sent the message
    });

    socket.on('disconnect' , name => {    // Responds to the "new-user" event from Client
        socket.broadcast.emit('user-disconnected' , users[socket.id]);
        delete users[socket.id];
    });
});