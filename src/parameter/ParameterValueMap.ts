export default class ParameterValueMap {
  map: Map<string, any>;

  constructor(map: Map<string, any>) {
    this.map = map;
  }

  substituteParameters(parameters: string[]): any[] {
    return parameters.map((word: string) => {
      if(this.map.has(word)) {
        return this.map.get(word);
      } else {
        return word;
      }
    });
  }
}