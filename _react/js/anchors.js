import AnchorJS from 'anchor-js';
const anchors = new AnchorJS();
const anchors_li = new AnchorJS();

anchors.options.placement = 'left';

document.addEventListener('DOMContentLoaded', () => {
	anchors.add('h2, h3, h4, h5, h6, .post p');
	anchors_li.add('.post li');
	console.log('added anchors')
})
