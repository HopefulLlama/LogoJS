logoApp.factory('TurtleFactory', [-> 
	class Turtle
		constructor: (x=0, y=0, @angle = 180) ->
			@position = {
				x: x
				y: y
			}
		move: (distance) ->
			startPosition = {
				x: @position.x
				y: @position.y
			}
			radians = Math.PI * @angle/180
			@position.x = @position.x + (distance * Math.sin(radians))
			@position.y = @position.y + (distance * Math.cos(radians))
			endPosition = {
				x: @position.x
				y: @position.y
			}
			return {
				start: startPosition
				end: endPosition
			}
		rotate: (degree) ->
			@angle += degree
			@angle = @angle % 360 
			if @angle < 0 then @angle += 360

			return @
])