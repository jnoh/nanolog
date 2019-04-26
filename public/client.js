// client-side js
// run by the browser each time your view template is loaded

// our default array of notes
const notes = [];

// define variables that reference elements on our page
const notesList = document.getElementById('notes');
const notesForm = document.forms[0];
const noteInput = notesForm.elements['note'];

// a helper function that creates a list item for a given note
const appendNewnote = function(note) {
  const newListItem = document.createElement('li');
  newListItem.innerHTML = note;
  notesList.appendChild(newListItem);
}

// iterate through every note and add it to our page
notes.forEach( function(note) {
  appendNewnote(note);
});

// listen for the form to be submitted and add a new note when it is
notesForm.onsubmit = function(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();

  // get note value and add it to the list
  notes.push(noteInput.value);
  appendNewnote(noteInput.value);
  createNewNote(noteInput.value);

  // reset form 
  noteInput.value = '';
  noteInput.focus();
};

function createNewNote(contents) {

};