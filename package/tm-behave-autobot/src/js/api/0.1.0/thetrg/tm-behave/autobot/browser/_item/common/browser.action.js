import {
  setBrowser,
} from './browser.js';
import {
  addResultError,
  getItemFromForwardResult,
  listen,
  log,
} from '@thetrg/tm-message';

const LOG_PREFIX = '[ACTION] Browser - ';

listen ({
  path: 'api/0.1.0/thetrg/tm-behave/autobot/browser/_item/common/open',
  async run (details = {}) {  
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
      await log ({ _extra, message: 'BROWSER: ' + browser.asJson () });

      // -----------------------------------------
      // Post condition checks
    }
    catch (err) {
      await addResultError ({ _extra, error: `Unable to ${action}`, prefix: LOG_PREFIX, show: true, trace: err });
    }
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
