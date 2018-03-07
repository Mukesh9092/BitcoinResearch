import path from 'path';
import noflo from 'noflo';

const wrappedGraph = noflo.asCallback('Main', {
  baseDir: path.resolve(__dirname),
});

wrappedGraph(
  {
    in: 'foo',
  },
  (error: Error, result: any) => {
    if (error) {
      console.log(error);
      return;
    }

    console.log('result', typeof result, result);
  },
);
