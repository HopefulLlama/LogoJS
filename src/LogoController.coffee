window.logoController = logoApp.controller('LogoController', [
	'$scope'
	'$timeout'
	'TurtleFactory'
	'CanvasFactory'
	($scope, $timeout, TurtleFactory, CanvasFactory) -> 
		angular.element(document).ready( ->
			$scope.canvas = new CanvasFactory("canvas")
			x = $scope.canvas.domElement.width/2
			y = $scope.canvas.domElement.height/2
			$scope.turtle = new TurtleFactory(x, y)

			$timeout( ->
				journey = $scope.turtle.move(40)

				$scope.canvas.context.beginPath()
				$scope.canvas.context.moveTo(journey.start.x, journey.start.y)
				$scope.canvas.context.lineTo(journey.end.x, journey.end.y)
				$scope.canvas.context.stroke()

				$timeout(->
					$scope.turtle.rotate(-120)
					journey = $scope.turtle.move(40)

					$scope.canvas.context.beginPath()
					$scope.canvas.context.moveTo(journey.start.x, journey.start.y)
					$scope.canvas.context.lineTo(journey.end.x, journey.end.y)
					$scope.canvas.context.stroke()

					$timeout( ->
						$scope.turtle.rotate(-120)
						journey = $scope.turtle.move(40)

						$scope.canvas.context.beginPath()
						$scope.canvas.context.moveTo(journey.start.x, journey.start.y)
						$scope.canvas.context.lineTo(journey.end.x, journey.end.y)
						$scope.canvas.context.stroke()
					, 3000)
				, 3000)
			, 3000)
		)
])