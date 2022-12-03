// Create a class called ExpirableMap that extends Map and has a method called expire that takes a key and a time in milliseconds. The method should set a timeout that will remove the key from the map after the time has passed.
export class ExpirableMap extends Map {
  timeouts;
  constructor(private defaultTimeInMs = 0) {
    super();
    this.timeouts = new Map();
  }
  setExpiration(key: any, timeInMs = this.defaultTimeInMs) {
    const timeout = setTimeout(() => {
      this.delete(key);
    }, timeInMs);
    this.timeouts.set(key, timeout);
  }
  set(key: any, value: any, timeInMs = this.defaultTimeInMs) {
    super.set(key, value);
    if (timeInMs != 0) {
      if (this.timeouts.has(key)) clearTimeout(this.timeouts.get(key));
      this.setExpiration(key, timeInMs);
    }
    return this;
  }
}
