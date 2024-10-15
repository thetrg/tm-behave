import bind from 'simulacra';
import html from './behave-reporter.html?raw';
import './behave-reporter.less';
import { createComponent } from '../componet.js';

export class BehaveReporter extends HTMLElement {
  static get observedAttributes() {
    return ['data-id', 'data-name'];
  }

  constructor () {
    super ();
    this.component = createComponent ({ dom: this });
  }

  connectedCallback() {
    let data, node, template;
    let dom;

    dom = this;
    dom.className = 'behave-reporter component';
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
    else if (name === 'data-name') {
      value = value.replace (/\-/g, ' ');
      component.data.name = value;
    }
  }
}
