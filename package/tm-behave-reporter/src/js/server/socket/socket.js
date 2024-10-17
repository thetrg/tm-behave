import { Server } from 'socket.io';


export async function mountSocket (details = {}) {
  let { app, server } = details;
  let io;

  io = new Server (server);
  
  io.on ('connection', (socket) => {
    socket.emit ('hello', 'world');
    socket.on ('howdy', (args) => {
      console.log ('- [WEB SOCKET SERVER]', args);
    });
  });
}
