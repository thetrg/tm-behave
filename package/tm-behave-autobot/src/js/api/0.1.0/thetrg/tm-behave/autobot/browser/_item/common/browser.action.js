import {
  setBrowser,
} from './browser.js';
import {
  addResultError,
  checkForErrors,
  getItemFromForwardResult,
  listen,
  log,
} from '@thetrg/tm-message';

const LOG_PREFIX = '[ACTION] Browser - ';

listen ({
  path: 'api/0.1.0/thetrg/tm-behave/autobot/browser/_item/common/open',
  prefix: LOG_PREFIX,
  note: 'Open a browser',
  before (details = {}) {
    // Pre condition checks
    let browser, result;
  },
  async run (details = {}) {
    let { browser, result } = details;    

    browser = await getItemFromForwardResult ({
      path: 'api/0.1.0/thetrg/tm-behave/autobot/browser/_item/server/logic/open',
      details: { 
        browser: {
          data: {
            options: {
              headless: { active: !false, value: '--headless' },
            }
          }
        }
      },
    });
  
    result = await setBrowser ({
      browser: result,
    });
  
    /*
    let { _extra } = details;
    let action;

    try {
      action = 'open a browser';
      await log ({ _extra, message: action, prefix: LOG_PREFIX });
      
      // -----------------------------------------
      // Pre condition checks
      let browser, result;
      
      // -----------------------------------------
      // Run the code
      result = await getItemFromForwardResult ({
        path: 'api/0.1.0/thetrg/tm-behave/autobot/browser/_item/server/logic/open',
        details: { 
          browser: {
            data: {
              options: {
                headless: { active: !false, value: '--headless' },
              }
            }
          }
        },
      });
      
      browser = await setBrowser ({
        browser: result,
      });

      // -----------------------------------------
      // Post condition checks
      checkForErrors ({ items: [browser] });
    }
    catch (err) {
      await addResultError ({ _extra, error: `Unable to ${action}`, prefix: LOG_PREFIX, show: true, trace: err });
    }
    */
  },
  after (details = {}) {
    // Post condition checks
    checkForErrors ({ items: [browser] });
  },
});

listen ({
  path: 'api/0.1.0/thetrg/tm-behave/autobot/browser/_item/common/close',
  async run (details = {}) {  
    let { _extra } = details;
    let action;

    try {
      action = 'close the browser';
      await log ({ _extra, message: action, prefix: LOG_PREFIX });
      
      // -----------------------------------------
      // Pre condi-tion checks
      let browser, result;
      
      // // -----------------------------------------
      // // Run the code
      // result = await sendCommand ({
      //   path: 'api/0.1.0/thetrg/tm-behave/autobot/browser/_item/server/logic/close',
      //   details: { browser },
      // });

      // browser = await setBrowser ({
      //   browser: result,
      // });
      // console.log (browser);
      // await log ({ _extra, message: 'BROWSER:', list: [browser.asJson ()] });

      // -----------------------------------------
      // Post condition checks
    }
    catch (err) {
      await addResultError ({ _extra, error: `Unable to ${action}`, prefix: LOG_PREFIX, show: true, trace: err });
    }
  },
});
