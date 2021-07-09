console.log('This is ES6 version');
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {
    add(book) {
        console.log("Adding to UI");
        let tableBody = document.getElementById('tableBody');
        let uiString = `<tr>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.type}</td>
                        </tr>`;
        tableBody.innerHTML += uiString;
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false
        }
        else {
            return true;
        }
    }

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if(type==='success'){
            boldText = 'Success';
        }
        else{
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 5000);
    
    }
}

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('YOu have submitted library form');
    let name = document.getElementById('bookName');
    let author = document.getElementById('author');
    let difftype;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        difftype = fiction.value;
    }
    else if (programming.checked) {
        difftype = programming.value;
    }
    else if (cooking.checked) {
        difftype = cooking.value;
    }

    //let book = new Book(name, author, type);
    //console.log(book);
    let books = localStorage.setItem("book");
    if(books == null){
        booksObj =[];
    }
    else{
        booksObj = JSON.parse(books);
    }
    let myObj ={
        name : name.value,
        author : author.value,
        type : difftype.value,

    }
    booksObj.push(myObj);

    
    localStorage.setItem("books", JSON.stringify(booksObj));
    let display = new Display();
    if (display.validate(book)) {

        display.add(book);
        display.clear();
        display.show('success', 'Your book has been successfully added')
    }
    else {
        // Show error to the user
        display.show('danger', 'Sorry you cannot add this book');
    }

    e.preventDefault();
}
