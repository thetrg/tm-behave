import bind from 'simulacra';
import html from './kohi-runner-list.html?raw';
import './kohi-runner-list.less';
import { getRunnerById } from '../kohi-reporter-app/kohi-reporter-app.js';
import { createComponent } from '../componet.js';

export class KohiRunnerList extends HTMLElement {
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
    dom.className = 'kohi-runner-list component';
    dom.innerHTML = html;

    data = dom.component.data;
    template = this.querySelector ('.runner-template');
    node = bind (data, [template, {
      name: '[data-domo="bind: name"]',
      root: ['[data-domo="bind: root"]', (element, value) => {
        element.setAttribute ('data-id', value); 
      }],
    }]);
    dom.appendChild (node);
    // console.log (data)
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
