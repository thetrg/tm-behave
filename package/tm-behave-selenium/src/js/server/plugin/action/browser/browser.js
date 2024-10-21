/**
  TODO: Create a parser for Graceful that will transform the AST for the code.
*/


/**
  Template for the actions
*/
listen ({
  path: 'backend/thetrg/behave/autobot/browser/open',
  async run (details = {}) {  
    let { _extra, title } = details;
    let { result } = _extra;
    
    try {
      await log ({ message: `- [ACTION] Open the Browser` });
      
      // -----------------------------------------
      // Pre condition checks
      let browser;
      browser = await getBrowser (details);

      // -----------------------------------------
      // Run the code
      
      // -----------------------------------------
      // Post condition checks
    }
    catch (err) {
      await addError ({ error: `Unable to open the browser`, show: true, result, trace: err });
    }
  },
});

/*
//      await getTitle ({ session, title });

//  path: 'thetrg/behave/autobot/browser/frontend/create',
//  path: 'thetrg/behave/autobot/browser/backend/create',
//  
//  path: '@backend/thetrg/behave/autobot/browser/create',
//  path: '@frontend/thetrg/behave/autobot/browser/create',
//  
//  path: '~/frontend/thetrg/behave/autobot/browser/create',
//  path: '~/backend/thetrg/behave/autobot/browser/create',
//  path: 'frontend/thetrg/behave/autobot/browser/create',
*/
