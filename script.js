let books = [];
const awesomeBook = document.getElementById('awesome-book');

// function that adds new books
function AddBook(title, author) {
  this.title = title;
  this.author = author;
}

// display added books on html page
function displayBook() {
  const bookContainer = document.createElement('div');
  books.forEach((arrayItem, index) => {
    awesomeBook.appendChild(bookContainer);
    bookContainer.id = `${index}`;
    document.getElementById(`${index}`).innerHTML = `<h4>${arrayItem.title}</h4>
    <h4>${arrayItem.author}</h4>
    <button class="remove-book" id="${index}" type="button">Remove</button>
    <hr>`;
  });
}

// delete books
function deleteBook() {
  const removeBook = document.querySelectorAll('.remove-book');
  removeBook.forEach((item) => {
    item.addEventListener('click', () => {
      const bookContainer = document.getElementById(`${item.id}`);
      bookContainer.remove();
      delete books[item.id];
    });
  });
}

// add & display new book
document.getElementById('add-btn').addEventListener('click', () => {
  const titleValue = document.getElementById('title').value;
  const authorValue = document.getElementById('author').value;
  if (titleValue === '' || authorValue === '') {
    return;
  }
  const newBook = new AddBook(titleValue, authorValue);
  books.push(newBook);
  displayBook();
  localStorage.setItem('allbooks', JSON.stringify(books));
  deleteBook();
});

// filter out deleted book
const filtered = books.filter((book) => book !== null);
books = [...filtered];
localStorage.setItem('allbooks', JSON.stringify(books));