import {
  getApp,
} from '../autobot/index.js';
import {
  checkIfActiveSession,
  createSession,
  endSession,
  getSession,
  navigateToUrl,
  setSession,
} from '../session/index.js';

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
    let hasSession, session;

    try {
      console.log (`- [ACTION] Attempting to start an active session`);
      hasSession = await checkIfActiveSession ();
      if (!hasSession) {
        session = await createSession ({ options });
        await setSession ({ session });

        if (url) {
          await send ({
            path: 'thetrg/behave/autobot/driver/backend/session/navigation/go',
            details: { url },
          })
        }
      }
    }
    catch (err) {
      console.error (`ERROR: Unable able to start a new session`);
      console.error (err);
    }
  },
});

listen ({
  path: 'thetrg/behave/autobot/driver/backend/session/navigation/go',
  async run (details = {}) {
    let { url } = details;
    let session;

    try {
      console.log (`- [ACTION] Navigating to the url: ${url}`);
      session = await getSession ();
      await navigateToUrl ({ session, url });
    }
    catch (err) {
      console.error (`ERROR: Unable to navigate to the url: ${url}`);
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
