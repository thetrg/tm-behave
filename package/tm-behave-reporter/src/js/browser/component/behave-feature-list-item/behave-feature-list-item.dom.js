import bind from 'simulacra';
import html from './behave-feature-list-item.html?raw';
import './behave-feature-list-item.less';
import { createComponent } from '../componet.js';
import { 
  getHtmlTemplate,
  setHtmlTemplate,
} from '../behave-reporter-app/behave-reporter-app.dom.js';
import { getSpecById } from '../../service/data.js';

export class BehaveFeatureListItem extends HTMLElement {
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
    dom.className = 'behave-feature-list-item component';

    // Attached the reactive template
    template = document.createElement ('template');
    template.innerHTML = html;

    node = bind (dom.component.data, [template, {
      'name': ['[data-domo="bind: name"]', function (element, value) {
        value = value
          .replace (/\$\{/g, '<span class="param">"')
          .replace (/\}/g, '</span>"');
        
        element.innerHTML = value;
      }],
      'keyword': '[data-domo="bind: keyword"]',
      'children': ['[data-domo="bind: children"]', function (element, value) {
        element.setAttribute ('data-id', value);        
      }],
    }]);
    dom.appendChild (node);

    if (dom.component.data.children && !dom.component.data.children.length) {
      dom.classList.add ('no-children');
    }

    // Add event listeners
    addListeners ({ dom });
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
        component.data = item;
      }
    }
    else if (name === 'data-name') {
      // value = value.replace (/\-/g, ' ');
      // component.data.name = value;
    }
  }
}


function addListeners (details = {}) {
  let { dom } = details;
  let target;

  target = dom.querySelector ('.header');
  if (target) {
    target.addEventListener ('click', function (event) {
      dom.classList.toggle ('show-children');
    });
  }
}
