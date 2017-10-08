import Keywords from '../instruction/Keywords';
import Parameter from './Parameter';

export default {
  FINITE_NUMBER: new Parameter((parameter: number): boolean => {
    return isFinite(parameter);
  }, (parameter: string): number => {
    return parseFloat(parameter);
  }),
  UP_DOWN: new Parameter((parameter: string): boolean => {
    return parameter === Keywords.UP || parameter === Keywords.DOWN;
  }, (parameter: string): string => {
    return parameter.toString();
  }),
  NOT_KEYWORD: new Parameter((parameter: string): boolean => {
    return /^[a-z].*/.test(parameter) && Object.values(Keywords).indexOf(parameter) === -1;
  }, (parameter: string): string => {
    return parameter.toString();
  })
};