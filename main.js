
 var dragging = null
 var mouseOffset = null
 var draggableField = document.getElementById('container')
 var newDivCoords

 draggableField.addEventListener('touchstart', onTouch, false)
 draggableField.addEventListener('mousedown', onTouch, false)
 document.querySelector('body').addEventListener('mouseup', onTouchEnd, false)
 document.querySelector('body').addEventListener('touchend', onTouchEnd, false)
 document.querySelector('body').addEventListener('touchmove', onMove, false)
 document.querySelector('body').addEventListener('mousemove', onMove, false)

 function onTouch(event)
 {
     event.preventDefault()
     dragging = event.target

     if (dragging.id === 'container') {

         var newDiv = document.createElement('div')
             newDiv.setAttribute('class', 'tagging-elem')
         if (event.type === 'touchstart') {
             event.y = event.touches[0].clientY
             event.x =event.touches[0].clientX
         }

				 function getLorem() {
				 		var arr = ['Lorem' ,'Lorem ipsum', 'ipsum', 'ipsum dolor', 'dolor']
				  	var rand = Math.floor(Math.random() * arr.length)
				  	 return (arr[rand])
				 }

         newDiv.innerText = getLorem()
         newDiv.style.top = event.y - event.target.offsetTop - 10 + 'px'
         dragging.appendChild(newDiv)

         var newDivDelete = document.createElement('div')
         newDivDelete.setAttribute('class', 'remove')
         newDivDelete.innerText = 'X'
         newDiv.appendChild(newDivDelete)

         if (event.x - event.target.offsetLeft - 30 < 0) {
             newDiv.style.left = '0px'
             newDiv.children[0].style.float = 'right'
         } else {
             newDiv.style.left = event.x - event.target.offsetLeft - 30 + 'px'
         }


     } else if (dragging.classList.contains('remove')) {
         draggableField.removeChild(event.target.parentNode)
     } else {

         var pos = getPosition(dragging)

				 function getPosition(event) {
				 		var left = 0
				      var top  = 0

				      while (event.offsetParent) {
				          left += event.offsetLeft
				          top += event.offsetTop
				          event = event.offsetParent
				      }

				      left += event.offsetLeft
				      top += event.offsetTop

				      return {
				          x: left,
				          y: top
				      }
				  }

         mouseOffset= {
             x: event.pageX - pos.x,
             y: event.pageY - pos.y
         }
     }
 }

 function onTouchEnd() {
     dragging = null
 }

 function onMove(event) {
     if (dragging && dragging.classList.contains('tagging-elem')) {

         var domRect = draggableField.getBoundingClientRect()

         var containerInnerCoords = {
             top: domRect.top + draggableField.clientTop,
             left: domRect.left + draggableField.clientLeft
         }

         if (event.type === 'touchmove') {
             newDivCoords = {
                 top: event.changedTouches[0].clientY - containerInnerCoords.top - mouseOffset.y,
                 left: event.changedTouches[0].clientX - containerInnerCoords.left - mouseOffset.x
             }
         } else {
             newDivCoords = {
                 top: event.clientY - containerInnerCoords.top - mouseOffset.y,
                 left: event.clientX - containerInnerCoords.left - mouseOffset.x
             }
         }

         if (newDivCoords.top < 0) newDivCoords.top = 0

         if (newDivCoords.left < 0) {
             newDivCoords.left = 0
         }
         if (newDivCoords.left + dragging.clientWidth > draggableField.clientWidth) {
             newDivCoords.left = draggableField.clientWidth - dragging.clientWidth
         }

         if (newDivCoords.top + dragging.clientHeight > draggableField.clientHeight) {
             newDivCoords.top = draggableField.clientHeight - dragging.clientHeight
         }
         var removeElement = dragging.children[0]
         newDivCoords.left > 30 ? removeElement.style.float = 'left' : removeElement.style.float = 'right'
         dragging.style.left = newDivCoords.left - 1 + 'px'
         dragging.style.top = newDivCoords.top + 'px'

     }
 }
