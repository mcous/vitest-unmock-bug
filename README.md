# Issue with `vi.unmock`

If a module is mocked using `vi.mock`, a subsequent call to `vi.unmock` **will not unmock the module** if the auto-imitation feature was used.

## Reproduction

```shell
pnpm install
pnpm test
```

There are three tests in [mock.test.ts](./src/mock.test.ts), which mock out a dependency in [dependency.ts](./dependency.ts).

1. A test using `vi.doMock` with implcit replacement
2. A test using `vi.doMock` with explicit replacement (skipped)
3. A test using no replacement, relying on a call to `doUnmock` in an `afterEach` hook

If (1) and (3) are run together, the module is not unmocked, and the call to `import` in (3) returns the mocked module instead of the real one, failing the test. If (1) is skipped instead, and (2) and (3) are run together, the module is successfully unmocked, allowing (3) to pass.
