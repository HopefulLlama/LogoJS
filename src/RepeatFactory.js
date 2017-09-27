angular.module('LogoApp').factory('RepeatFactory', [function() {
	class Repeat {
		constructor(parent, frequency) {
			this.parent = parent;
			this.frequency = frequency;
			this.executions = [];
		}

		execute() {
			for(let i = 0; i < this.frequency; i++) {
				this.executions.forEach((execution) => {
					execution.execute();
				});
			}
		}
	}

	return Repeat;
}]);