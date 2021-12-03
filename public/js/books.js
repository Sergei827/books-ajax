
/**
 * створює новий блок з 
 * описом книги
 * 
 * @param string bookTitle 
 * @param string bookAuthor 
 * @param string bookGenre 
 * @return node 
 */
let createBookItem = function (bookTitle, bookAuthor, bookGenre)
{
    let div = document.createElement('div');
    div.className = 'book-item';
    
    let htmlString = "<h3 class='book-title'>" + bookTitle + "</h3>";
    htmlString += "<p>Автор: " + bookAuthor + "</p>";
    htmlString += "<p>Жанр: " + bookGenre + "</p>";

    div.innerHTML = htmlString;
    console.log(div);

    return div;
}

/**
 * Створює на основі массиву 
 * фрагмент документу з описом
 * книжок за допомогою callback - функції
 * 
 * @param array booksArr 
 * @param callback creatBook_Func 
 * @return documentFragment
 */
function createBooksList(booksArr, creatBook_Func)
{
    let books = document.createDocumentFragment();
    let book = '';
    let bookTitle = '';
    let bookAuthor = '';
    let bookGenre = '';

    for(let i = 0; i < booksArr.length; i++)
    {
        bookTitle = booksArr[i]['title'];
        bookAuthor = booksArr[i]['author'];
        bookGenre = booksArr[i]['genre']; 

        switch(bookGenre)
        {
            case 'horror':
                bookGenre = 'жахи';
            break; 

            case 'detective':
                bookGenre = 'детектив';
            break;
            
            case 'fantasy':
                bookGenre = 'фентезі';
            break;

            default:
                bookGenre = 'не вказано';
            break;    
        }

        book = creatBook_Func(bookTitle, bookAuthor, bookGenre);
        books.appendChild(book);
    }

    return books;
}


/**
 * Поновлює і відображає список книжок
 */
function renderBooksList(booksList)
{
    let booksWrapper = document.getElementById('books');
    booksWrapper.innerHTML = '';

    booksWrapper.appendChild(booksList);
}



let booksMenu = document.getElementById('books-menu');
let booksLinks = booksMenu.querySelectorAll('.books-menu-link');


for(let i = 0; i < booksLinks.length; i++)
{
    booksLinks[i].addEventListener('click', (event) => {
        event.preventDefault();

        let link = booksLinks[i].href;

        var request = new XMLHttpRequest();
        request.open("GET", link, true);
        request.send(null);

        request.onreadystatechange = function() {
            if (request.readyState === 4 ) {
              
                let data = JSON.parse(request.response);
                console.log(data);

                let booksList = createBooksList(data, createBookItem);
                renderBooksList(booksList);
            }
          }
        
        
        
    });
}


