function createExpectation (value) {
  let expectation;
  expectation = {
    value,
    is,
    isNot,
  }
  return expectation;
}

function is (value) {
  if (this.value === value) { return }
  throw new Error ('value does NOT match what is expected');
}

function isNot (value) {
  if (this.value !== value) { return }
  throw new Error ('expected values are NOT supposed to match');
}

export const expect = createExpectation;
