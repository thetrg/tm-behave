import { expect, specs } from '@/common/index.js';

// NOTE: - result: { fail: 0, pass: 10, todo: 2 }
specs ({
  'sample spec 1': {
//    // 'before all': () => {},
//    // 'before each': () => {},
//    // 'after all': () => {},
//    // 'after each': () => {},
    'sample spec 1/1': () => {
      expect (1).is (1);
    },
    'sample spec 1/2': async () => {
      expect (1).isNot (2);
    },
    'sample spec 1/3': {
      'sample spec 1/3/1': {
        'sample spec 1/3/1/1': () => {},
        'sample spec 1/3/1/2': {},
      }
    },
  },
  'sample spec 2': async () => {},
  'sample spec 3': () => {},
});

specs ([
  'sample spec 1', [
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

/*
- Instead of trying to write a feature file (gherkin) to some auto generated test
  - It might be better to go from a spec to a gherkin / feature file
  - 
*/