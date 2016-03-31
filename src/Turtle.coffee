class window.Turtle
	constructor: (@position = {x: 0, y: 0}, @angle = 0) ->
	move: (distance) ->
		radians = Math.PI * @angle/180
		@position.x = @position.x + (distance * Math.cos(radians))
		@position.y = @position.y + (distance * Math.sin(radians))
		return @
	rotate: (degree) ->
		@angle += degree
		return @