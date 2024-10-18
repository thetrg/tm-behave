import {
  getApp,
} from '../autobot/index.js';

export async function checkIfActiveSession (details = {}) {
  let { app = await getApp () } = details;
  let session;
  session = app.reference.session;
  if (session) { return true; }
  return false;
}

export async function getSession (details = {}) {
  let { app = await getApp () } = details;
  let session;
  session = app.reference.session;
  // console.log ('- get session trace:', app.reference.session);
  return session;
}

export async function setSession (details = {}) {
  let { app = await getApp (), session } = details;

  if (session) {
    if (!app.reference.session) {
      app.reference.session = session;
    }
    else {
      throw new Error ('- App already has a session set');
    }
  }
  return session;
}

// ----------------------------------------------
// Sample 
import Mustache from 'mustache';

/*
await startSession ({
  name: 'Some session name...',
  options: {
    headless: false,
  },
  async run (details = {}) {
    let { session } = details;
    let script;

    shared.session = session;

    await goToUrl ({ session, url: 'http://localhost:5200' });
    
    // // Create the behave load script
    // script = createLoadTmBehaveScript ();
    // await openNewTab ({ session, script, url: 'https://csszengarden.com' });

    // await runScript ({ session });

    // await session.reference.driver.switchTo ().newWindow ('tab');
    // await goToUrl ({ session, url: 'https://csszengarden.com' });
    // session.reference.driver.executeScript (loadTmBehave ());
    
    // await goToUrl ({ session, url: 'https://csszengarden.com' });
    // await goToUrl ({ session, url: 'https://reactcosmos.org/demo/renderer?fixtureId=%7B%22path%22%3A%22src%2Fcomponents%2FTodoApp.fixture.tsx%22%7D' });

    // await getTitle ({ session, title: 'blender.org' });
    // await select ({ session, target: 'button.car' });

    await pause ({ session, delay: (1000 * 1) });
  }
});
}
*/

// ----------------------------------------------------
/*
//    driver = await new Builder ().forBrowser (Browser.FIREFOX).build ();
    await driver.get ('https://blender.org');
    await driver.wait (until.tileIs ('blend.org'), 1000);
    await driver.findElement (
//    await driver.findElement (By.name('q')).sendKeys('webdriver', Key.RETURN);
//    await driver.wait (until.titleIs('webdriver - Google Search'), 1000);
//    await driver.quit ();
*/    

// ----------------------------------------------
// Load the TM Behave system

function createLoadTmBehaveScript (details = {}) {
  let { port = 5100 } = details;
  let script;
  script = Mustache.render (LOAD_TM_BEHAVE_JS, { port });
  return script;
}

const LOAD_TM_BEHAVE_JS = `
function startClient () {
  let dom;
  dom = document.createElement ('script');
  dom.type = 'module';
  dom.src = 'http://localhost:{{port}}/main.js';
  document.body.appendChild (dom);
}

startClient ();
`;

// ----------------------------------------------
// Library JS API Wrapper
import { Browser, Builder, By, Key, until } from 'selenium-webdriver';
import firefox from 'selenium-webdriver/firefox.js';

//const SESSION_SEARCH_TIMEOUT = 30;
const SESSION_SEARCH_TIMEOUT = 1;

export async function createSession (details = {}) {
  let { options = { } } = details;
  let { headless = true } = options;

  let config, driver, session;

  config = await new Builder ()
    .forBrowser (Browser.FIREFOX)

  if (headless === true) {
    config = await config.setFirefoxOptions (new firefox.Options ().addArguments ('--headless'));
  }

  driver = config.build ();

  session = {
    data: {
      search: {
        interval: 100,
        timeout: (1000 * SESSION_SEARCH_TIMEOUT),
      },
    },
    reference: {
      driver,
    },
  }
  return session;
}
  
export async function endSession (details = {}) {
  let { session } = details;
  let driver;
  driver = await getSessionDriver (details);
  await driver.quit ();
}

export async function select (details = {}) {
  let { session, target } = details;
  let driver, result;
  
  target = '.bravo .navbar-nav > .nav-item:nth-child(1)';
  if (target) {
    driver = await getSessionDriver (details);
    try {
      result = await createSearchInterval ({
        name: `select: ${target}`,
        async run () {
          let result;
          
          try {
            result = await driver.findElement (By.css (target));
            return result;
          }
          catch (err) {
            console.error (`ERROR: ${err.message}`);
          }
        },
        session,
      });
    }
    catch (err) {
      throw err;
    }
  }
  return result;
}

export async function getSessionDriver (details = {}) {
  let { session } = details;
  let { reference } = session;
  return reference.driver;
}

export async function getSessionSearch (details = {}) {
  let { session } = details;
  let { data } = session;
  return data.search;
}

export async function createSearchInterval (details = {}) {
  let { name = 'un-named action', run } = details;
  let promise, search;
  
  if (run) {
    search = await getSessionSearch (details);
    promise = new Promise ((done, cancel) => {
      let interval, timeout;
      
      interval = setInterval (async () => {
        let result;
        result = run ();
        if (result && result.constructor.name === 'Promise') {
          result = await result;
        }

        if (result !== undefined) {
          clearInterval (interval);
          clearTimeout (timeout);
          done (result);
        }
      }, search.interval);

      timeout = setTimeout (() => {
        clearInterval (interval);
        clearTimeout (timeout);
        cancel (`ERROR: timed out - ${name}`);
      }, search.timeout);
    });
    return promise;
  }
  return;
}

export async function getTitle (details = {}) {
  let { session, title = '' } = details;
  let driver, result;
  
  driver = await getSessionDriver (details);
  
  try {
    result = await createSearchInterval ({
      name: `getTitle: ${title}`,
      async run () {
        let index, value;
        
        value = await driver.getTitle ();
        index = value.indexOf (title);
        // console.log ([
        //   'title:', 
        //   index, 
        //   Date.now (), 
        //   '[' + title + ']', 
        //   '[' + value + ']',
        // ].join (' '));
        
        if (index > -1) { return value; }
      },
      session,
    });
  }
  catch (err) {
    throw err;
  }
  return result;
}

export async function navigateToUrl (details = {}) {
  let { url } = details;
  let driver;  
  if (url) {
    driver = await getSessionDriver (details);
    await driver.get (url);
  }
}

export async function pause (details = {}) {
  let { delay = 0 } = details;
  await new Promise ((done) => { setTimeout (done, delay); });
}

export async function startSession (details = {}) {
  let { name, options, run } = details;
  let session;
  
  try {
    session = await createSession ({ options });
    await setSession ({ session });

    if (run) {
      await run ({ session });
    }
  }
  catch (err) {
    console.error (err);
  }
  
  // if (session) {
  //   await endSession ({ session });
  // }
  // console.log ('- webdriver session is all done');
}

export async function openNewTab (details = {}) {
  let { session, script, url } = details;
  let driver;
  
  driver = await getSessionDriver (details);
  try {
    await driver.switchTo ().newWindow ('tab');
    if (url) {
      await goToUrl ({ session, url });
      if (script) {
        await driver.executeScript (script);
      }
    }
  }
  catch (err) {
    console.error (err);
  }
}

export async function runScript (details = {}) {}

/*
result = await new Promise ((done, cancel) => {
  let interval, timeout;

  interval = setInterval (async () => {
    let index, value;
    
    value = await driver.getTitle ();
    index = value.indexOf (title);
    // console.log ('- search index in title:', index, Date.now (), `[${title}]`, `[${value}]`, );
    
    if (index > -1) {
      clearInterval (interval);
      clearTimeout (timeout);
      done (value);
    }
  }, search.interval);

  timeout = setTimeout (() => {
    clearInterval (interval);
    clearTimeout (timeout);
    cancel (`Unable to get the title with [${title}]`);
  }, search.timeout);
});
*/
