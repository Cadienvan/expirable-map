import { ExpirableMap } from '.';

it('should initialize the map with the given values', () => {
  const map = new ExpirableMap();
  map.set('a', 1);
  map.set('b', 2);
  expect(map.size).toBe(2);
  expect(map.get('a')).toBe(1);
  expect(map.get('b')).toBe(2);
});

it('should set the expiration time for a key', () => {
  const map = new ExpirableMap();
  map.set('a', 1, 10);
  expect(map.size).toBe(1);
  expect(map.get('a')).toBe(1);
});

it('should remove the key after the expiration time', () => {
  const map = new ExpirableMap();
  map.set('a', 1, 10);
  expect(map.size).toBe(1);
  expect(map.get('a')).toBe(1);
  setTimeout(() => {
    expect(map.size).toBe(0);
    expect(map.get('a')).toBe(undefined);
  }, 20);
});

it('should reset the timeout when the key is set again', () => {
  const map = new ExpirableMap();
  map.set('a', 1, 10);
  expect(map.size).toBe(1);
  expect(map.get('a')).toBe(1);
  setTimeout(() => {
    expect(map.size).toBe(1);
    expect(map.get('a')).toBe(1);
  }, 20);
  map.set('a', 1, 30);
  expect(map.size).toBe(1);
  expect(map.get('a')).toBe(1);
});
