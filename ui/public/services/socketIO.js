import openSocket from 'socket.io-client';
let socket = {};

function subscribeToNews(callback) {
    socket = openSocket('http://localhost:3000');
    socket.on('timer', (data) => {
        console.log(data);
        callback(data);
    });
}

function subscribeToTwitter(callback) {
    socket = openSocket('http://localhost:3000');
    socket.on('twitter', (data) => {
        console.log(data);
        callback(data);
    });
}

function closeSocket() {
    socket.close();
}

export { subscribeToNews, closeSocket, subscribeToTwitter };