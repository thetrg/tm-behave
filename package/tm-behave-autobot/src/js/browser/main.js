import { setupSocketClient } from './service/index.js';
import './component/index.js';

export async function start () {
  let dom, parent;
  parent = document.querySelector ('body');
  if (parent) {
    await setupSocketClient ();
    dom = document.createElement ('behave-autobot-app');
    parent.appendChild (dom);
  }
}

start ();
