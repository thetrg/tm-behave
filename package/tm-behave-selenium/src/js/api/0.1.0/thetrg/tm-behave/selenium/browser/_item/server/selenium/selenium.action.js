import {
  getBrowser,
} from '@thetrg/tm-behave-autobot';

const LOG_PREFIX = '[ACTION] Selenium Browser - ';

listen ({
  path: 'api/0.1.0/thetrg/tm-behave/autobot/browser/_item/server/logic/open',
  async run (details = {}) {  
    let { _extra } = details;
    
    try {
      await log ({ message: `Open the Browser`, prefix: LOG_PREFIX });

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
      await addResultError ({ _extra, error: `Unable to open the browser`, prefix: LOG_PREFIX, show: true, trace: err });
    }
  },
});

