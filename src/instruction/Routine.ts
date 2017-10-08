function createParameterValueMap(values: any[], parameters: any[]): any {
  if(values.length === parameters.length) {
    return parameters.reduce((accumulator, parameterName, index) => {
      accumulator[parameterName] = values[index];
      return accumulator;
    }, {});
  }
}

export default class Routine {
  name: string;
  parameters: string[];
  body: string[];

  constructor(name: string, parameters: string[], body: string[]) {
    this.name = name;
    this.parameters = parameters;
    this.body = body;
  }  

  parseBody(values: any[]): string[] {
    let parameterValues = createParameterValueMap(values, this.parameters);

    return this.body.map((word) => {
      if(parameterValues[word] !== undefined) {
        return parameterValues[word];
      } else {
        return word;
      }
    });
  }
}