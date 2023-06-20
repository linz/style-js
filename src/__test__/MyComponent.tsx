import React, { ReactElement, useEffect } from 'react';

/**
 * Basic React Component for testing react linting rules
 *
 * @constructor
 */
export default function MyComponent(): ReactElement {
  useEffect(() => {
    console.log('test');
  });

  return <div></div>;
}
