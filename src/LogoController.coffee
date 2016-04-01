window.logoController = logoApp.controller('LogoController', [
	'$scope'
	'$timeout'
	'TurtleFactory'
	'CanvasFactory'
	($scope, $timeout, TurtleFactory, CanvasFactory) -> 
		instatiateDefaultTurtle = (canvas) ->
			x = canvas.domElement.width/2
			y = canvas.domElement.height/2
			$scope.turtle = new TurtleFactory(x, y)


		angular.element(document).ready( ->
			$scope.canvas = new CanvasFactory("canvas")
		)

		$scope.commands = {
			forward: (distance) ->
				journey = $scope.turtle.move(distance)
				$scope.canvas.drawLine(journey)
			back: (distance) ->
				journey = $scope.turtle.move(0 - distance)
				$scope.canvas.drawLine(journey)
			left: (degree) ->
				$scope.turtle.rotate(degree)
			right: (degree) ->
				$scope.turtle.rotate(0-degree)
		}

		$scope.executeCommands = (input) ->
			instatiateDefaultTurtle($scope.canvas)
			$scope.canvas.context.clearRect(0, 0, $scope.canvas.domElement.width, $scope.canvas.domElement.height)

			if input? 
				lines = input.split("\n")
				commands = lines.join(" ")
				words = commands.split(" ")
				for i in [0..words.length]
					if $scope.commands[words[i]]?
						$scope.commands[words[i]](parseInt(words[i+1], 10))
						i++

])