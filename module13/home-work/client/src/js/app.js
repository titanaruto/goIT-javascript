import {NOTE_ACTIONS, NOTIFICATION_MESSAGES} from './utils/constants.js';
import initialNotes from '../assets/notes.json';
import Notepad from './notepad-model.js';
import MicroModal from 'micromodal';
import {renderListItems, addListItem} from './workWithItem.js';
import {Notyf} from 'notyf';
import {updateNote} from "./services/api";
import 'notyf/notyf.min.css';
import model from "../../../../class-work/client/src/js/model"; // for React and Vue

const notyf = new Notyf();


let notepad = new Notepad(initialNotes);
const note_list = document.querySelector(".note-list");
const modal_action = document.querySelector('button[data-action="open-editor"]');

const handlerOpenModel = function () {
    MicroModal.show("note-editor-modal");
};
modal_action.addEventListener("click", handlerOpenModel)


notepad.notes.then(notes => {
    renderListItems(note_list, notes);
});


const note_editor = document.querySelector(".note-editor-form");

const search_form = document.querySelector(".search-form");
const note_editor_btn = document.querySelector(".modal__btn");
const [...input] = document.querySelectorAll(".note-editor__input");


const submitFormHandler = (e) => {
    e.preventDefault();
    const [inputTitle, textareaBody] = input;

    if (inputTitle.value === "" || textareaBody.value === "") {
        notyf.error(NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY);
        return;
    } else {

        notepad.saveNote(inputTitle.value, textareaBody.value).then(newItem => {
            addListItem(note_list, newItem);
            inputTitle.value = '';
            textareaBody.value = '';
            MicroModal.close("note-editor-modal");
            notyf.success(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);
        }).catch(error => console.log(error));

    }
};

const removeListItem = (obj) => {
    const list = obj.closest(".note-list__item");
    notepad.deleteNote(list.dataset.id);
    list.remove();
    notyf.success(NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS);
};

const btnClickHandler = (e) => {
    const btn = e.target.parentElement;
    if (btn.nodeName !== "BUTTON")
        return;
    let action = btn.dataset.action;
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
    notepad.filterNotesByQuery(input_value.value).then(list => {
        renderListItems(note_list, list);
    }).catch(error => console.log(error));

};
note_list.addEventListener("click", btnClickHandler);
note_editor_btn.addEventListener("click", submitFormHandler);
search_form.addEventListener("input", searchFormHandler);





