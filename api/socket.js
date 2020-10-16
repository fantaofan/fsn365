import io from 'socket.io';

const socket = io('https://api.fsn365.com', {
    path: '/network'
});

console.log(socket);