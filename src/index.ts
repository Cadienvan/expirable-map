export class ExpirableMap extends Map {
  timeouts;
  constructor(private defaultTimeInMs = 0) {
    super();
    this.timeouts = new Map();
  }
  setExpiration(key: any, timeInMs = this.defaultTimeInMs) {
    this.timeouts.set(key, setTimeout(() => {
      this.delete(key);
    }, timeInMs));
    return this;
  }
  set(key: any, value: any, timeInMs = this.defaultTimeInMs) {
    const superReturn = super.set(key, value);
    if (timeInMs != 0) {
      clearTimeout(this.timeouts.get(key));
      this.setExpiration(key, timeInMs);
    }
    return superReturn;
  }

  delete(key: any) {
    const superReturn = super.delete(key);
    clearTimeout(this.timeouts.get(key));
    this.timeouts.delete(key);
    return superReturn;
  }
}