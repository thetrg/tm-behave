import bind from 'simulacra';
import html from './kohi-spec-list-item.html?raw';
import './kohi-spec-list-item.less';
import { getItemFromRunnerRegistry } from '../kohi-reporter-app/kohi-reporter-app';
import { createComponent } from '../componet.js';

export class KohiSpecListItem extends HTMLElement {
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
    dom.className = 'kohi-spec-list-item component';
    dom.innerHTML = html;

    data = dom.component.data;
    template = this.querySelector ('.spec-template');
    node = bind (data, [template, {
      name: ['[data-domo="bind: name"]', (element) => {
        setTimeout (() => {
          createClickHandler ({ dom: element.parentNode });
        }, 1)
      }],
      children: ['[data-domo="bind: child-spec"]', (element, value) => {
        let item;

        item = document.createElement ('kohi-spec-list-item');
        item.setAttribute ('data-id', value);

        element.setAttribute ('data-spec-id', value);
        element.appendChild (item);
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
      item = getItemFromRunnerRegistry ({ id });
      if (item) {
        component.data = item;
      }
    }
  }
}

function createClickHandler (details = {}) {
  let { dom } = details;
  dom.addEventListener ('click', function clickHandler () {
    let frame, parent;
    
    parent = dom.parentNode.querySelector ('.body');
    if (!dom.classList.contains ('open')) {
      frame = document.createElement ('iframe');
      frame.src = 'https://boxicons.com/?query=info';
      if (parent) {
        parent.appendChild (frame);
      }
      console.log ('cool...', );
    }
    else {
      frame = parent.querySelector ('iframe');
      parent.remove (frame);
    }
    dom.classList.toggle ('open');
  });
}