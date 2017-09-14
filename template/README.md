# <%= this.startCase(name) %>

<%- (description || '').split('\n').map(function (line) {
  return '> ' + line
}).join('\n') %>

---

## Development

This is a BITS module produced from an SAO template.  Execute `npm run build`
to lint and test the code.
