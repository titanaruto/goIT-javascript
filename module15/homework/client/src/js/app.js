import {NOTE_ACTIONS, NOTIFICATION_MESSAGES} from './utils/constants.js';
import initialNotes from '../assets/notes.json';
import Notepad from './notepad-model.js';
import MicroModal from 'micromodal';
import {renderListItems, addListItem} from './workWithItem.js';
import {Notyf} from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();


const notepad = new Notepad(initialNotes);
const noteList = document.querySelector('.note-list');
const modalAction = document.querySelector('button[data-action="open-editor"]');

const searchForm = document.querySelector('.search-form');
const noteEditorBtn = document.querySelector('.modal__btn');
const notePriority = document.querySelector('.note__priority');
const [...input] = document.querySelectorAll('.note-editor__input');

const handlerOpenModel = function () {
    MicroModal.show('note-editor-modal');
};
modalAction.addEventListener('click', handlerOpenModel);
const getAllNotes = async () => {
    try {
        const notes = await notepad.notes;
        renderListItems(noteList, notes);
    } catch (error) {
        throw error;
    }
};
const editNote = async (id) => {
    try {
        const note = await notepad.findNoteById(id);
        const [inputTitle, textareaBody] = input;
        textareaBody.value = note.body;
        inputTitle.value = note.title;
        noteEditorBtn.dataset.id = id;
        noteEditorBtn.dataset.action = "edit";
        MicroModal.show('note-editor-modal');

    } catch (error) {
        throw error;
    }
};
const searchNotes = async (inputValue) => {
    try {
        const list = await notepad.filterNotesByQuery(inputValue.value);
        renderListItems(noteList, list);
    } catch (error) {
        throw error;
    }
};
const saveNote = async (inputTitle, textareaBody) => {
    try {
        const newItem = await notepad.saveNote(inputTitle.value, textareaBody.value);
        addListItem(noteList, newItem);
        inputTitle.value = '';
        textareaBody.value = '';
        MicroModal.close('note-editor-modal');
        notyf.success(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);
    } catch (error) {
        throw error;
    }
};
const updateNote = async (id, note) => {
    try {
        const itemUpdate = await notepad.updateNoteContent(id, note);
        const notesList = await notepad.notes;
        renderListItems(noteList, notesList);

        notyf.success(NOTIFICATION_MESSAGES.NOTE_EDIT_SUCCESS);
        MicroModal.close('note-editor-modal');
    } catch (error) {
        throw error;
    }

};

getAllNotes();

// const note_editor = document.querySelector(".note-editor-form");


const submitFormHandler = (e) => {
    e.preventDefault();
    const [inputTitle, textareaBody] = input;
    if (inputTitle.value === '' || textareaBody.value === '') {
        notyf.error(NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY);
        return;
    } else if (noteEditorBtn.dataset.action === "edit") {
        const id = noteEditorBtn.dataset.id;
        updateNote(id, {"title": inputTitle.value, "body": textareaBody.value});
    } else {
        saveNote(inputTitle, textareaBody);
    }
};

const removeListItem = (obj) => {
    const list = obj.closest('.note-list__item');

    notepad.deleteNote(list.dataset.id);
    list.remove();
    notyf.success(NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS);
};


const editListItem = (obj) => {
    const list = obj.closest('.note-list__item');
    const id = list.dataset.id;
    editNote(id);
};
const findNoteById = async (id, action,list = null) => {
    try {
        const note = await notepad.findNoteById(id);
        let value;
        switch (action) {
            case NOTE_ACTIONS.DECREASE_PRIORITY:
                if (note.priority > 0) {
                    value = note.priority - 1;
                    notyf.success(NOTIFICATION_MESSAGES.NOTE_PRIORITY_UPDATE_SUCCESS);
                }
                break;
            case NOTE_ACTIONS.INCREASE_PRIORITY:
                if (note.priority < 2) {
                    value = note.priority + 1;
                    notyf.success(NOTIFICATION_MESSAGES.NOTE_PRIORITY_UPDATE_SUCCESS);
                }
                break;
            default:
                console.log('invalid action!');
        }

        updatePriorityNote(id, value,list);
    } catch (error) {
        throw error;
    }
};
const updatePriorityNote = async (id, value,listItem) => {
    try {
        const note = await notepad.updateNotePriority(id, value);
        const notesList = await notepad.notes;

        renderListItems(noteList, notesList);

    } catch (error) {
        throw error;
    }
};
const updatePriorityListItem = (obj, action) => {
    const list = obj.closest('.note-list__item');
    const id = list.dataset.id;

    findNoteById(id,action,list);

};

const btnClickHandler = (e) => {
    const btn = e.target.parentElement;
    if (btn.nodeName !== 'BUTTON') {
        return;
    }
    const action = btn.dataset.action;
    switch (action) {
        case NOTE_ACTIONS.DELETE:
            removeListItem(btn);
            break;
        case NOTE_ACTIONS.EDIT:
            editListItem(btn);
            break;
        case NOTE_ACTIONS.DECREASE_PRIORITY:
            updatePriorityListItem(btn, NOTE_ACTIONS.DECREASE_PRIORITY);
            break;
        case NOTE_ACTIONS.INCREASE_PRIORITY:
            updatePriorityListItem(btn, NOTE_ACTIONS.INCREASE_PRIORITY);
            break;
        default:
            console.log('invalid action!');
    }
};

const searchFormHandler = (e) => {
    const inputValue = document.querySelector('.search-form__input');
    searchNotes(inputValue);
};

noteList.addEventListener('click', btnClickHandler);
noteEditorBtn.addEventListener('click', submitFormHandler);
searchForm.addEventListener('input', searchFormHandler);


