const shared = {
  router: null,
}

export function createRouter (details = {}) {
  let router;
  router = {
    reference: {
      listeners: {},
    },
  }

  if (!globalThis.send && !globalThis.listen) {
    globalThis.addResultItem  = addResultItem;
    globalThis.addResultError = addResultError;
    globalThis.send           = send;
    globalThis.listen         = listen;
    globalThis.log            = log;
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
  let { list = [], message = '', prefix = '', trace, type } = details;
  
  if (prefix) {
    message = prefix + message;
    list.forEach ((item, index) => {
      list [index] = prefix + item;
    });
  }

  if (type === 'error') {
    console.error.apply (console, [message].concat (list));
  }
  else if (message) {
    console.log.apply (console, [message].concat (list));
  }

  if (trace) {
    console.error (trace);
  }
}

export async function send (details = {}) {
  let { details: nested = {}, first = true, path } = details;
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

      if (first === true) {
        result = result.data.item.list [0];
      }
    }
    else {
      result.data.status.code = 500;
      result.data.status.message = 'Internal Error';
      await addResultError ({ _extra: { result }, error: `Something went wrong on: [${path}]`, show: true });
    }
  }
  else {
    result.data.status.code = 404;
    result.data.status.message = 'Not Found';
    await addResultError ({ _extra: { result }, error: `Message send path not found: [${path}]`, show: true });
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
// Result
async function addResultError (details = {}) {
  let { _extra = {}, error, show,trace, throw: throwError } = details;
  let { result } = _extra;

  if (error) {
    if (result) {
      result.data.error.list.push (error);
      
      if (show) {
        await log ({ message: 'ERROR: ' + result.data.error.list.join ('\nERROR: '), type: 'error' });
      }
    }

    if (throwError) {
      throw new Error (error);
    }
  }

  if (trace) {
    await log ({ trace });
  }
}

async function addResultItem (details = {}) {
  let { _extra, item } = details;
  let { result } = _extra;

  if (item !== undefined) {
    result.data.item.list.push (item);
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
        list: [],
        tag: {},
      },
      log: [],
    }
  }
  return result;
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
