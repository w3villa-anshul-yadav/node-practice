var socket = io();
window.onload = () => {
    userName = window.prompt('Enter your name');

    if (userName.length !== 0) {
        socket.emit('newUserRegister', userName);

        localStorage.setItem('userName', JSON.stringify(userName));
     }
};

socket.on('connect', () => {
    document
        .getElementById('message-form')
        .addEventListener('submit', function (e) {
            e.preventDefault();
            const inpulElem = document.getElementById('userInput');
            const userInput = inpulElem.value.trim();
            inpulElem.value = '';
            const userName = JSON.parse(localStorage.getItem('userName'));
            const userId = JSON.parse(localStorage.getItem('userId'));
            setMessage(userInput, userName, userId, 'right');
            socket.emit('sendMessage', userInput, userName);
        });
    socket.on(JSON.parse(localStorage.getItem('userName')), (userID) => {
        localStorage.setItem('userId', JSON.stringify(userID));
    });
    function setMessage(msg, userName, userID, side) {
        const chatRoom = document.getElementById('chat-room');
        setTimeout(() => {
            const height = chatRoom.scrollHeight + 70;
            chatRoom.scrollTop = height;
        }, 5);
      
        chatRoom.innerHTML += `
        <div class="msg " id='${side}-msg' >
        <div class="msg-img" style="background-image: url(https://randomuser.me/api/portraits/men/${userID}.jpg)">
                  </div>
                  <div class="msg-bubble">
                    <div class="msg-info">
                      <div class="msg-info-name">
                        ${userName}
                      </div>
                    </div>
                    <pre class="msg-text">
                      ${msg}
                    </pre>
                  </div>
                </div>
  `;
    }
    socket.on('receivedMessage', (msg, userName, userID) => {
        setMessage(msg, userName, userID, 'left');
    });
});
