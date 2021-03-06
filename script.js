const listLink = document.getElementById('list-link');
const addNewLink = document.getElementById('add-link');
const contactLink = document.getElementById('contact-link');
const addButtonContainer = document.getElementById('add-btn-container');
const awesomeBookContainer = document.getElementById('list');
const contact = document.getElementById('contact');
const dateTime = document.getElementById('date-time');

listLink.addEventListener('click', () => {
  awesomeBookContainer.style.display = 'block';
  addButtonContainer.style.display = 'none';
  contact.style.display = 'none';
});

addNewLink.addEventListener('click', () => {
  awesomeBookContainer.style.display = 'none';
  addButtonContainer.style.display = 'block';
  contact.style.display = 'none';
});

contactLink.addEventListener('click', () => {
  awesomeBookContainer.style.display = 'none';
  addButtonContainer.style.display = 'none';
  contact.style.display = 'block';
});

class AwesomeBooks {
  // Initializations
  constructor() {
    this.books = [];
    this.awesomeBooks = document.getElementById('awesome-book');
    this.button = document.getElementById('add-btn');
  }

  // display book
  displayBooks(book) {
    let bookContainer = '';
    book.forEach((arrayItem, index) => {
      const bookContent = `<div id=div${index} class="book-container display-flex">    
    <h4>"${arrayItem.title}" by ${arrayItem.author}</h4>    
    <div><button class="remove-book" id=${index} type="button">Remove</button></div>    
    </div>`;
      bookContainer += bookContent;
    });
    this.awesomeBooks.innerHTML = bookContainer;
  }

  // get books in html page if it exist in local storage
  getLocalStorageData() {
    const data = JSON.parse(localStorage.getItem('bookdata'));
    if (data !== null) {
      this.displayBooks(data);

      const bookContent = document.querySelectorAll('.book-container');
      bookContent.forEach((item, index) => {
        if (index % 2 === 0) {
          document.getElementById(item.id).style.backgroundColor = '#D0D0D0';
        }
      });
    } else {
      this.awesomeBooks.style.display = 'none';
    }
  }

  // Render book
  AddOnClick() {
    this.button.onclick = () => {
      const titleValue = document.getElementById('title').value;
      const authorValue = document.getElementById('author').value;
      const data = JSON.parse(localStorage.getItem('bookdata'));
      if (data !== null) {
        this.books = data;
      }
      if (titleValue === '' || authorValue === '') {
        return;
      }
      const newBook = { title: titleValue, author: authorValue };
      this.books.push(newBook);
      localStorage.setItem('bookdata', JSON.stringify(this.books));
      this.getLocalStorageData();
      window.location.reload();
    };
  }

  // delete book
  deleteBook() {
    const removeBook = document.querySelectorAll('.remove-book');
    removeBook.forEach((item) => {
      item.addEventListener('click', () => {
        const data = JSON.parse(localStorage.getItem('bookdata'));
        if (data != null) {
          const filtered = data.filter((ele) => ele !== data[item.id]);
          localStorage.setItem('bookdata', JSON.stringify(filtered));
          this.getLocalStorageData();
        }
        window.location.reload();
      });
    });
  }
}
const newBooks = new AwesomeBooks();
if (localStorage.getItem('bookdata') !== null) {
  newBooks.getLocalStorageData();
}
newBooks.AddOnClick();
newBooks.deleteBook();

const currentDate = () => {
  const newDate = new Date();
  dateTime.innerHTML = `${newDate.toDateString()}, ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}pm `;
  setTimeout(currentDate, 1000);
};
window.onload = currentDate();
