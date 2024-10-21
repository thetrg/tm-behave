import {
  setTab,
} from './tab.js';

const LOG_PREFIX = '[ACTION] Tab - ';

listen ({
  path: 'api/0.1.0/thetrg/tm-behave/autobot/browser/tab/_item/common/open',
  async run (details = {}) {
    let { _extra } = details;
    let action;

    try {
      action = 'open a tab';
      await log ({ _extra, message: action, prefix: LOG_PREFIX });
      
      // -----------------------------------------
      // Pre condition checks
      let result, tab;
      
      // -----------------------------------------
      // Run the code
      result = await sendCommand ({
        path: 'api/0.1.0/thetrg/tm-behave/autobot/browser/_item/server/logic/open',
        details: { browser },
      });

      await log ({ _extra, message: 'RESULT: ' + result.asJson () });

      // -----------------------------------------
      // Post condition checks
    }
    catch (err) {
      await addResultError ({ _extra, error: `Unable to ${action}`, prefix: LOG_PREFIX, show: true, trace: err });
    }
  },
});
