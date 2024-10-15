import {
  getRunner,
  specs,
} from '@thetrg/tm-behave';

export async function step (details) {
  specs (details);
}
  
function createDraftLine (details = {}) {
  let { parent, text = '' } = details;
  let line, indent, index, list, prefix;

  indent = text.search (/\S|$/);
  text = text.trim ();
  
  prefix = '';
  index = text.indexOf (' ');
  if (index > -1) {
    prefix = text.substring (0, index).trim ();
    text = text.substring (index).trim ();
  }
  
  line = {
    indent,
    prefix,
    text,
  }
  // console.log ('what:', line);
  return line;
}
  
export function draft (details) {
  let end, i, item, list, parent, previous, root, rough, runner;
  list = details.split ('\n');
  end = list.length;
  
  rough = {
    lines: [],
  }
  
  for (i = 0; i < end; i++) {
    item = list [i];
    item = createDraftLine ({ parent, text: item });
    rough.lines.push (item);
  }
  
  runner = getRunner ();
  console.log ('huh:', rough);
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
