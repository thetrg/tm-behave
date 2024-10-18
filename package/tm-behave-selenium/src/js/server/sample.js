import { createAutobotApp } from './plugin/autobot/index.js';
import './plugin/action/index.js';

export async function sample (details = {}) {
  await createAutobotApp ();
}
