import { Browser, Builder, By, Key, until } from 'selenium-webdriver';

export async function sample () {
  let driver;
  
  try {
    driver = await new Builder ().forBrowser (Browser.FIREFOX).build ();
    await driver.get ('https://www.google.com/ncr')
    await driver.findElement (By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait (until.titleIs('webdriver - Google Search'), 1000);
    await driver.quit ();
  }
  catch (err) {
    console.error (err);
  }
}
