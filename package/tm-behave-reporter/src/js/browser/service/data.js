import {
  SAMPLE_RUNNER_DATA,
} from './data.mock.feature.js';
// } from './data.mock.spec.js';

const shared = {
  runner: SAMPLE_RUNNER_DATA,
}

export function getRunner (details = {}) {
  return shared.runner;
}

export function getSpecById (details = {}) {
  let { id, runner = getRunner () } = details;
  let item;
  item = runner.registry [id];
  return item;
}
