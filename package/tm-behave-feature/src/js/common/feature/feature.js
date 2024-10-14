import {
  specs,
} from '@thetrg/tm-behave';

export async function step (details) {
  specs (details);
}

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
