logoApp.factory('CanvasFactory', [->
	class Canvas
		constructor: (canvasId) ->
			@domElement = document.getElementById(canvasId)
			@context = @domElement.getContext("2d")
			@resize()
		resize: ->
			@domElement.width = @domElement.clientWidth
			@domElement.height = @domElement.clientHeight
		drawLine: (journey) ->
			@context.beginPath()
			@context.moveTo(journey.start.x, journey.start.y)
			@context.lineTo(journey.end.x, journey.end.y)
			@context.stroke()
])