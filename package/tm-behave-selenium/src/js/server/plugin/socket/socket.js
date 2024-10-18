import { Server } from 'socket.io';

export async function startSocketServer (details = {}) {
  let { server } = details;
  let io;
  io = new Server (server, {
    cors: {
      origin: '*',
    }
  });
  io.on ('connection', createWebSocketConnectionHandler ());
}

function createWebSocketConnectionHandler (details = {}) {
  return async function webSocketConnectionHandler (socket) {
    let client;
    client = await createClient ({ socket });
    await addClientListeners ({ client });
    socket.emit ('hello', 'world');
  }
}

async function createClient (details = {}) {
  let { socket } = details;
  let client; 
  client = {
    reference: {
      socket,
    }
  }
  return client;
}

async function addClientListeners (details = {}) {
  let { app } = details;
  let socket;

  socket = await getClientWebSocket (details);
  // socket.on ('*', (arg) => {
  //   console.log ('HERE:', arg);
  // });
  socket.on ('howdy', (arg) => {
    console.log (arg);
  });
  socket.on ('thetrg/behave/autobot/driver/backend/action', async (details, callback) => {
    let result;
    result = await send (details);
    callback (result);
  });
}

function getClientWebSocket (details = {}) {
  let { client } = details;
  let socket;
  socket = client.reference.socket;
  return socket;
}
