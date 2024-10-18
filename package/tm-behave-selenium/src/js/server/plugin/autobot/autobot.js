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
import { startSocketServer } from '../socket/index.js';

const shared = {
  app: null,
}

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
