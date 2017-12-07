var container = document.getElementById('container')
var mousePosition
var offset = [0,0]
var dragging = false

container.addEventListener('mousedown', function(event) {
	var newDiv = document.createElement('div')
	var newSpanTitle = document.createElement('span')
	var newSpanDelete = document.createElement('span')

  newDiv.setAttribute('id', 'tagging-elem')
  newSpanTitle.setAttribute('id', 'title')
  newSpanDelete.setAttribute('id', 'delete')
  newSpanDelete.setAttribute('hidden', '')

  newSpanTitle.innerHTML = getLorem()
  newSpanDelete.innerHTML = 'X'

  document.getElementById('container').appendChild(newDiv)
  newDiv.appendChild(newSpanTitle)
  newDiv.appendChild(newSpanDelete)

	var domRect = newDiv.getBoundingClientRect()
	newDiv.style.left = event.clientX - domRect.width / 2 - domRect.left + 'px'
	newDiv.style.top = event.clientY - domRect.height / 2 - domRect.top + 'px'
	event.preventDefault()

	newDiv.addEventListener('mousedown', function(event) {
		dragging = true
	  offset = [
	  	newDiv.offsetLeft - event.clientX,
	    newDiv.offsetTop - event.clientY
	  ]
		event.stopPropagation()
	}, true)

	newDiv.addEventListener('mouseup', function() {
		dragging = false
	}, true)

	newDiv.addEventListener('mousemove', function(event) {
		var containerInnerCoords = {
			top: domRect.top + container.clientTop,
			left: domRect.left + container.clientLeft
	 	}

		var newDivCoords = {
			top: event.clientY - containerInnerCoords.top - newDiv.clientHeight / 2,
			left: event.clientX - containerInnerCoords.left - newDiv.clientWidth / 2
		}

		if (dragging) {
				//height border
			if (newDivCoords.top < 0) newDivCoords.top = 0

				//left border
	    if (newDivCoords.left < 0) {
				newDivCoords.left = 0
				newSpanDelete.style.left = '100%'
			}
				//right border
			if (newDivCoords.left + newDiv.clientWidth > container.clientWidth) {
				newDivCoords.left = container.clientWidth - newDiv.clientWidth
				newSpanDelete.style.right = '100%'
			}

				//bottom border
			if (newDivCoords.top + newDiv.clientHeight > container.clientHeight) {
				newDivCoords.top = container.clientHeight - newDiv.clientHeight
			}

			newDiv.style.left = newDivCoords.left + 'px'
		 	newDiv.style.top = newDivCoords.top + 'px'
		}
		event.preventDefault()
	}, true)

	newSpanTitle.addEventListener('dblclick' ,function () {
		newSpanDelete.hidden = !newSpanDelete.hidden
	},false)

	newSpanDelete.addEventListener('click', function () {
		this.parentNode.parentNode.removeChild(this.parentNode)
	 	newDiv.appendChild(newSpanDelete)
	}, false)
 }, false)

function getLorem() {
	var arr = ['Lorem' ,'Lorem ipsum', 'ipsum', 'ipsum dolor', 'dolor']
	var rand = Math.floor(Math.random() * arr.length)
  return (arr[rand])
}
