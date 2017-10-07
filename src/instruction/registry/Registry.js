export default class Registry {
  constructor() {
    this.register = {};
  }

  setItem(name, item) {
    this.register[name] = item;
  }

  getItem(name) {
    return this.register[name];
  }

  getKeys() {
    return Object.keys(this.register);
  }
}