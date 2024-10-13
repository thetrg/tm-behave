import { run } from '@/common/index.js';
import '@/common/index.spec.js';
import './index.css';

function start () {
  console.log ('- started again 12345')
  run ();
}

start ();

/*
import javascriptLogo from '/image/javascript.svg';
import viteLogo from '/image/vite.svg';
import { setupCounter } from './counter.js';
import { run, specs } from '@/common/index.js';
import './index.css';

function start () {
  specs ({
    'sample spec 1': {
      // 'before all': () => {},
      // 'before each': () => {},
      // 'after all': () => {},
      // 'after each': () => {},
      'sample spec 1/1': () => {
        expect (1).is (1)
      },
      'sample spec 1/2': async () => {
        expect (1).isNot (2)
      },
      'sample spec 1/3': {
        'sample spec 1/3/1': {
          'sample spec 1/3/1/1': () => {},
        }
      },
    },
    'sample spec 2': async () => {},
    'sample spec 3': () => {},
  });

  run ();

  // document.querySelector('#app').innerHTML = `
  //   <div>
  //     <a href="https://vite.dev" target="_blank">
  //       <img src="${viteLogo}" class="logo" alt="Vite logo" />
  //     </a>
  //     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
  //       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
  //     </a>
  //     <h1>Hello Vite!</h1>
  //     <div class="card">
  //       <button id="counter" type="button"></button>
  //     </div>
  //     <p class="read-the-docs">
  //       Click on the Vite logo to learn more
  //     </p>
  //   </div>
  // `
  // setupCounter(document.querySelector('#counter'))
}
*/
