let bibtex = document.querySelectorAll(".bibtex-button");

bibtex.forEach( item => {
	item.addEventListener('click', function() {
		this.nextElementSibling.classList.toggle('collapsed');
	})
})
