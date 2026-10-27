// Should allow unawaited node:test describe/it/test/suite calls, see 'typescript/no-floating-promises'
import assert from 'node:assert';
import { describe, it, suite, test } from 'node:test';

describe('demo', () => {
  it('does something async', async () => {
    await Promise.resolve();
    assert.ok(true);
  });

  test('another one', async () => {
    await Promise.resolve();
  });
});

suite('another demo', () => {
  it('does something async', async () => {
    await Promise.resolve();
  });
});
