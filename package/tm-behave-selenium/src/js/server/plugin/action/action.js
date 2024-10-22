import {
  getApp,
} from '../autobot/index.js';
import {
  createSession,
  endSession,
  getSession,
  navigateToUrl,
  setSession,
  getTitle,
} from '../session/index.js';

listen ({
  path: 'thetrg/behave/autobot/driver/backend/session/navigation/go',
  async run (details = {}) {
    let { _extra, title, url } = details;
    let { result } = _extra;
    let session;

    try {
      await log ({ message: `- [ACTION] Navigating to the url: ${url}` });
      
      // Precondition checks
      session = await getSession (details);
      
      if (!url) { await addError ({ error: 'A target url was not provided', result, throw: true }); }

      // Run the code
      await navigateToUrl ({ session, url });
      if (title) {
      }
    }
    catch (err) {
      await addError ({ error: `Unable to navigate to the url: ${url}`, show: true, result, trace: err });
    }
  },
});

listen ({
  path: 'thetrg/behave/autobot/driver/backend/session/page/title',
  async run (details = {}) {
    let { _extra, title } = details;
    let { result } = _extra;
    let session;

    try {
      await log ({ message: `- [ACTION] Get page title: ${url}` });
      
      // Precondition checks
      session = await getSession (details);
       
      if (!title) { await addError ({ error: 'A page title to search for was not provided', result, throw: true }); }

      // Run the code
      await getTitle ({ session, title });
    }
    catch (err) {
      await addError ({ error: `Unable to get the page title: ${title}`, show: true, result, trace: err });
    }
  },
});

// -----------------------------------------------------------------------

listen ({
  path: 'thetrg/behave/autobot/driver/backend/session/end',
  async run (details = {}) {
    let app, hasSession, session;

    try {
      console.log (`- [ACTION] Attempting to end the active session`);
      hasSession = await checkIfActiveSession ();
      if (hasSession) {
        session = await getSession ();
        await endSession ({ session });
        
        app = await getApp ();
        app.reference.session = null;
        console.log ('- webdriver session is all done');
      }
      else {
        console.log ('- no active session to end');
      }
    }
    catch (err) {
      console.error (`ERROR: Unable able to end the session`);
      console.error (err);
    }
  },
});

listen ({
  path: 'thetrg/behave/autobot/driver/backend/session/start',
  async run (details = {}) {
    let { 
      name = 'un-named session',
      options = {
        headless: false,
      },
      url,
    } = details;
    let error, hasSession, session;

    try {
      console.log (`- [ACTION] Attempting to start an active session`);
      
      hasSession = await checkIfActiveSession ();
      if (hasSession) { throw new Error (`An existing session was found. Unable able to start a new session`) }

      session = await createSession ({ options });
      await setSession ({ session });

      if (url) {
        await send ({
          path: 'thetrg/behave/autobot/driver/backend/session/navigation/go',
          details: { url },
        })
      }
    }
    catch (err) {
      console.error (`ERROR: Unable able to start a new session`);
      console.error (err);
    }
  },
});

listen ({
  path: 'thetrg/behave/autobot/driver/backend/session/tab/open',
  async run (details = {}) {
    let { url } = details;
    let script, session;

    try {
      console.log (`- [ACTION] Opening a session tab`);
      session = await getSession ();
      script = createLoadTmBehaveScript ();
      await openNewTab ({ session, script, url: 'https://csszengarden.com' });
    }
    catch (err) {
      console.error (`ERROR: Unable to create a new tab`);
      console.error (err);
    }
  },
});

