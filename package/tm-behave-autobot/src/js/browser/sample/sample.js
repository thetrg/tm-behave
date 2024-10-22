import {
  send,
  showResultLog,
} from '@thetrg/tm-message';
import { run, specs } from '@thetrg/tm-behave';

const DELAY = 100;

async function empty () {
  await new Promise ((done) => { setTimeout (done, DELAY) });
}

const describe    = specs;
// const navigateTo  = empty;
const writeTextTo = empty;
const searchFor   = empty;

export async function runTest () { 
  await openBrowser ();
//  await run ();
//  await closeBrowser ();
}

describe ([
  'feature: google searching', [
    'setup', async () => {},
    'as a web surfer, I want to search Google, so that I can learn new things.',
    'scenario: simple google search', [
      'given a web browser is on the Google page', async () => {
        // await openTab ({ target: 'https://www.google.com', title: 'Google' });
      },
      'when the search phrase "panda" is entered', async () => { 
         await writeTextTo ({ target: 'textarea[title="Search"]', text: 'panda', submit: true });
      },
      'then results for "panda" are shown', async () => {
        await searchFor ({ 
          target: '#search #rso h3', 
          text: [
            'Giant panda - Wikipedia',
            'Giant Panda | Species | WWF',
            'Giant panda | Smithsonian\'s National Zoo',
          ],
        });
      }
    ],
    'breakdown', async () => {
      await closeTab ();
    },
  ],
]);

// ---------------------------------------------------
// api/0.1.0/thetrg/tm-behave/autobot/command

export async function closeBrowser (details = {}) {
  let result;
  result = await send ({
    path: 'api/0.1.0/thetrg/tm-behave/autobot/browser/_item/common/close',
  });
  return result;
}

export async function openBrowser (details = {}) {
  let result;
  result = await send ({
    path: 'api/0.1.0/thetrg/tm-behave/autobot/browser/_item/common/open',
  });
  await showResultLog ({ result });
  return result;
}

export async function closeTab (details = {}) {}

export async function openTab (details = {}) {
  let result;
  result = await send ({
    path: 'api/0.1.0/thetrg/tm-behave/autobot/browser/tab/_item/common/open',
  });
  return result;
}

export async function navigateTo (details = {}) {
  let { target, title } = details;
  let result;
  // result = await sendCommand ({
  //   path: 'thetrg/behave/autobot/driver/backend/session/navigation/go',
  //   details: {
  //     title,
  //     url: target,
  //   },
  // });
  // await log ({ message: '- TRACE RESULT:', list: [result] });
  return result;
}











//specs ({
//  'sample spec 1': {
////    'spec 1': null,
//////    // 'before all': () => {},
//////    // 'before each': () => {},
//////    // 'after all': () => {},
//////    // 'after each': () => {},
////    'sample spec 1/1': () => {
////      expect (1).is (1);
////    },
////    'sample spec 1/2': async () => {
////      expect (1).isNot (2);
////    },
////    'sample spec 1/3': {
////      'sample spec 1/3/1': {
////        'sample spec 1/3/1/1': () => {},
////        'sample spec 1/3/1/2': {},
////      }
////    },
////  },
//  'sample spec 2': async () => {},
//  'sample spec 3': () => {},
//});

/*
specs ([
  'feature: google searching', [
  ],
  'sample spec 1', [
    'spec 1',
    // 'spec 2',
    'sample spec 1/1', () => {
      expect (1).is (1);
    },
    'sample spec 1/2', async () => {
      expect (1).isNot (2);
    },
    'sample spec 1/3', [
      'sample spec 1/3/1', [
        'sample spec 1/3/1/1', () => {},
        'sample spec 1/3/1/2',
      ],
    ],
  ],
  'sample spec 2', async () => {},
  'sample spec 3', () => {},
]);
*/

/*
const DELAY = 100;
export async function runTest () {}

async function empty () {
  await new Promise ((done) => { setTimeout (done, DELAY) });
}

const describe = empty;
const navigateTo = empty;
const writeTextTo = empty;

describe (
  'feature: google searching', [
    'as a web surfer, I want to search Google, so that I can learn new things.',
  
    'scenario: simple google search', [
      'given a web browser is on the Google page', async () => {
        await navigateTo ({ target: 'https://www.google.com', title: 'Google' });
      },
      'when the search phrase "panda" is entered', async () => { 
        await writeTextTo ({ target: 'textarea[title="Search"]', text: 'panda', submit: true });
      },
      'then results for "panda" are shown', async () => {
        await searchFor ({ 
          target: '#search #rso h3', 
          text: [
            'Giant panda - Wikipedia',
            'Giant Panda | Species | WWF',
            'Giant panda | Smithsonian\'s National Zoo',
          ],
        });
      }
    ],
  ],
);

feature ('google searching', 
  async ({ name }) =>{
    await setSession ({ name });
  },
  describe ('as a web surfer, I want to search Google, so that I can learn new things.'),
  scenario ('simple google search',
    given ('a web browser is on the Google page', async () => {
      await navigateTo ({ target: 'https://www.google.com' });
    }),
    when ('the search phrase "panda" is entered', async () => { 
      await writeTextTo ({ target: 'textarea[title="Search"]', text: 'panda', submit: true });
    }),
    then ('results for "panda" are shown', async () => {
      await searchFor ({ 
        target: '#search #rso h3', 
        text: [
          'Giant panda - Wikipedia',
          'Giant Panda | Species | WWF',
          'Giant panda | Smithsonian\'s National Zoo',
        ],
      });
    }),
  ),
  async ({ name }) => {
    await endSession ({ name });
  },
);
*/

/*
feature ('google searching',
  describe ('as a web surfer, I want to search Google, so that I can learn new things.'),
  scenario ('simple google search',
    given ('a web browser is on the Google page'),
    when ('the search phrase "panda" is entered'),
    then ('results for "panda" are shown')
  )
)

//   describe ('as a web surfer, I want to search Google, so that I can learn new things.'),
//   scenario ('simple google search',
//     given ('a web browser is on the Google page'),
//     when ('the search phrase "panda" is entered'),
//     then ('results for "panda" are shown')
//   )
// )

// runTest (async () => {
//   console.log ('**** coool');
//   // await navigateTo ({ url: 'https://csszengarden.com' });
//   // await getTitle ({ is: 'CSS Zen Garden' });  // contains: '...',
//   // await clickOn ({ target: 'li.next' });
//   // await clickOn ({ target: 'li.previous' });
// })

// const DELAY = 100;
// async function runTest () {}
// async function empty () {
//   await new Promise ((done) => { setTimeout (done, DELAY) });
// }
*/
