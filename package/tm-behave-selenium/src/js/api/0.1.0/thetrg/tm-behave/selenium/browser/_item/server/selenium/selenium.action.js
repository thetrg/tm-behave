import {
  getBrowser,
} from '@thetrg/tm-behave-autobot';
import {
  closeBrowser,
  openBrowser,
} from './selenium.js';

const LOG_PREFIX = '[ACTION] Selenium Browser - ';

listen ({
  path: 'api/0.1.0/thetrg/tm-behave/autobot/browser/_item/server/logic/open',
  async run (details = {}) {  
    let { _extra } = details;
    let action;

    try {
      action = 'open a browser';
      await log ({ _extra, message: action, prefix: LOG_PREFIX });

      // -----------------------------------------
      // Pre condition checks
      let browser;
      
      // -----------------------------------------
      // Run the code
      browser = await getBrowser (details);
      console.log (browser);
      
      // -----------------------------------------
      // Post condition checks
      addResultItem ({
        _extra,
        item: browser,
      });
    }
    catch (err) {
      await addResultError ({ _extra, error: `Unable to ${action}`, prefix: LOG_PREFIX, show: true, trace: err });
    }
  },
});

listen ({
  path: 'api/0.1.0/thetrg/tm-behave/autobot/browser/_item/server/logic/open',
  async run (details = {}) {  
    let { _extra } = details;
    let action;

    try {
      action = 'open a browser';
      await log ({ _extra, message: action, prefix: LOG_PREFIX });

      // -----------------------------------------
      // Pre condition checks
      let browser;
      
      // -----------------------------------------
      // Run the code
      browser = await getBrowser (details);
      console.log (browser);
      
      // -----------------------------------------
      // Post condition checks
      addResultItem ({
        _extra,
        item: browser,
      });
    }
    catch (err) {
      await addResultError ({ _extra, error: `Unable to ${action}`, prefix: LOG_PREFIX, show: true, trace: err });
    }
  },
});

