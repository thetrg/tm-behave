import { Browser, Builder } from 'selenium-webdriver';
import firefox from 'selenium-webdriver/firefox.js';

export async function closeBrowser (details = {}) {
  let { browser } = details;
  let { temp } = browser;
  let { driver } = temp.firefox;

  if (browser.data.running === true) {
    await driver.quit ();
    browser.temp.firefox.driver = null;
  }

  return browser;
}

export async function openBrowser (details = {}) {
  let { browser } = details;
  let { data } = browser;
  let { options = [] } = data;
  let config, firefoxOptions, driver, window;

  if (browser.data.running === false) {
    browser.data.running = true;

    config = await new Builder ()
      .forBrowser (Browser.FIREFOX);
  
    firefoxOptions = new firefox.Options ();
    Object.keys (options).forEach ((key) => {
      let option;
      option = options [key];
      if (option.active === true) {
        // console.log ('- adding option:', option);
        firefoxOptions.addArguments (option.value);
      }
    });
    
    config = await config.setFirefoxOptions (firefoxOptions);
    driver = await config.build ();

    // Store the ID of the original window
    window = await driver.getWindowHandle ();
    browser.temp.firefox = {
      driver,
      window,
    }
  }

  return browser;
}
