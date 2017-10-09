import Keywords from '../instruction/Keywords';
import Parameter from './Parameter';

function expectationMessage(expect: string, actual: string): string {
  return `Expected ${expect}, but got ${actual}`;
}

export default {
  FINITE_NUMBER: new Parameter((parameter: string): number => {
    let number = parseFloat(parameter);
    if(!isNaN(number) && isFinite(number)) {
      return number;
    } else {
      throw new Error(expectationMessage('a float', parameter));
    }
  }),
  POSITIVE_INTEGER: new Parameter((parameter: string): number => {
    let number = Math.floor(Number(parameter));
    if(String(number) === parameter && number > 0) {
      return number;
    } else {
      throw new Error(expectationMessage('an integer greater than zero', parameter));
    }
  }),
  UP_DOWN: new Parameter((parameter: string): string => {
    if(parameter === Keywords.UP || parameter === Keywords.DOWN) {
      return parameter;
    } else {
      throw new Error(expectationMessage('either "up" or "down"', parameter));
    }
  }),
  NOT_KEYWORD: new Parameter((parameter: string): string => {
    let startsWithLetter = new RegExp(/^[a-z].*/);
    if(startsWithLetter.test(parameter) && Object.values(Keywords).indexOf(parameter) === -1) {
      return parameter;
    } else {
      throw new Error(expectationMessage('non-reserved word', `reserved word: ${parameter}`));
    }
  }),
  HEXADECIMAL: new Parameter((parameter: string): string => {
    let sixDigitHexadecimal = new RegExp(/^#[0-9a-f]{6}$/);
    if(sixDigitHexadecimal.test(parameter)) {
      return parameter;
    } else {
      throw new Error(expectationMessage('six digit hexadecimal colour (prefixed with "#")', parameter));
    }
  })
};