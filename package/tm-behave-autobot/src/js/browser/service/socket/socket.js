import {
  listen,
} from '@thetrg/tm-message';
import { io } from 'socket.io-client';

export async function setupSocketClient (details = {}) {
  let port, socket, url;

  port = 5201;
  url = `ws://localhost:${port}`;
  socket = io (url);

  socket.on ('hello', (arg) => {
    // console.log (arg);
  });
  socket.emit ('howdy', 'stranger');
  console.log ('- socket setup', Date.now ());

  listen ({
    // path: 'api/0.1.0/graceful/message/_item/common/forward',
    path: 'api/0.1.0/tm/message/socket/action/_item/common/forward',
    run (details = {}) {
      let { details: nested, path } = details;
      return new Promise ((done, cancel) => {
        try {
          socket.emit ('api/0.1.0/tm/message/socket/action/_item/common/forward', { 
          // socket.emit ('api/0.1.0/graceful/message/_item/common/forward', { 
            path,
            details: nested,
          }, (response) => {
            done (response);
          });
        }
        catch (err) {
          cancel (err);
        }
      })
    },
  });  
}
