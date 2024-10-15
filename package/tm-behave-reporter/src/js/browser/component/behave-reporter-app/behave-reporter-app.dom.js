import bind from 'simulacra';
import html from './behave-reporter-app.html?raw';
import './behave-reporter-app.less';
import { createComponent } from '../componet.js';

import 'boxicons/css/boxicons.min.css';

// Use the uikit library
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import 'uikit/dist/css/uikit.min.css';

export class BehaveReporterApp extends HTMLElement {
  static get observedAttributes() {
    return ['data-id'];
  }

  constructor () {
    super ();
    this.component = createComponent ({ dom: this });
  }

  connectedCallback() {
    let data, node, template;
    let dom;

    dom = this;
    dom.className = 'behave-reporter-app component';
    dom.innerHTML = html;
  }

  attributeChangedCallback(name, prev, value) {
    let { component } = this;
    let id, item;
    
    id = parseInt (value);
    if (!id) { id = 0; }

    if (name === 'data-id' && id !== component.id) {
      component.id = id;
      item = getRunnerById ({ id });
      if (item) {
        component.data = item;
      }
    }
  }
}
