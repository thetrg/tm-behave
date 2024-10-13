import bind from 'simulacra';
import html from './kohi-reporter-app.html?raw';
import 'boxicons/css/boxicons.min.css';
import './kohi-reporter-app.less';
import { SAMPLE_RUNNER_DATA } from './data.mock.js';

// Use the uikit library
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import 'uikit/dist/css/uikit.min.css';

UIkit.use (Icons);

export class KohiReporterApp extends HTMLElement {
  connectedCallback() {
    // browser calls this method when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)

    let data, dom, node, parent, tabs, template;
    dom = this;
    dom.className = 'kohi-reporter-app component';
    dom.innerHTML = html;

    data = {
      label: 'Kohi Report',
      time: Date.now (),
      cards: [
        { label: 'fail', total: 10 },
        { label: 'pass', total: 100 },
        { label: 'todo', total: 100 },
        { label: 'total', total: 210 },
      ],
      runner: SAMPLE_RUNNER_DATA,
      specs: {
        name: '',
        children: [
          { name: '' },
        ]
      },
    }

    setInterval (() => {
      data.time = Date.now ();
    }, 1000);
    
    // Summary Area
    template = dom.querySelector ('#card-template');
    node = bind (data, [template, {
      cards: ['[data-domo="bind: card"]', {
        label: '[data-domo="bind: label"]',
        total: '[data-domo="bind: total"]',
      }, (element, value) => {
        element.className = `${element.className} ${value.label}`; 
      }],
    }]);
    parent = dom.querySelector ('#summary-area');
    parent.appendChild (node);
    
    // // Set the current tab
    // tabs = dom.querySelector ('#main-tab');
    // UIkit.tab (tabs).show (1);
  }
}
