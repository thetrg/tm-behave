import { io } from 'socket.io-client';

export async function startSocketClient (details = {}) {
  let socket;

  socket = io ('http://localhost:5100');
  socket.on ('hello', (arg) => {
    console.log (arg);
  });
  socket.emit ('howdy', 'stranger');
}
