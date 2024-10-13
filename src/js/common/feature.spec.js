const empty = () => {}
const feature = empty;
const scenario = empty;
const given = empty;
const when = empty;
const then = empty;
const table = empty;
const background = empty;
const outline = empty;
const examples = empty;
const tags = empty;

// ref: https://automationpanda.com/2017/01/27/bdd-101-gherkin-by-example/

// A Simple Feature
feature ('Google Searching',
  'As a web surfer, I want to search Google, so that I can learn new things.',

  scenario ('Simple Google search',
    given ('a web browser is on the Google page'),
    when ('the search pharse "panda" is entered'),
    then ('results for "panda" are shown'),
  ),
)

// Additonal Steps
feature ('Google Searching',
  'As a web surfer, I want to search Google, so that I can learn new things.',

  scenario ('Simple Google search',
    given ('a web browser is on the Google page'),
    when ('the search pharse "panda" is entered'),
    then ('results for "panda" are shown'),
    and ('the related results include "Panda Express"'),
    but ('the related results do not include "pandemonium"'),

    /*
    params ({ value: ['panda'] }),
    when ('the search pharse @value is entered'),
    and ('the related results include @returned-results'),
    but ('the related results do not include @non-results'),
    */
  ),
)

// Doc Strings
feature ('Google Searching',
  'As a web surfer, I want to search Google, so that I can learn new things.',

  scenario ('Simple Google search',
    given ('a web browser is on the Google page'),
    when ('the search pharse "panda" is entered'),
    then ('results for "panda" are shown'),
    and ('the results page display the text', `
      Scientific name: Ailurpoda melanoleuca
      Conservation status: Endangered (Population decreasing)
    `),
  ),
)

// Step Tables
feature ('Google Searching',
  'As a web surfer, I want to search Google, so that I can learn new things.',

  scenario ('Simple Google search',
    given ('a web browser is on the Google page'),
    when ('the search pharse "panda" is entered'),
    then ('results for "panda" are shown'),
    and ('the following related results are shown', 
      table (
        'related',
        'Panda Express',
        'giant panda',
        'panda videos',
      )
    ),
  ),
)

// The Background Section
feature ('Google Searching',
  'As a web surfer, I want to search Google, so that I can learn new things.',

  background (
    given ('a web browser is on the Google page'),
  ),

  scenario ('Simple Google search for pandas',
    when ('the search pharse "panda" is entered'),
    then ('results for "panda" are shown'),
  ),

  scenario ('Simple Google search for elephants',
    when ('the search pharse "elephant" is entered'),
    then ('results for "elephant" are shown'),
  ),
)

// Scenario Outlines
feature ('Google Searching',
  'As a web surfer, I want to search Google, so that I can learn new things.',

  outline ('Simple Google search',
    given ('a web browser is on the Google page'),
    when ('the search pharse "panda" is entered'),
    then ('results for "panda" are shown'),
    and ('the related results include ', 
      examples ({
        animals: [
          { phrase: 'panda', related: 'Panda Express' },
          { phrase: 'elephant', related: 'Elephant Man' },
        ],
      })
    ),
  ),
)

// Tags
feature ('Google Searching',
  'As a web surfer, I want to search Google, so that I can learn new things.',

  tags ('automated', 'google', 'panda'),
  scenario ('Simple Google search',
    given ('a web browser is on the Google page'),
    when ('the search pharse "panda" is entered'),
    then ('results for "panda" are shown'),
  ),
)
