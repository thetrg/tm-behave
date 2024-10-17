import { io } from 'socket.io-client';

export async function startSocketClient () {
  let mod, socket;
  
  try {
//    mod = await import ('http://localhost:5001/socket.io/socket.io.js');
    socket = io ('ws://localhost:5001');
    
    socket.on ('hello', (arg) => {
      console.log ('[WEB SOCKET CLIENT]', arg);
    });
    socket.emit ('howdy', 'stranger');
  }
  catch (err) {
    console.error (err);
  }
}
