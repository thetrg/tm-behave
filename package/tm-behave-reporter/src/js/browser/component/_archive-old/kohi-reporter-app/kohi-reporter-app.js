export const KOHI_REPORTER_APP_TAG = 'kohi-reporter-app';

import { SAMPLE_RUNNER_DATA } from './data.mock.js';

const shared = {
  runner: SAMPLE_RUNNER_DATA,
}

export function getItemFromRunnerRegistry (details = {}) {
  let { id } = details;
  let item;
  item = shared.runner.registry [id];
  return item;
}

export function getRunnerById (details = {}) {
  let { id } = details;
  let runner;
  runner = shared.runner;
  return runner;
}
