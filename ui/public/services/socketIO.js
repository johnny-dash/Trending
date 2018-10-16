import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3000');


function subscribeToNews(callback) {
    socket.on('timer', (data) => {
        console.log(data);
        callback(data);
    });
}

export { subscribeToNews };