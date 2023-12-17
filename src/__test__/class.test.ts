export class FooBar {
  get foo(): number {
    return 1;
  }

  async bar(): Promise<string> {
    return await Promise.resolve('bar');
  }

  // Should allow `!` in tests
  maybe(f?: string): string {
    return f!;
  }

  /**
   * @param foo foo to bar
   */
  fooBar(foo = 'foo'): string {
    return `${foo}bar`;
  }
}

export const Foo = new FooBar();
export const FooMaker = (f: string): string => new FooBar().fooBar(f);
