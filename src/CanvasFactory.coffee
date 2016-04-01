logoApp.factory('CanvasFactory', [->
	class Canvas
		constructor: (canvasId) ->
			@domElement = document.getElementById(canvasId)
			@context = @domElement.getContext("2d")
			@resize()
		resize: ->
			@domElement.width = @domElement.clientWidth
			@domElement.height = @domElement.clientHeight			
])