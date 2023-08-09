export const library = () => {
	
	
	const form = document.querySelector('form');
	
	let myLibrary = [];

	function Book(title, author, currentPage, pages, readStatus) {
		this.title = title;
		this.author = author;
		this.currentPage = currentPage;
		this.pages = pages;
		this.readStatus = readStatus;
	}
	
	const persepolis = new Book('Persepolis', 'Marjane Satrapi', 343, 343, 'completed');
	const theSellout = new Book('The Sellout', 'Paul Beatty', 289, 289, 'completed');
	const oneHundredYears = new Book('One Hundred Years of Solitude', 'Gabriel Garcia Marquez', 132, 336, 'reading');
	const republicOfCaste = new Book('Republic of Caste', 'Anand Teltumbde', 91, 822, 'reading');
	
	function addBookToLibrary(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formDataObj = {};
		formData.forEach((value, key) => formDataObj[key] = value);
		let readStatus = '';
		if (formDataObj.current == formDataObj.pages) {
			readStatus = 'completed';
		} else {
			readStatus = 'reading';
		}
		
		const newBook = new Book(
							formDataObj.title,
							formDataObj.author,
							formDataObj.current,
							formDataObj.pages,
							readStatus
		);
		myLibrary.push(newBook);
		console.log(myLibrary);
	};
	
	form.addEventListener('submit', addBookToLibrary);
}


