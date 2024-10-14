import {
  draft,
  step, 
} from './feature.js';

draft (`
  feature: Google searching
    As a web surfer, I want to search Google, so that I can learn new things.

    Scenario: Simple Google search
      Given a web browser is on the Google page
      When the search phrase "panda" is entered
      Then results for "panda" are shown
`);

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
