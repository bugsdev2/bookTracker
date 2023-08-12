export const library = () => {
	
	// library properties
	const library = document.querySelector('.library');
	const addBookBtn = document.querySelector('.addbtn');
	const deleteBtn = document.querySelector('.book-container button');
	
	// form properties
	const formWrapper = document.querySelector('.form-wrapper');
	const form = document.querySelector('form');
	const formCloseBtn = document.querySelector('form .close');
	const formInput = document.querySelector('form input');
	
	// creating library arrayto store books
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
		if (newBook.title == '' || newBook.author == '' || newBook.currentPage == '' || newBook.pages == '') return;
		newBook['status'] = newBook.readStatus();
		myLibrary.push(newBook);
		updateLibrary(myLibrary);
	};
	
	// function to convert to percentage
	function convertToPercent(currentPage, pages) {
		return Math.round((currentPage/pages)*100);
	};
	
	// function to update library display
	function updateLibrary(myLibrary) {
		myLibrary.forEach(book => {
			const bookContainer = document.createElement('div');
				bookContainer.classList.add('book-container');
				library.appendChild(bookContainer);
			const closeBtn = document.createElement('button');
				closeBtn.classList.add('close');
				closeBtn.innerHTML = '<span class="material-symbols-rounded">cancel</span>';
				bookContainer.appendChild(closeBtn);
			const bookInfo = document.createElement('div');
				bookInfo.classList.add('bookinfo');
				bookContainer.appendChild(bookInfo);
			const bookTitle = document.createElement('p');
				bookTitle.classList.add('title');
				bookTitle.textContent = `'${book.title}'`;
				bookInfo.appendChild(bookTitle);
			const bookAuthor = document.createElement('p');
				bookAuthor.classList.add('author');
				bookAuthor.textContent = book.author;
				bookInfo.appendChild(bookAuthor);
			const pageStatus = document.createElement('div');
				pageStatus.classList.add('page-status');
				bookContainer.appendChild(pageStatus);
			const pages = document.createElement('p');
				pages.textContent = `${book.currentPage} / ${book.pages}`;
				pageStatus.appendChild(pages);
			const percent = document.createElement('p');
				let percentage = convertToPercent(book.currentPage, book.pages);
				percent.textContent = `${percentage}% complete`;
				pageStatus.appendChild(percent);
			const progressBar = document.createElement('progress');
				progressBar.setAttribute('value', percentage);
				progressBar.setAttribute('max', '100');
				bookContainer.appendChild(progressBar);
		});
	};
	
	// getting form data from the form
	function addBookToLibrary(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		pushToLibrary(formData);
	};
	
	// funtion to open new book form 
	function openNewBookForm(e) {
		formWrapper.style.setProperty('display', 'flex');
	};
	
	// function for closing the form
	function closeForm() {
		if (formInput.value == '' ) {
			formWrapper.style.setProperty('display', 'none');
		} else {
			if (confirm('Do you want to close the window?')) {
				formWrapper.style.setProperty('display', 'none');
			}
		}
	};
	
	// function for deleting books
	function deleteBook(e) {
		console.log(e.target);
	};
	
	// adding predefined book objects
	const book1 = new Book('Persepolis', 'Marjane Satrapi', 240, 343, 'completed');
	const book2 = new Book('The Sellout', 'Paul Beatty', 289, 289, 'completed');
	const book3 = new Book('One Hundred Years of Solitude', 'Gabriel Garcia Marquez', 132, 336, 'reading');
	const book4 = new Book('Salvation of a Saint', 'Keigo Higashino', 204, 377, 'reading');
	myLibrary.push(book1, book2, book3, book4);
	updateLibrary(myLibrary);
	
	// event listener for adding book to library
	form.addEventListener('submit', addBookToLibrary);
	
	// event listener for opening new book form
	addBookBtn.addEventListener('click', openNewBookForm);
	
	// event listener for closing the form
	formCloseBtn.addEventListener('click', closeForm);

	// event listener for deleting the book container
	deleteBtn.addEventListener('click', deleteBook);
	
}


