angular.module('LogoApp').service('ParameterService', [function() {
  this.FINITE_NUMBER = (parameter) => {
    return isFinite(parameter);
  };
}]);