import { io } from 'socket.io-client';

export async function setupSocketClient (details = {}) {
  let port, socket, url;

  port = 5201;
  url = `ws://localhost:${port}`;
  socket = io (url);

  socket.on ('hello', (arg) => {
    console.log (arg);
  });
  socket.emit ('howdy', 'stranger');
  console.log ('- socket setup', Date.now ());

  listen ({
    path: 'ui/thetrg/behave/autobot/driver/action',
    run (details = {}) {
      let { details: nested, path } = details;
      return new Promise ((done, cancel) => {
        try {
          socket.emit ('thetrg/behave/autobot/driver/backend/action', { 
            path,
            details: nested,
          }, (response) => {
            console.log ('*** GOT BACK ***', response)
            done ();
          });
        }
        catch (err) {
          cancel (err);
        }
      })
    },
  });  
}
