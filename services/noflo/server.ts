const path = require('path');

const noflo = require('noflo');

const wrappedGraph = noflo.asCallback('Main', {
  baseDir: path.resolve(__dirname),
});

wrappedGraph(
  {
    in: 'foo',
  },
  (error, result) => {
    if (error) {
      console.log(error);
      return;
    }

    console.log('result', typeof result, result);
  },
);
