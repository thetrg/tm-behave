export function asJson () {
  let json;
  json = { ...this };
  delete json.temp;
  return JSON.stringify (json, null, 2);
}

export function toJson () {
  let json;
  json = { ...this };
  delete json.temp;
  return json;
}

export async function createItem (details = {}) {
  let { browser = {} } = details;
  let { data = {}, info = { guid: Date.now () } } = browser;
  let item;

  item = {
    info,
    data,
    temp: {},
  }

  Object.defineProperty (item, 'toJSON', {
    enumerable: false,
    value: toJson,
    writable: false,
  });
  Object.defineProperty (item, 'asJson', {
    enumerable: false,
    value: asJson,
    writable: false,
  });

  return item;
}

// ------------------------------------------------
const shared = {
  browser: null,
}

export async function createBrowser (details = {}) {
  let { browser = {} } = details;
  let { data = {} } = browser;
  let item;

  if (data.name === undefined) { data.name = 'un-known browser name'; }
  item = await createItem (details);
  return item;
}

export async function getBrowser (details = {}) {
  let browser;
  browser = shared.browser;
  if (!browser) {
    browser = await createBrowser (details);
    shared.browser = browser;
  }
  return browser;
}

export async function setBrowser (details = {}) {
  let browser = shared.browser;
  if (!browser) {
    browser = await createBrowser (details);
    shared.browser = browser;
  }
  return browser;
}
