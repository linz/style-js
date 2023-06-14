import React, { ReactElement, useEffect } from 'react';

/**
 * Basic React Component for testing react linting rules
 *
 * Note if you want your IDE to check the React specific rules you will
 * need to point it at the .eslintrc-react.cjs config
 * Or run the lint rules with `npm run lint:react`
 * @constructor
 */
export default function MyComponent(): ReactElement {
  useEffect(() => {
    console.log('test');
  });

  return <div></div>;
}
