export async function mountWatcher (details = {}) {
}

import chokidar from 'chokidar';
import dayjs from 'dayjs';
import minimist from 'minimist';
import { fileURLToPath } from 'url';
import { join, parse } from 'path';
import { spawn } from 'child_process';
import { startSocketServer } from './plugin/socket/index.js';

const DATE_FORMAT = 'hh:mm:ss:SSS YYYY-MM-DD';

export async function start () {
  let args, mod;

  args = minimist (process.argv.slice (2));
  console.log ('args:', args);

  if (args.app === 'lassoerp') {
    mod = await import ('../../../project/group/dv-operations/app/lassoerp/invoice/0.0.1/src/js/server/index.js');
    if (mod.start) { mod.start (); }
  }
  else {
    startTestServer ();
  }
}

async function startTestServer (details = {}) {
  let base, context, delay, project, src, watcher;

  delay = 100;
  base = fileURLToPath (import.meta.url);
  base = join (base, '..', '..', '..', '..');
  src = join (base, 'src', 'js');
  project = join (base, 'project', 'group');

  watcher = chokidar.watch ([], {
    ignored: [
      'node_modules',
      '**/node_modules/**',
      '**/*/node_modules/**',
      '_archive',
      '**/_archive/**',
      '**/*/_archive/**',
    ],
    // ignoreInitial: true,
  });

  watcher.add (join (src, 'server'));
  watcher.add (join (src, 'common'));
  watcher.add (join (project));

  watcher.on ('all', (event, path) => {
    let extension;
    extension = parse (path).ext;
    if (context.isRunning === false && path && extension && extension.length > 1) {
      setTimeout (createRunContext ({ base, event, path }), delay);
      console.log (extension);
    }
  });

  context = {
    child: null,
    base,
    history: [],
  };

  setTimeout (createRunContext (context), delay);
}

function createRunContext (details = {}) {
  let { base, child, event, history = [], path } = details;

  if (child) { child.kill (); }
  if (history.indexOf (path) > -1) { return () => {} }

  return function runChildProcess () {
    let child;
    child = startTest ({ base, event, path });

    history.push (path);

    child.on ('exit', () => {
      details.isRunning = false;
      details.history = [];
      console.log (`\n- done: ${dayjs (Date.now ()).format (DATE_FORMAT)}`);
    });

    details.isRunning = true;
    details.child = child;
  }
}

function startTest (details = {}) {
  let { base, event, path } = details;
  let child;

  child = spawn ([
    // 'node -e "process.stdout.write('\x1Bc')"',
    // 'history -c && history -w',
    'clear && byobu clear-history',
    'echo "\x1Bc"',
    `echo "FILE CHANGED: ${event} ${path}"`,
    `echo ""`,
    `npx c8 mocha src/js/server/index.spec.js --reporter=min`
  ].join (' && '), {
    cwd: base,
    shell: true,
    stdio: 'inherit',
  });
  return child;
}
