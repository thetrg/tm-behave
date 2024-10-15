import bind from 'simulacra';
import html from './behave-reporter-app.html?raw';
import './behave-reporter-app.less';
import { createComponent } from '../componet.js';
import page from 'page.js';

import 'modern-normalize/modern-normalize.css';
import 'boxicons/css/boxicons.min.css';
import '@fontsource-variable/nunito';

const shared = {
  templates: {},
}

const HTML_TEMPLATE_ERROR = `
<div class="error invalid html template">
  <h3 class="title">The component does not have a valid HTML template.</h3>
</div>
`;

export function getHtmlTemplate (details = {}) {
  let { html, name } = details;
  name = name.toLowerCase ();
  html = shared.templates [name];
  if (!html) {
    html = HTML_TEMPLATE_ERROR;
  }
  return html;
}

export function setHtmlTemplate (details = {}) {
  let { html, name = '' } = details;
  name = name.toLowerCase ();
  if (!shared.templates [name] && html) {
    shared.templates [name] = html;
  }
}

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
    setupRoutes ({ dom });
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

function setupRoutes (details = {}) {
  let { dom } = details;
  let target;
  
  target = dom.querySelector ('.app.route.view');
  if (target) {
    page ('/', () => {
      let html;
      html = TEMPLATE;
      target.innerHTML = html;
    });
    page ('/report/:name', function (context, next) {
      let { params } = context;
      let { name } = params;
      target.innerHTML = `<behave-reporter data-name="${name}"></behave-reporter>`;
    });
    page ('*', () => {
      target.innerHTML = PAGE_NOT_FOUND_TEMPLATE;
    });
    page.start ();
  }
  else {
    throw new Error ('Unable to find app route view area.');
  }
}

const PAGE_NOT_FOUND_TEMPLATE = `
<div class="page error">
  <h2>Error: Page Not Found</h2>
</div>
`;

const TEMPLATE = `
<ul class="report listing">
    <li><a class="ui button" href="/report/report-sample-1">Report Sample 1</a></li>
    <li><a class="ui button" href="/report/report-sample-2">Report Sample 2</a></li>
    <li><a class="ui button" href="/report/report-sample-3">Report Sample 3</a></li>
  </ul>
`;

