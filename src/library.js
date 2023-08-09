export const library = () => {
	
	
	const form = document.querySelector('form');
	
	let myLibrary = [];

	// book constructor
	function Book(title, author, currentPage, pages) {
		this.title = title;
		this.author = author;
		this.currentPage = currentPage;
		this.pages = pages;
	}
	
	// prototype function to check readStatus
	Book.prototype.readStatus = function(){
		if (this.currentPage == this.pages) {
			return 'Completed';
		} else {
			return Math.round((this.currentPage/this.pages)*100);
		}
	}
	
	// function to push books to myLibary array
	function pushToLibrary(formData) {
		const formDataObj = Object.fromEntries(formData.entries());
		const newBook = new Book(
							formDataObj.title,
							formDataObj.author,
							formDataObj.current,
							formDataObj.pages
		);
		newBook['status'] = newBook.readStatus();
		myLibrary.push(newBook);
		console.log(myLibrary);
	};
	
	// function to create element and append to the DOM
	function test() {
		
	};
	
	//~ const book1 = new Book('Persepolis', 'Marjane Satrapi', 343, 343, 'completed');
	//~ const book2 = new Book('The Sellout', 'Paul Beatty', 289, 289, 'completed');
	//~ const book3 = new Book('One Hundred Years of Solitude', 'Gabriel Garcia Marquez', 132, 336, 'reading');
	//~ const book4 = new Book('Republic of Caste', 'Anand Teltumbde', 91, 822, 'reading');
	
	//~ myLibrary.push(book1, book2, book3, book4);
	
	function addBookToLibrary(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		pushToLibrary(formData);
	};
	
	form.addEventListener('submit', addBookToLibrary);
}


