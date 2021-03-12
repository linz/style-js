const f = require('fs');

/**Testing Javascript eslint configuration */
class FooBar {
  get foo() {
    return 1;
  }

  async bar() {
    return f.promises.readFile('');
  }

  maybe(f) {
    return f;
  }

  /**
   * @param foo foo to bar
   */
  fooBar(foo = 'foo') {
    return `${foo}bar`;
  }
}

module.exports = { FooBar };
