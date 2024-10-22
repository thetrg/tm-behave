import {
  getBrowser,
} from '@thetrg/tm-behave-autobot';
import {
  closeBrowser,
  openBrowser,
} from './selenium.js';
import {
  addResultError,
  addResultItem,
  listen,
  log,
} from '@thetrg/tm-message';

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
      if (browser.data.running === false) {
        await log ({ _extra, message: 'Opening the selenium browser' });
        await openBrowser ({ browser });
        await log ({ _extra, message: 'BROWSER: ' + browser.asJson () });
      }
      else {
        await addResultError ({ _extra, message: 'A browser is already open', prefix: LOG_PREFIX, trace: err });
      }

      // -----------------------------------------
      // Post condition checks
      addResultItem ({
        _extra,
        item: browser,
      });
    }
    catch (err) {
      await addResultError ({ _extra, error: `Unable to ${action}`, prefix: LOG_PREFIX, trace: err });
    }
  },
});


listen ({
  path: 'api/0.1.0/thetrg/tm-behave/autobot/browser/_item/server/logic/close',
  async run (details = {}) {  
    let { _extra } = details;
    let action;

    try {
      action = 'close the browser';
      await log ({ _extra, message: action, prefix: LOG_PREFIX });
      
      // -----------------------------------------
      // Pre condition checks
      let browser;
      
      // -----------------------------------------
      // Run the code
      browser = await getBrowser (details);
      // if (browser.data.running === !true) {
      //   await log ({ _extra, message: 'Closing the selenium browser' });
      //   await closeBrowser ({ browser });
      // }
      // else {
        await addResultError ({ _extra, message: 'There is no open browser to close', prefix: LOG_PREFIX, trace: err });
      // }
      
      // -----------------------------------------
      // Post condition checks
      addResultItem ({
        _extra,
        item: browser,
      });
    }
    catch (err) {
      await addResultError ({ _extra, error: `Unable to ${action}`, prefix: LOG_PREFIX, trace: err });
    }
  },
});
