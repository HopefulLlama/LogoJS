export default class Registry {
  register: any;

  constructor() {
    this.register = {};
  }

  setItem(name: string, item: any): void {
    this.register[name] = item;
  }

  getItem(name: string): any {
    return this.register[name];
  }

  getKeys(): string[] {
    return Object.keys(this.register);
  }

  reset(): void {
    this.register = {};
  }
}