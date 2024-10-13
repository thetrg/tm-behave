# Kohi

A very minimal spec framework to run primarily in the browser without any dependencies. Since this tool is built for modern ES6 browser environment it should work in a NodeJs context as well. The goal is to have a kohi test from the `/bench` folder run in under `100ms`. Kohi uses the [String Spec](https://kotest.io/docs/framework/testing-styles.html#string-spec) style of writing specs.


## NOTE

- The reporter has to work in CI / CD pipelines. 
  - This means proxy servers and other sub servers will not work
  - The frontend must generate a report in JSON to post to the CI / CD pipeline
  - The CI / CD pipeline then takes the result and saves it to `/coverage` folder
  - The CI / CD pipeline should then generate a report from the `/coverage` folder
  - Maybe the `vite build` command might help with this?

## Resources

- [luna-test](https://www.npmjs.com/package/luna-testing)
  - [Introducing Luna — JavaScript Testing Done Right](https://itnext.io/introducing-luna-javascript-testing-done-right-437a738cc1ed)
- [Testing Styles](https://kotest.io/docs/framework/testing-styles.html)
- [riteway](https://github.com/paralleldrive/riteway)
  - [Rethinking Unit Test Assertions](https://medium.com/javascript-scene/rethinking-unit-test-assertions-55f59358253f)
- [What's the difference between tests and specs?](https://stackoverflow.com/questions/16802030/whats-the-difference-between-tests-and-specs) - A stackoverflow discussion on the difference between the two
- [Selenium Webdriver Bidi](https://github.com/lana-20/selenium-webdriver-bidi)
- [Liverage](https://github.com/bahmutov/liverage)
- [BlanketJs](https://github.com/alex-seville/blanket?tab=readme-ov-file) - code coverage in js (inactive project)

