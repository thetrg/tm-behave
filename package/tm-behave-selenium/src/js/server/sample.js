export async function sample (details = {}) {
  await startSession ({
    name: 'Some session name...',
    async run (details = {}) {
      let { session } = details;

      await goToUrl ({ session, url: 'https://blender.org' });
      await getTitle ({ session, title: 'blender.org' });
      await pause ({ session, delay: 2000 });
    }
  });
}

  
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
// Library JS API Wrapper
import { Browser, Builder, By, Key, until } from 'selenium-webdriver';

//const SESSION_SEARCH_TIMEOUT = 30;
const SESSION_SEARCH_TIMEOUT = 1;

export async function createSession (details = {}) {
  let driver, session;
  driver = await new Builder ().forBrowser (Browser.FIREFOX).build ();
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
  let { run } = details;
  let promise, search;
  
  if (run) {
    console.log (details);
    return;
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
//          cancel (`Unable to get the title with [${title}]`);
      }, search.timeout);
    });
  }
  return;
}

export async function getTitle (details = {}) {
  let { search, title = '' } = details;
  let driver, result;
  
  driver = await getSessionDriver (details);
  // search = await getSessionSearch (details);
  
  try {
    result = await createSearchInterval ({
      async run () {
        let index, value;
        
        value = await driver.getTitle ();
        index = value.indexOf (title);
        console.log ([
          'title:', 
          index, 
          Date.now (), 
          '[' + title + ']', 
          '[' + value + ']',
        ].join (' '));
        
        if (index > -1) { return value; }
      },
      search,
    });
    
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
  }
  catch (err) {
    throw err;
  }
  return result;
}

export async function goToUrl (details = {}) {
  let { url } = details;
  let driver;  
  if (url) {
    driver = await getSessionDriver (details);
    await driver.get ('https://blender.org');
  }
}

export async function pause (details = {}) {
  let { delay = 0 } = details;
  await new Promise ((done) => { setTimeout (done, delay); });
}

export async function startSession (details = {}) {
  let { name, run } = details;
  let session;
  
  try {
    session = await createSession ();
    if (run) {
      await run ({ session });
    }
  }
  catch (err) {
    console.error (err);
  }
  
  if (session) {
    await endSession ({ session });
  }
  console.log ('- All done');
}
