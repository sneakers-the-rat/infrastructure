// https://github.com/hakimel/css/blob/master/progress-nav/script.js

document.addEventListener("DOMContentLoaded", function() {

	var toc = document.querySelector( '.toc' );
	var tocPath = document.querySelector( '.toc-marker path' );
	var tocItems;
	var tocOLs;

	// Factor of screen size that the element must cross
	// before it's considered visible
	var TOP_MARGIN = 0.0,
		BOTTOM_MARGIN = 0.2;

	var pathLength;

	var lastPathStart,
		lastPathEnd;

	var lastVisible;
	var lastContainer;

	// window.addEventListener( 'resize', drawPath, false );
	window.addEventListener( 'scroll', sync, false );

	initPath();
	// drawPath();

	function initPath() {

		tocItems = [].slice.call( toc.querySelectorAll( 'li' ) );
		tocOLs = [].slice.call( toc.querySelectorAll( 'ol' ) );

		// Cache element references and measurements
		tocItems = tocItems.map( function( item ) {
			var anchor = item.querySelector( 'a' );
			var target = document.getElementById( anchor.getAttribute( 'href' ).slice( 1 ) );

			return {
				listItem: item,
				anchor: anchor,
				target: target
			};
		} );

		// Remove missing targets
		tocItems = tocItems.filter( function( item ) {
			return !!item.target;
		} );
	}

	// function drawPath() {


	// 	var path = [];
	// 	var pathIndent;

	// 	tocItems.forEach( function( item, i ) {

	// 		var x = item.anchor.offsetLeft - 5,
	// 			y = item.anchor.offsetTop,
	// 			height = item.anchor.offsetHeight;

	// 		if( i === 0 ) {
	// 			path.push( 'M', x, y, 'L', x, y + height );
	// 			item.pathStart = 0;
	// 		}
	// 		else {
	// 			// Draw an additional line when there's a change in
	// 			// indent levels
	// 			if( pathIndent !== x ) path.push( 'L', pathIndent, y );

	// 			path.push( 'L', x, y );

	// 			// Set the current path so that we can measure it
	// 			tocPath.setAttribute( 'd', path.join( ' ' ) );
	// 			item.pathStart = tocPath.getTotalLength() || 0;

	// 			path.push( 'L', x, y + height );
	// 		}

	// 		pathIndent = x;

	// 		tocPath.setAttribute( 'd', path.join( ' ' ) );
	// 		item.pathEnd = tocPath.getTotalLength();

	// 	} );

	// 	pathLength = tocPath.getTotalLength();

	// 	// sync();

	// }

	function sync() {

		var windowHeight = window.innerHeight;

		var pathStart = pathLength,
			pathEnd = 0;

		var visibleItems = 0;

		let visibleDOMItems = toc.querySelectorAll('visible');

		tocItems.forEach( function( item, i ) {

			var targetBounds = item.target.getBoundingClientRect();

			// console.log('toc', tocItems, targetBounds);

			// let nextBounds = i < tocItems.

			if( targetBounds.bottom > windowHeight * TOP_MARGIN && targetBounds.top < windowHeight * ( 1 - BOTTOM_MARGIN ) ) {
				pathStart = Math.min( item.pathStart, pathStart );
				pathEnd = Math.max( item.pathEnd, pathEnd );

				visibleItems += 1;

				if (lastContainer !== item.listItem.parentElement && lastVisible !== undefined){
					// toggleParents(lastVisible.listItem, false);
					tocOLs.forEach(ol => ol.classList.remove('opened'));
				}

				lastVisible = item;

				lastContainer = item.listItem.parentElement;


				item.listItem.classList.add( 'visible' );
				toggleParents(item.listItem, true);
				// console.log('visible item', item);

			}
			else {
				if (visibleItems>1 || item !== lastVisible){
				    item.listItem.classList.remove( 'visible' );
			    }

			}

		} );


		// Specify the visible path or hide the path altogether
		// if there are no visible items
		// if( visibleItems > 0 && pathStart < pathEnd ) {
		// 	if( pathStart !== lastPathStart || pathEnd !== lastPathEnd ) {
		// 		tocPath.setAttribute( 'stroke-dashoffset', '1' );
		// 		tocPath.setAttribute( 'stroke-dasharray', '1, '+ pathStart +', '+ ( pathEnd - pathStart ) +', ' + pathLength );
		// 		tocPath.setAttribute( 'opacity', 1 );
		// 	}
		// }
		// else {
		// 	// tocPath.setAttribute( 'opacity', 0 );
		// }

		lastPathStart = pathStart;
		lastPathEnd = pathEnd;

	}

	function toggleParents(item, open){
		if (item === undefined){
			return
		}
		
		let container = item.parentElement;
		if (open === true){
			lastContainer = container;
		} else {
			// don't shut if we should be open!
			if (container === lastContainer){
				return
			}
		}
		while (!container.classList.contains('toc')){
			if (open === true){
				container.classList.add('opened');
				
				// open any first-layer children if we have
				item.childNodes.forEach(child => {
					if (child.tagName === "OL"){
						child.classList.add('opened');
					}
				});
			} else {
				container.classList.remove('opened');
			}
			container = container.parentElement;
		}


	}


    function checkContainers(item){
    	if (lastContainer == undefined ){
    		lastContainer = item.listItem.parentElement;
    	}
    	if (item.listItem.parentElement !== lastContainer){
    		if (!lastContainer.contains(item.listItem.parentElement)){
    			let remcontainer = lastContainer;
    			while (!remcontainer.classList.contains('toc')){
    				remcontainer.classList.remove('opened');
    				remcontainer = remcontainer.parentElement;
    			}

    		}

    		lastContainer = item.listItem.parentElement;

    		let addcontainer = lastContainer;
    		while (!addcontainer.classList.contains('toc')){
    			addcontainer.classList.add('opened');
    			addcontainer = addcontainer.parentElement;
    		}

    		// drawPath();
    	}

	}

}
)
