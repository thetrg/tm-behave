import bind from 'simulacra';
import html from './behave-autobot-app.html?raw';
import './behave-autobot-app.less';

// import { createComponent } from '../componet.js';
// import page from 'page.js';

import 'modern-normalize/modern-normalize.css';
import 'boxicons/css/boxicons.min.css';
import '@fontsource-variable/nunito';

// TODO: Remove this... !!!
import { runTest } from '../../sample/index.js';

export class BehaveAutobotApp extends HTMLElement {
  static get observedAttributes() {
    return ['data-id'];
  }

  constructor () {
    super ();
    // this.component = createComponent ({ dom: this });
  }

  connectedCallback() {
    // let data, node, template;
    let dom, target;

    dom = this;
    dom.className = 'behave-autobot-app component';
    dom.innerHTML = html;
    // setupRoutes ({ dom });

    try {
      dom.querySelector ('.body .start-session').addEventListener ('click', () => {
        sendCommand ({
          path: 'thetrg/behave/autobot/driver/backend/session/start',
          details: {
            url: 'https://csszengarden.com',
            // url: 'https://blender.org',
            // url: 'https://example.cypress.io',
            options: {
              headless: false,
            },
          },
        });
      });
      dom.querySelector ('.body .end-session').addEventListener ('click', () => {
        sendCommand ({
          path: 'thetrg/behave/autobot/driver/backend/session/end',
        });
      });
    }
    catch (err) {
      console.error (`Unable to add listeners to ui`);
      console.error (err);
    }
  }

  attributeChangedCallback(name, prev, value) {
    let { component } = this;
    let id, item;
    
    id = parseInt (value);
    if (!id) { id = 0; }

    if (name === 'data-id' && id !== component.id) {
      // component.id = id;
      // item = getRunnerById ({ id });
      // if (item) {
      //   component.data = item;
      // }
    }
  }
}
