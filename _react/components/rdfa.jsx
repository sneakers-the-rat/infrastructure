// use this: https://github.com/rdfa/rdfa.github.io/blob/master/play/play.js

import React, { useState, useEffect, useMemo } from 'react';

export default function RDFA(props){

	// console.log('ya2');
	const [faded, setFaded] = useState(false);
	const [highlighted, setHighlighted] = useState();

	const bodyClicked = function(el){
		console.log('body clicked', el);
	}

	const elementClicked = function(el){
		el = el.target;
		// if (!el.classList.contains('rdfa')){
		// 	el = resolveParents(el);
		// }

		if (faded === true){
			setFaded(false);
			setHighlighted(undefined);
		} else {
			setFaded(true)
			setHighlighted(el);
		}
	}

	const resolveParents = function(el){
		while (!el.classList.contains('rdfa')){
			el = el.parentElement;
		}
		return(el);
	}

	const links = useMemo(() => {

		let link_els = document.querySelectorAll('.rdfa');
		console.log(link_els);
		link_els.forEach(el => {
			el.onclick = elementClicked
		})

		let link_arr = Array.from(link_els).map(el => {
			return({
				resource: el.getAttribute('resource'),
				property: el.getAttribute('property'),
				typeof: el.getAttribute('typeof'),
				'element': el
			})
		})
		console.log(link_arr)
		return(link_arr)
	})

	// init links
	useEffect(() => {
		document.body.onclick = bodyClicked;
	}, [])

	// fade page
	useEffect(() => {
		if (faded === true){
			document.body.classList.add('faded')
		} else {
			document.body.classList.remove('faded')
		}
	}, [faded])

	// highlight 
	useEffect(() => {
		links.forEach(link => {
			if (highlighted === undefined || link.resouce !== highlighted.resource){
				link.element.classList.remove('highlighted')
			} else {
				link.element.classList.add('highlighted')
			}
			
		});
		if (highlighted !== undefined){
			highlighted.classList.add('highlighted');
		}
	}, [highlighted])

	

	return(
		<div>hey</div>
	)
}

