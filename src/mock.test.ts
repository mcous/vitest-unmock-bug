import {vi, afterEach, test, expect} from 'vitest'

afterEach(() => {
  vi.doUnmock('./dependency')
})

test('mock by imitating the actual module', async () => {
  vi.doMock('./dependency')
  const dependency = await import('./dependency')
  expect(vi.mocked(dependency.doSomething).mock).toBeDefined()
})

test.skip('mock by providing an explicit replacement', async () => {
  vi.doMock('./dependency', () => ({doSomething: vi.fn()}))
  const dependency = await import('./dependency')
  expect(vi.mocked(dependency.doSomething).mock).toBeDefined()
})

test('verify module is not mocked after call to doUnmock', async () => {
  const dependency = await import('./dependency')
  expect(vi.mocked(dependency.doSomething).mock).not.toBeDefined()
})
