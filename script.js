let books = [];
const awesomeBooks = document.getElementById('awesome-book');
const button = document.getElementById('add-btn');

// display book
function displayBooks(book) {
  let bookContainer = '';
  book.forEach((arrayItem, index) => {
    const bookContent = `<div>
    <h4>${arrayItem.title}</h4>
    <h4>${arrayItem.author}</h4>
    <button class="remove-book" id=${index} type="button">Remove</button>
    <hr>
    </div>`;
    bookContainer += bookContent;
  });
  awesomeBooks.innerHTML = bookContainer;
}

// get books in html page if it exist in local storage
function getLocalStorageData() {
  const data = JSON.parse(localStorage.getItem('bookdata'));
  if (data !== null) {
    displayBooks(data);
  } else {
    awesomeBooks.style.display = 'none';
  }
}
// display books in html page if it exist in local storage
if (localStorage.getItem('bookdata') !== null) {
  getLocalStorageData();
}

// function that creates book
function AddBook(title, author) {
  this.title = title;
  this.author = author;
}

// Render book
button.onclick = () => {
  const titleValue = document.getElementById('title').value;
  const authorValue = document.getElementById('author').value;
  const data = JSON.parse(localStorage.getItem('bookdata'));
  if (data !== null) {
    books = data;
  }
  if (titleValue === '' || authorValue === '') {
    return;
  }
  const newBook = new AddBook(titleValue, authorValue);
  books.push(newBook);
  localStorage.setItem('bookdata', JSON.stringify(books));
  getLocalStorageData();
  window.location.reload();
};

// delete book
function deleteBook() {
  const removeBook = document.querySelectorAll('.remove-book');
  removeBook.forEach((item) => {
    item.addEventListener('click', () => {
      const data = JSON.parse(localStorage.getItem('bookdata'));
      if (data != null) {
        const filtered = data.filter((ele) => ele !== data[item.id]);
        localStorage.setItem('bookdata', JSON.stringify(filtered));
        getLocalStorageData();
      }
      window.location.reload();
    });
  });
}
deleteBook();
