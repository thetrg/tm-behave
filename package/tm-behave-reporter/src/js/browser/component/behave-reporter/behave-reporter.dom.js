import bind from 'simulacra';
import html from './behave-reporter.html?raw';
import './behave-reporter.less';
import { createComponent } from '../componet.js';
import { 
  getHtmlTemplate,
  setHtmlTemplate,
} from '../behave-reporter-app/behave-reporter-app.dom.js';
import { 
  getSpecById,
  getRunner,
} from '../../service/index.js';

export class BehaveReporter extends HTMLElement {
  static get observedAttributes() {
    return ['data-id', 'data-name'];
  }

  constructor () {
    super ();
    this.component = createComponent ({ dom: this });
    setHtmlTemplate ({ html, name: this.tagName });
  }

  connectedCallback() {
    let dom, html, node, runner, template;

    html = getHtmlTemplate ({ name: this.tagName });
    dom = this;
    dom.className = 'behave-reporter component';

    // Attached the reactive template
    template = document.createElement ('template');
    template.innerHTML = html;

    runner = getRunner ();
    // dom.component.data.runner = runner;
    // console.log ('TRACE:', runner);

    node = bind (dom.component.data, [template, {
      'name': '[data-domo="bind: name"]',
    }]);
    dom.appendChild (node);

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

function addListeners (details = {}) {
  let { dom } = details;
  let target;

  target = dom.querySelector ('.ui.checkbox.toggle.coverage');
  if (target) {
    target.addEventListener ('click', function (event) {
      toggleCodeCoveragePreview ({ dom, event });
    });
  }

  target = dom.querySelector ('.ui.tab.button.feature');
  if (target) {
    target.addEventListener ('click', function (event) {
      showTabPanel ({ dom, event, select: '.feature' });
    });
  }

  target = dom.querySelector ('.ui.tab.button.spec');
  if (target) {
    target.addEventListener ('click', function (event) {
      showTabPanel ({ dom, event, select: '.spec' });
    });
  }
}

function toggleCodeCoveragePreview (details = {}) {
  let { dom, event } = details;
  let { target } = event;
  let input;

  input = target.parentNode.querySelector ('input');
  if (target !== input) {
    input.checked = !input.checked;
  }

  target = dom.querySelector ('.body > .sidebar');
  if (target) {
    if (input.checked) {
      target.classList.remove ('hide');
    }
    else {
      target.classList.add ('hide');
    }
  }
}

function showTabPanel (details = {}) {
  let { dom, select } = details;
  let target, panels;

  if (select) {
    target = dom.querySelector (`.ui.tab.panels${select}`);
    if (target) {
      panels = dom.querySelectorAll (`.ui.tab.panels`);
      panels.forEach ((panel) => {
        panel.classList.add ('hide');
      });
      target.classList.remove ('hide');
    }
  }
}
