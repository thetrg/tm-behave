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
    globalThis.send = send;
    globalThis.listen = listen;
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

export async function send (details = {}) {
  let { details: nested, path } = details;
  let end, i, item, list, target;
  
  details.ensure = false;
  target = getPathHandler (details);
  if (target) {
    list = target.list;
    end = list.length;
    for (i = 0; i < end; i++) {
      item = list [i];
      if (item.run) {
        item.run (nested);
      }
    }
    // TODO: Make async
  }
  else {
    console.error (`Message path not found: [${path}]`);
  }
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
