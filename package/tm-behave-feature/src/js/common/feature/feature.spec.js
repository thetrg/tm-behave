import {
  step, 
} from './feature.js';

step ([
  'feature: google searching', [
    'as a web surver, I want to search Google, so that I can learn new things.',
    
    'scenario: simple google search', [
      'given a web browser is on the Google page',
      'when the search phrase "panda" is entered',
      'then the results for "panda" are shown',
    ],
  ],
]);
