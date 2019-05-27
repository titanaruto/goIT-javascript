
import {NOTE_ACTIONS} from  './utils/constants.js';
import initialNotes from  '../assets/notes.json';
import Notepad from './notepad-model.js';
import {renderListItems,addListItem,validOrInvalidShow,removeClassAndValue} from './workWithItem.js';




let notepad = new Notepad(initialNotes);
const note_list = document.querySelector(".note-list");
renderListItems(note_list, notepad.notes);

const note_editor = document.querySelector(".note-editor");
const search_form = document.querySelector(".search-form");
const [...input] = note_editor.querySelectorAll(".note-editor__input");


const submitFormHandler = (e) => {
    e.preventDefault();

    validOrInvalidShow(input);

    const [inputTitle, textareaBody] = input;

    if (inputTitle.value === "" || textareaBody.value === "") {
        alert('Необходимо заполнить все поля!');
        return;
    } else {

        const newItem = notepad.saveNote(inputTitle.value, textareaBody.value);
        removeClassAndValue(inputTitle);
        removeClassAndValue(textareaBody);
        addListItem(note_list, newItem);
    }
};

const blurHandler = (e) => {
    validOrInvalidShow(input);
};

const removeListItem = (obj) =>{
    const list = obj.closest(".note-list__item");

    notepad.deleteNote(list.dataset.id);
    list.remove();
};

const btnClickHandler = (e) => {
    const btn = e.target.parentElement;
    if (btn.nodeName !== "BUTTON")
        return;
    let action = btn.dataset.action;
    // debugger;
    switch (action) {
        case NOTE_ACTIONS.DELETE:
            removeListItem(btn);
            break;

        default:
            console.log('invalid action!');
    }
};

const searchFormHandler = (e) => {

    const input_value = document.querySelector(".search-form__input");
    const list = notepad.filterNotesByQuery(input_value.value);
    renderListItems(note_list,list);
    // input_value.textContent = "Current input value: " + e.target.value;
};


note_editor.addEventListener("blur", blurHandler, true);
note_list.addEventListener("click", btnClickHandler);
note_editor.addEventListener("submit", submitFormHandler);
search_form.addEventListener("input", searchFormHandler);





