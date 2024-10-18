import { testDriver } from './service/index.js';
import { startSocketClient } from './socket.js';
import './index.css';

export async function start () {
  await startSocketClient ();
  await testDriver ();
}

start ();
