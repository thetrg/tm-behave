import { run, specs } from '@thetrg/tm-behave';

const DELAY = 100;

async function empty () {
  await new Promise ((done) => { setTimeout (done, DELAY) });
}

const describe    = specs;
const navigateTo  = empty;
const writeTextTo = empty;
const searchFor   = empty;

export async function runTest () { 
  console.log ('*****');
  await run ();
}

describe ([
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
]);

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
