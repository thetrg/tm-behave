import bind from 'simulacra';
import html from './behave-feature-list.html?raw';
import './behave-feature-list.less';
import { createComponent } from '../componet.js';
import { 
  getHtmlTemplate,
  setHtmlTemplate,
} from '../behave-reporter-app/behave-reporter-app.dom.js';
import { getSpecById } from '../../service/data.js';

export class BehaveFeatureList extends HTMLElement {
  static get observedAttributes() {
    return ['data-id'];
  }

  constructor () {
    super ();
    this.component = createComponent ({ dom: this });
    setHtmlTemplate ({ html, name: this.tagName });
  }

  connectedCallback() {
    let dom, html, node, template;

    html = getHtmlTemplate ({ name: this.tagName });
    dom = this;
    dom.className = 'behave-feature-list component';

    // Attached the reactive template
    template = document.createElement ('template');
    template.innerHTML = html;

    node = bind (dom.component.data, [template, {
      // 'keyword': '[data-domo="bind: keyword"]',
      // 'name': '[data-domo="bind: name"]',
      'children': ['[data-domo="bind: children"]', function (element, value) {
        element.setAttribute ('data-id', value);
      }],
    }]);
    dom.appendChild (node);
  }

  attributeChangedCallback(name, prev, value) {
    let { component } = this;
    let id, item;
    
    id = parseInt (value);
    if (!id) { id = 0; }

    if (name === 'data-id' && id !== component.id) {
      component.id = id;
      item = getSpecById ({ id });
      if (item) {
        console.log (item);
        component.data = item;
      }
    }
    else if (name === 'data-name') {
      // value = value.replace (/\-/g, ' ');
      // component.data.name = value;
    }
  }
}