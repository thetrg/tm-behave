export function createComponent (details = {}) {
  let { dom } = details;
  let component;
  component = {
    data: {
      id: 0,
    },
    reference: {
      dom,
    },
  }
  return component;
}
