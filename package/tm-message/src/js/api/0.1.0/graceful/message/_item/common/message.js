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

export async function getLogLineInfo (details = {}) {
  let file, index, line, parts, result, stack;
  
  result = {
    text: '',
  }

  try {
    throw new Error ('line');
  }
  catch (err) {
    stack = err.stack;
    file = stack.split ('\n');
    console.log (file);
    file = file [5];
    index = file.lastIndexOf ('/') + 1;
    line = file.substring (index);

    parts = line.split (':');
    line = parts [0];
    index = line.lastIndexOf ('?');
    if (index > -1) {
      line = line.substring (0, index);
    }

    result.file = line;
    result.row = parts [1];
    result.column = parts [2].replace (')', '');

    result.text = ['[', result.file, ' ', result.row, ':', result.column, ']'].join ('');

    // line = line + ' (' + parts [1] + ':' + parts [2];
    // console.log ('- line:', result);
    // console.log (file, index, line, parts);
  }
  return result;
}

export async function log (details = {}) {
  let { _extra = {}, list = [], message, prefix, trace, type = 'normal' } = details;
  let { result } = _extra;
  let line;

  if (prefix !== undefined) {
    message = prefix + message;
    list.forEach ((item, index) => {
      list [index] = prefix + item;
    });
  }
  
  if (message !== undefined) {
    list = [message].concat (list);
  }

  if (result) {
    line = await getLogLineInfo ();
    list.forEach ((item) => {
      let entry;
      entry = { message, type, temp: { line } };
      result.data.log.push (entry);
    });
  }
  else {
    if (type === 'error') {
      console.error.apply (console, list);
    }
    else if (message) {
      console.log.apply (console, list);
    }
  
    if (trace) {
      console.error (trace);
    }
  }
}

export async function showLog (details = {}) {
  let { log = [], show = {} } = details;
  let { lines = true, section = false } = show;

  if (section === true) {
    console.log ('');
    console.log ('---------------------------------');
  }

  log.forEach ((entry) => {
    let { message, temp } = entry;
    let { line } = temp;

    if (lines === true) {
      console.log ([line.text, message].join (' '));
    }
    else {
      console.log ([message].join (' '));
    }
  });
}

export async function showResultLog (details = {}) {
  let { result, show } = details;
  if (result) {
    await showLog ({ log: result.data.log, show });
  }
}

export async function send (details = {}) {
  let { details: nested = {}, first = false, path } = details;
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
      await addResultError ({ _extra: { result }, error: `Something went wrong on: [${path}]`, show: !true });
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

export async function addResultError (details = {}) {
  let { _extra = {}, error, show, trace, throw: throwError } = details;
  let { result } = _extra;

  if (error) {
    if (result) {
      result.data.error.list.push (error);  
    }

    await log ({ _extra, message: error, type: 'error' });

    if (throwError) {
      throw new Error (error);
    }
  }

  // if (trace) {
  //   await log ({ trace });
  // }
}

export async function addResultItem (details = {}) {
  let { _extra, item } = details;
  let { result } = _extra;

  if (item !== undefined) {
    result.data.item.list.push (item);
  }
}

export async function createResult (details = {}) {
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

export async function getItemFromSendResult (details = {}) {
  let outcome, result;
  
  result = await forward (details);
  // console.log (JSON.stringify (result, null, 2));
  
  if (result.data.status.code < 400) {
    outcome = result.data.item.list [0];
    // console.log (JSON.stringify (outcome, null, 2));
  }
  else {
    // console.log (result);
    log ({ 
      message: 'ERROR: ' + result.data.error.list.join ('\nERROR: '), 
      type: 'error',
    });
    throw new Error (result.data.status.message);
  }
  
  return outcome;
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

// ----------------------------------------------------
// Forward Message

export async function getItemFromForwardResult (details = {}) {
  let nested, outcome, result;
  
  result = await forward (details);
  nested = result.data.item.list [0];
  // console.log (JSON.stringify (result, null, 2));
  
  if (nested.data.status.code < 400) {
    outcome = nested.data.item.list [0];
    // console.log (JSON.stringify (outcome, null, 2));
  }
  else {
    // console.log (nested);
    log ({ 
      message: 'ERROR: ' + nested.data.error.list.join ('\nERROR: '), 
      type: 'error',
    });
    throw new Error ([
      nested.data.status.code,
      nested.data.status.message,
    ].join (' '));
  }
  
  return outcome;
}

export async function forward (details = {}) {
  let result;
  
  result = await send ({ 
    path: 'api/0.1.0/tm/message/socket/action/_item/common/forward',
    details,
    stack: true,
  });
  
  if (result.data.status.code >= 400) {
    throw new Error (result.data.status.message);
  }

  return result;
}
