// import cors from 'cors';
import bodyParser from 'body-parser';
import serveStatic from 'serve-static';
import { join } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer } from 'node:http';

import { mountSocket } from './socket/index.js';
import { mountApi } from './api/index.js';
import { mountWatcher } from './watcher/index.js';

export async function start () {
  let app, args, base, port, server;

  port = 5001;
  app = express ();
  // app.use (cors ());
  
  base = join (fileURLToPath (import.meta.url), '../../../../');
  if (process.platform === 'win32') {
    base = join (import.meta.url.substring (8), '../../../../').replace (/\\/g, '/');
  }
  console.log ('base:', base);

  app.use ('/', serveStatic (join (fileURLToPath (import.meta.url), '../../../../', 'public')));
//  app.use ('/asset', serveStatic (join (ASSETS_DIR)));
//  app.use ('/asset', serveStatic (join (ASSETS_DIR, 'vendor')));

  
  app.use (bodyParser.json ());
  
  // Allow for an SPA type of routing
  app.get('*', (req, res) => {
    //console.log (req.headers);
    if (req.headers ['accept'] === 'application/json' && req.headers ['content-type'] === 'application/json') {
      res.json ({
        status: {
          code: 404,
          message: 'resource not found',
        },
      });
    }
    else {
      res.sendFile(
        join (fileURLToPath (import.meta.url), '../../../../', 'public', 'index.html'),
      );
    }
  });
  
  server = createServer (app);

  args = {
    app,
    base,
    server,
  }
  
  await mountWatcher (args);
  await mountApi (args);
  await mountSocket (args);
  
  console.log (`- starting server on port: ${port}`);
  server.listen (port);
}
