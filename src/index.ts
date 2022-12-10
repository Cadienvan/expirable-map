export type ExpirableMapOptions = {
  defaultTtl: number | undefined;
  keepAlive: boolean | undefined;
};

export const defaultOptions: ExpirableMapOptions = {
  defaultTtl: 0,
  keepAlive: true
};

type TTL = number;
export const NOT_EXPIRING_TTL = 0;

export class ExpirableMap<Key = any, Val = any> extends Map<Key, Val> {
  public readonly [Symbol.toStringTag] = 'ExpirableMap';
  expirationTimeouts: Map<Key, NodeJS.Timeout>;
  defaultTtl: number;
  keepAlive: boolean;

  constructor(
    entries: Array<[Key, Val, TTL?]> = [],
    options: ExpirableMapOptions = defaultOptions
  ) {
    super();
    this.defaultTtl = options.defaultTtl || NOT_EXPIRING_TTL;
    this.keepAlive = options.keepAlive ?? true;
    this.expirationTimeouts = new Map();
    if (entries)
      entries.forEach((entry) =>
        this.set(entry[0], entry[1], entry[2] || this.defaultTtl)
      );
  }

  setExpiration(key: Key, timeInMs = this.defaultTtl) {
    this.expirationTimeouts.set(
      key,
      setTimeout(() => {
        this.delete(key);
      }, timeInMs)
    );
    return this;
  }

  set(key: Key, value: Val, ttl = this.defaultTtl) {
    if (this.keepAlive) this.clearTimeout(key);
    if ((this.keepAlive || !this.has(key)) && ttl !== NOT_EXPIRING_TTL)
      this.setExpiration(key, ttl);
    return super.set(key, value);
  }

  delete(key: Key) {
    this.clearTimeout(key);
    return super.delete(key);
  }

  clearTimeout(key: Key) {
    clearTimeout(this.expirationTimeouts.get(key));
    this.expirationTimeouts.delete(key);
  }
}
