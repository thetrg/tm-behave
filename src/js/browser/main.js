import { run } from '@/common/index.js';
import './index.css';

async function start () {
  let mod, params;

  params = parseQueryString ();
  if (params.mode === 'feature') {
    mod = await import ('~/package/tm-behave-feature/index.spec.js');
  }
  else {
    mod = await import ('@/common/index.spec.js');
  }
  run ();
}

start ();

function parseQueryString () {
  let end, i, item, list, result, url;
  result = {};
  url = location.search;
  if (url) {
    list = url.substring (1).split('&');
    end = list.length;
    for (i = 0; i < end; i++) {
      item = list [i];
      item = item.split ('=', 2);
      result [item [0]] = item [1];
      // console.log (item);
    }
    // console.log (url, list, result);
  }
  return result;
}

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
