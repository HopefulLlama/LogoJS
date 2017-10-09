import ParameterValuesMap from '../parameter/ParameterValueMap';

export default class Routine {
  name: string;
  parameters: string[];
  body: string[];

  constructor(name: string, parameters: string[], body: string[]) {
    this.name = name;
    this.parameters = parameters;
    this.body = body;
  }  

  createParameterValueMap(values: any[]): ParameterValuesMap {
    let map = new Map();
    if(values.length === this.parameters.length) {
      this.parameters.reduce((accumulator: any, parameterName: string, index: number) => {
        accumulator.set(parameterName, values[index]);
        return accumulator;
      }, map);
    }
    return new ParameterValuesMap(map);
  }
}