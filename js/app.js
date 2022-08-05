console.log("Added");
showNotes();

// if user adds a note then add it to local storage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {

    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('notetitle');
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');

    if(titles == null){
        titleObj = [];
    }else{
        titleObj = JSON.parse(titles);
    }

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    titleObj.push(addTitle.value);

    localStorage.setItem('notes', JSON.stringify(notesObj));
    localStorage.setItem('titles', JSON.stringify(titleObj));
    addTxt.value = "";
    addTitle.value = "";

    // console.log(notesObj);
    showNotes();

});

// Function to show created elements from local storage

function showNotes() {
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');

    if(titles == null){
        titleObj = [];
    }else{
        titleObj = JSON.parse(titles);
    }


    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard card my-2 mx-2" style="width: 18rem;" >
        <div class="card-body">
          <h5 class="card-title">${titleObj[index]}</h5>
          <hr>
          <p class="card-text">${element}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
      </div>`;
    });

    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `<h5>Nothing in library. Add some notes to view them in library<h5>`;
    }

}

// funcion to delete notes

function deleteNote(index) {

    let notes = localStorage.getItem('notes');

    let titles = localStorage.getItem('titles');

    if(titles == null){
        titleObj = [];
    }else{
        titleObj = JSON.parse(titles);
    }

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    titleObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    localStorage.setItem('titles', JSON.stringify(titleObj));
    showNotes();

};


// if user searches for a note
let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {

    let inpValue = search.value.toLowerCase(); //converted the search alphabet to lower case
    // console.log('Input event fired!', inpValue);

    let noteCards = document.getElementsByClassName('noteCard');


    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        // console.log(cardTxt);
        if (cardTxt.includes(inpValue)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";

        }
    });
});


