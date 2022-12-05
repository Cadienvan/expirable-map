export type ExpirableMapOptions = {
  defaultTimeInMs: number | undefined;
  keepAlive: boolean | undefined;
};

export const defaultOptions: ExpirableMapOptions = {
  defaultTimeInMs: 0,
  keepAlive: true
};

export class ExpirableMap<EMKey = any, EMVal = any> extends Map<EMKey, EMVal> {
  timeouts: Map<EMKey, NodeJS.Timeout>;
  public readonly [Symbol.toStringTag] = 'ExpirableMap';
  defaultTimeInMs: number;
  keepAlive: boolean;

  constructor(
    entries: Array<[EMKey, EMVal, number?]> = [],
    options: ExpirableMapOptions = defaultOptions
  ) {
    super();
    this.defaultTimeInMs = options.defaultTimeInMs || 0;
    this.keepAlive = options.keepAlive ?? true;
    this.timeouts = new Map<EMKey, NodeJS.Timeout>();
    if (entries)
      entries.forEach((entry) =>
        this.set(entry[0], entry[1], entry[2] || this.defaultTimeInMs)
      );
  }

  setExpiration(key: EMKey, timeInMs = this.defaultTimeInMs) {
    this.timeouts.set(
      key,
      setTimeout(() => {
        this.delete(key);
      }, timeInMs)
    );
    return this;
  }

  set(key: EMKey, value: EMVal, timeInMs = this.defaultTimeInMs) {
    if (this.keepAlive) this.clearTimeout(key);
    if ((this.keepAlive || !this.has(key)) && timeInMs !== 0)
      this.setExpiration(key, timeInMs);
    return super.set(key, value);
  }

  delete(key: EMKey) {
    const superReturn = super.delete(key);
    this.clearTimeout(key);
    return superReturn;
  }

  clearTimeout(key: EMKey) {
    clearTimeout(this.timeouts.get(key));
    this.timeouts.delete(key);
  }
}
