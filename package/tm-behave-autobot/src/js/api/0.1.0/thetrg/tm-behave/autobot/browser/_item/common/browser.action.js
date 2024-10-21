import {
  setBrowser,
} from './browser.js';

const LOG_PREFIX = '[ACTION] Browser - ';

listen ({
  path: 'api/0.1.0/thetrg/tm-behave/autobot/browser/_item/common/logic/open',
  async run (details = {}) {  
    let { _extra } = details;
    
    try {
      await log ({ message: `Open the Browser`, prefix: LOG_PREFIX });
      
      // -----------------------------------------
      // Pre condition checks
      let browser, result;
      
      // -----------------------------------------
      // Run the code
      result = await sendCommand ({
        path: 'api/0.1.0/thetrg/tm-behave/autobot/browser/_item/server/logic/open',
        details: { browser },
      });

      browser = await setBrowser ({
        browser: result,
      });
      log ({ message: 'BROWSER:', list: [browser.asJson ()] });

      // -----------------------------------------
      // Post condition checks
    }
    catch (err) {
      await addResultError ({ _extra, error: `Unable to open the browser`, prefix: LOG_PREFIX, show: true, trace: err });
    }
  },
});

