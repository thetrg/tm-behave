const shared = {
  router: null,
}

async function addError (details = {}) {
  let { error, result, show,trace, throw: throwError } = details;

  if (error) {
    result.data.error.list.push (error);
    if (throwError) {
      throw new Error (error);
    }
  
    if (show) {
      await log ({ message: 'ERROR: ' + result.data.error.list.join ('\nERROR: '), type: 'error' });
    }
  }

  if (trace) {
    await log ({ trace });
  }
}

export function createRouter (details = {}) {
  let router;
  router = {
    reference: {
      listeners: {},
    },
  }

  if (!globalThis.send && !globalThis.listen) {
    globalThis.addError = addError;
    globalThis.send = send;
    globalThis.listen = listen;
    globalThis.log = log;
  }

  return router;
}

export function getPathHandler (details = {}) {
  let { ensure, path } = details;
  let listeners, router, target;

  router = getRouter ();
  listeners = router.reference.listeners;
  target = listeners [path];

  if (!target && ensure === true) {
    target = {
      list: [],
    }
    listeners [path] = target;
  }

  return target;
}

export function getRouter (details = {}) {
  let router;
  router = shared.router;
  if (!router) {
    router = createRouter ();
    shared.router = router;
  }
  return router;
}

export function listen (details = {}) {
  let { path, run } = details;
  let target;
  
  if (path && run) {
    details.ensure = true;
    target = getPathHandler (details);
    target.list.push (details);
  }
}

export async function log (details = {}) {
  let { list = [], message = '', type } = details;
  
  if (type === 'error') {
    console.error.apply (console, [message].concat (list));
  }
  else {
    console.log.apply (console, [message].concat (list));
  }
}

async function createResult (details = {}) {
  let result;
  result = {
    data: {
      status: {
        code: 204,
        message: 'No Content',
      },
      error: {
        list: [],
        tag: {},
      },
      item: {
        first: null,
        list: [],
        tag: {},
      },
    }
  }
  return result;
}

export async function send (details = {}) {
  let { details: nested = {}, path } = details;
  let result, target;
  
  result = await createResult ();

  details.ensure = false;
  target = getPathHandler (details);
  if (target) {
    nested._extra = { result }
    await runNext ({
      index: 0,
      list: target.list,
      result,
      details: nested,
    });

    if (result.data.error.list.length === 0) {
      result.data.status.code = 200;
      result.data.status.message = 'Ok';
    }
    else {
      result.data.status.code = 500;
      result.data.status.message = 'Internal Error';
    }
  }
  else {
    console.error (`Message send path not found: [${path}]`);
  }
  return result;
}

export async function runNext (details = {}) {
  let { details: nested = {}, index, list = [], result } = details;
  let item, outcome;

  item = list [index];
  if (item && item.run) {
    details.index = details.index + 1;
    outcome = item.run (nested);
    if (outcome && outcome.constructor.name === 'Promise') {
      outcome = await outcome;
    }

    if (outcome !== undefined) {
      if (result.data.item.list.length === 0) { 
        result.data.item.first = outcome;
      }
      result.data.item.list.push (outcome);
    }
  }

  if (details.index < list.length) {
    await runNext (details);
  }
  return details;
}

// ----------------------------------------------------
// Add some listener

listen ({
  path: 'system/status',
  run () {
  },
})
listen ({
  path: 'behave/autobot/sandbox/test',
  run () {
    send ({ path: 'behave/autobot/driver/bob' });
  },
})
