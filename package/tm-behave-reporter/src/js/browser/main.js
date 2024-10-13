import './component/index.js';
import './index.less';

function start () {
  let dom, parent;
  parent = document.querySelector ('#app');
  if (parent) {
    dom = document.createElement ('kohi-reporter-app');  
    parent.appendChild (dom);
  }
}

start ();

/*
import javascriptLogo from '/image/javascript.svg';
import viteLogo from '/image/vite.svg';
import { setupCounter } from './counter.js';

import '@shoelace-style/shoelace/dist/shoelace.js';
import '@shoelace-style/shoelace/dist/themes/light.css';
import './index.less';

function start () {
  let value = 23;
  document.querySelector('#app').innerHTML = `
    <div>
      <a href="https://vite.dev" target="_blank">
        <img src="${viteLogo}" class="logo" alt="Vite logo" />
      </a>
      <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
        <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
      </a>
      <h1>Hello Vite!</h1>
      <div class="card">
        <sl-button>Counter ${value}</sl-button>
        <button id="counter" type="button"></button>
      </div>
      <p class="read-the-docs">
        Click on the Vite logo to learn more
      </p>
    </div>
  `
  setupCounter(document.querySelector('#counter'))

  setTimeout (() => {
    console.log ('- Get from api:');
  }, 1000);
}

start ();
*/
