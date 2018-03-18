import { css, injectGlobal } from 'emotion';

import x from 'normalize.css';
import b from '../../../node_modules/@blueprintjs/core/dist/blueprint.css';

injectGlobal(x.toString());
injectGlobal(b.toString());

export const container = css`
  background-color: hotpink;
`;
