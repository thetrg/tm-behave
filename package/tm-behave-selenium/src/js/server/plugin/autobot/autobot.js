// ----------------------------------------------
// Browser Based Behave Web Driver 
/*
  - Things like Selenium or Web Driver will be plugins / drivers
*/

// ----------------------------------------------
// Server
import Express from 'express';
import http from 'http';
import cors from 'cors';

export async function createAutobotApp (details = {}) {
  let app, express, port, server;

  express = Express ();
  express.use (cors ());

  express.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
  });

  server = http.createServer (express);

  app = {
    data: {
      id: Date.now (),
    },
    reference: {
      express,
      server,
    }
  }

  if (!shared.app) {
    shared.app = app;
  }

  await startSocketServer ({ server });

  port = 5201;
  server.listen (port, () => {
    console.log (`- server is running on port: ${port}`);
  })

  return app;
}

export async function getApp (details = {}) {
  let app;
  app = shared.app;
  if (!app) {
    app = createAutobotApp ();
    shared.app = app;
  }
  return app;
}

const shared = {
  app: null,
}


// ----------------------------------------------
// Socket communication
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
  socket.on ('thetrg/behave/autobot/driver/backend/action', (details) => {
    send (details);
  });
}

function getClientWebSocket (details = {}) {
  let { client } = details;
  let socket;
  socket = client.reference.socket;
  return socket;
}
