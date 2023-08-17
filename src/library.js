export const library = () => {
	
	// library properties
	const library = document.querySelector('.library');
	const addBookBtn = document.querySelector('.addbtn');
	const booksWrapper = document.querySelector('.books-wrapper');
	
	
	// form properties
	const formWrapper = document.querySelector('.form-wrapper');
	const form = document.querySelector('form');
	const formCloseBtn = document.querySelector('form .close');
	const formInputTitle = document.querySelector('form #title');
	const formInputCurrentPageDiv = document.querySelector('form .current');
	const formInputPagesDiv = document.querySelector('form .pages');
	
	// creating library array to store books
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
		if (newBook.currentPage > newBook.pages) return;
		newBook['status'] = newBook.readStatus();
		myLibrary.push(newBook);
		updateIndex(myLibrary);
		updateLibrary(newBook);
	};
	
	// function to convert to percentage
	function convertToPercent(currentPage, pages) {
		return Math.round((currentPage/pages)*100);
	};
	
	// function to update LIbrary Index
	function updateIndex(myLibrary) {
		myLibrary.forEach(book => {
			book['index'] = myLibrary.indexOf(book);
		});
	};
	
	// function to update library display
	function updateLibrary(book) {
		const bookContainer = document.createElement('div');
			bookContainer.classList.add('book-container');
			booksWrapper.appendChild(bookContainer);
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
			pages.classList.add('pages');
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
			bookContainer.dataset.index = book.index;
		
		// code to change appearance of finished books
		if (book.currentPage == book.pages) {
			bookContainer.classList.add('done');
			percent.textContent = `Completed`;
			
		} else {
			bookContainer.classList.remove('done');
			percent.textContent = `${percentage}% complete`;
		}
		
		
	};
	
	// getting form data from the form
	function addBookToLibrary(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		formWrapper.style.setProperty('display', 'none');
		pushToLibrary(formData);
	};
	
	// funtion to open new book form 
	function openNewBookForm(e) {
		formWrapper.style.setProperty('display', 'flex');
	};
	
	// function for closing the form
	function closeForm() {
		if (formInputTitle.value == '' ) {
			formWrapper.style.setProperty('display', 'none');
		} else {
			if (confirm('Do you want to close the window?')) {
				formWrapper.style.setProperty('display', 'none');
			}
		}
	};
	
	// function for deleting books
	function deleteBook(e) {
		const deleteBtns = document.querySelectorAll('.book-container .close');
		deleteBtns.forEach(button => {
			if (e.target == button.firstElementChild) {
				if (confirm('This will delete the entry? Do you want to continue?')) {
					let container = e.target.parentElement.parentElement;
					myLibrary.splice(container.getAttribute('data-index'), 1);
					updateIndex(myLibrary);
					clearLibrary();
					myLibrary.forEach(book => {
						updateLibrary(book);
					});
				}
				
			};
		});
	};
	
	// function to clear library screen
	function clearLibrary() {
		booksWrapper.textContent = '';
	};
	
	// function to check if current page goes more than the number of pages
	function checkPages(e) {
		if (formInputPagesDiv.children[1].value == 0) return;
		let currentPage = parseInt(formInputCurrentPageDiv.children[1].value);
		let pages = parseInt(formInputPagesDiv.children[1].value);
		if ( currentPage > pages ) {
			formInputCurrentPageDiv.classList.add('error');
		} else {
			formInputCurrentPageDiv.classList.remove('error');
		}
	};
	
	// function to change current page and number of pages
	function changePages(e) {
		if (e.target.classList[0] == 'pages') {
			const container = e.target.parentElement.parentElement;
			const index = container.getAttribute('data-index');
			
			const miniForm = document.createElement('div');
				miniForm.classList.add('mini-form');
				container.appendChild(miniForm);
			const form = document.createElement('form');
				miniForm.appendChild(form);
			const div1 = document.createElement('div');
				form.appendChild(div1);
			const label1 = document.createElement('label');
				label1.setAttribute('for', 'current-page');
				label1.textContent = 'Current: ';
				div1.appendChild(label1);
			const input1 = document.createElement('input');
				input1.setAttribute('type', 'number');
				input1.setAttribute('id', 'current-page');
				input1.setAttribute('name', 'current-page');
				input1.setAttribute('min', '0');
				input1.setAttribute('value', myLibrary[index].currentPage);
				input1.setAttribute('max', myLibrary[index].pages);
				div1.appendChild(input1);
			const div2 = document.createElement('div');
				form.appendChild(div2);
			const label2 = document.createElement('label');
				label2.setAttribute('for', 'pages');
				label2.textContent = 'Pages: ';
				div2.appendChild(label2);
			const input2 = document.createElement('input');
				input2.setAttribute('type', 'number');
				input2.setAttribute('id', 'pages');
				input2.setAttribute('name', 'pages');
				input2.setAttribute('min', '0');
				input2.setAttribute('value', myLibrary[index].pages);
				div2.appendChild(input2);
			const button = document.createElement('button');
				button.setAttribute('type', 'submit');
				button.textContent = 'Update';
				form.appendChild(button);
			form.addEventListener('submit', function updatePages(e) {
				e.preventDefault();
				const formData = new FormData(e.target);
				const formDataObj = Object.fromEntries(formData);
				myLibrary[index].currentPage = parseInt(formDataObj['current-page']);
				myLibrary[index].pages = parseInt(formDataObj['pages']);
				clearLibrary();
				myLibrary.forEach(book => {
					updateLibrary(book);
				});
			});
		}
	};
	
	// event listener for adding book to library
	form.addEventListener('submit', addBookToLibrary);
	
	// event listener for opening new book form
	addBookBtn.addEventListener('click', openNewBookForm);
	
	// event listener for closing the form
	formCloseBtn.addEventListener('click', closeForm);

	// event listener for deleting the book container
	library.addEventListener('click', deleteBook);
	
	// event listener to check when the current page goes more than the number of pages
	formInputCurrentPageDiv.addEventListener('input', checkPages);
	formInputPagesDiv.addEventListener('input', checkPages);
	
	// function to edit current page and number of pages
	booksWrapper.addEventListener('click', changePages);
	
	
	// adding predefined book objects
	const book1 = new Book('Persepolis', 'Marjane Satrapi', 240, 343, 'completed');
	const book2 = new Book('The Sellout', 'Paul Beatty', 289, 289, 'completed');
	const book3 = new Book('Things Fall Apart', 'Chinua Achebe', 132, 187, 'reading');
	const book4 = new Book('Salvation of a Saint', 'Keigo Higashino', 204, 377, 'reading');
	myLibrary.push(book1, book2, book3, book4);
	updateIndex(myLibrary);
	updateLibrary(book1);
	updateLibrary(book2);
	updateLibrary(book3);
	updateLibrary(book4);
	
	
}


