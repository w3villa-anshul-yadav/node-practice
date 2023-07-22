const express = require('express');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const user = [];
let userCount = 0;

http.listen('3000', () => {
    console.log(`serer started at port 3000`);
});

app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

io.on('connection', function (socket) {
    console.log('a user has connected!');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('newUserRegister', (userName) => {
        console.log(userName);
        const userInfo = {
            userName,
            userId: ++userCount,
        };
        user.push(userInfo);
        socket.emit(userName, userInfo.userId);
    });

    socket.on('sendMessage', (userInput, userName) => {
         const userID = user.find((elem) => elem.userName === userName).userId;
         socket.broadcast.emit('receivedMessage', userInput, userName, userID);
    });
});
