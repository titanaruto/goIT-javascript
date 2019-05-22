"use strict";

const PRIORITY_TYPES = {
    LOW: 0,
    NORMAL: 1,
    HIGH: 2
};

const ICON_TYPES = {
    EDIT: "edit",
    DELETE: "delete",
    ARROW_DOWN: "expand_more",
    ARROW_UP: "expand_less"
};

const NOTE_ACTIONS = {
    DELETE: "delete-note",
    EDIT: "edit-note",
    INCREASE_PRIORITY: "increase-priority",
    DECREASE_PRIORITY: "decrease-priority"
};

class Notepad {
    static generateUniqueId = () =>
        Math.random()
            .toString(36)
            .substring(2, 15) +
        Math.random()
            .toString(36)
            .substring(2, 15);

    constructor(notes = []) {
        this._notes = notes;
    }

    get notes() {
        return this._notes;
    }

    static Priority = {
        0: "LOW",
        1: "NORMAL",
        2: "HIGH"
    };

    findNoteById(id) {
        /*
         * Ищет заметку в массиве notes
         *
         * Принимает: идентификатор заметки
         * Возвращает: заметку с совпавшим полем id или undefined если ничего не найдено
         */

        return this._notes.find(elem => elem.id === id);
    }

    saveNote(titleText, bodyText) {
        const newItem = {
            id: Notepad.generateUniqueId(),
            title: titleText,
            body: bodyText,
            priority: PRIORITY_TYPES.LOW,
        };
        this._notes.push(newItem);
        return newItem;
    };

    deleteNote(id) {
        /*
         * Удаляет заметку по идентификатору из массива notes
         *
         * Принимает: идентификатор заметки
         * Возвращает: ничего
         */
        this._notes = this._notes.filter(note => note.id !== id);
    }

    updateNoteContent(id, updatedContent) {
        /*
         * Обновляет контент заметки
         * updatedContent - объект с полями вида {имя: значение, имя: значение}
         * Свойств в объекте updatedContent может быть произвольное количество
         *
         * Принимает: идентификатор заметки и объект, полями которого надо обновить заметку
         * Возвращает: обновленную заметку
         */
        let note = this.findNoteById(id);
        const noteObj = Object.assign(note, updatedContent);
        return noteObj;
    }

    updateNotePriority(id, priority) {
        /*
         * Обновляет приоритет заметки
         *
         * Принимает: идентификатор заметки и ее новый приоритет
         * Возвращает: обновленную заметку
         */
        let note = this.findNoteById(id);
        note.priority = priority;
        return note;
    }

    filterNotesByQuery(query) {
        /*
         * Фильтрует массив заметок по подстроке query.
         * Если значение query есть в заголовке или теле заметки - она подходит
         *
         * Принимает: подстроку для поиска в title и body заметки
         * Возвращает: новый массив заметок, контент которых содержит подстроку
         */

        return this._notes.filter(
            elem =>
                elem.body.toLowerCase().includes(query.toLowerCase()) ||
                elem.title.toLowerCase().includes(query.toLowerCase())
        );
    }

    filterNotesByPriority(priority) {
        /*
         * Фильтрует массив заметок по значению приоритета
         * Если значение priority совпадает с приоритетом заметки - она подходит
         *
         * Принимает: приоритет для поиска в свойстве priority заметки
         * Возвращает: новый массив заметок с подходящим приоритетом
         */

        return this._notes.filter(elem => elem.priority === priority);
    }
}

const initialNotes = [
    {
        id: "id-1",
        title: "JavaScript essentials",
        body:
            "Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc",
        priority: PRIORITY_TYPES.HIGH
    },
    {
      id: "id-2",
      title: "Refresh HTML and CSS",
      body:
        "Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.",
      priority: PRIORITY_TYPES.NORMAL
    },
    {
      id: "id-3",
      title: "Get comfy with Frontend frameworks",
      body:
        "First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.",
      priority: PRIORITY_TYPES.NORMAL
    },
    {
      id: "id-4",
      title: "Winter clothes",
      body:
        "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
      priority: PRIORITY_TYPES.LOW
    }
];


const createListItem = function (note) {
    const note_list__item = document.createElement("li");
    note_list__item.classList.add("note-list__item");
    note_list__item.dataset.id = note.id;

    const div_note = document.createElement("div");
    div_note.classList.add("note");


    div_note.append(createNoteContent(note));

    div_note.append(createNoteFooter(note));

    note_list__item.append(div_note);
    return note_list__item;
};
const createNoteContent = function (note) {
    const note__content = document.createElement("div");
    note__content.classList.add("note__content");

    const note__title = document.createElement("h2");
    note__title.classList.add("note__title");
    note__title.textContent = note.title;
    const note__body = document.createElement("p");
    note__body.classList.add("note__body");
    note__body.textContent = note.body;

    note__content.append(note__title, note__body);
    return note__content;
};

const createNoteFooter = function (note) {
    const note__footer = document.createElement("footer");
    note__footer.classList.add("note__footer");

    note__footer.append(createNoteFooterSection(note), createNoteFooterSectionTwo());
    return note__footer;
};
const createActionButton = function (name_btn, name_icon) {
    const button = document.createElement("button");
    button.classList.add("action");
    button.dataset.action = name_btn;
    const icon = document.createElement("i");
    icon.classList.add("material-icons", "action__icon");
    icon.textContent = name_icon;
    button.append(icon);
    return button;
};
const createNoteFooterSection = function (note) {
    const note__section = document.createElement("section");
    note__section.classList.add("note__section");

    const btnDecrease = createActionButton(NOTE_ACTIONS.DECREASE_PRIORITY, ICON_TYPES.ARROW_DOWN);
    const btnIncrease = createActionButton(NOTE_ACTIONS.INCREASE_PRIORITY, ICON_TYPES.ARROW_UP);

    const note__priority = document.createElement("span");
    note__priority.classList.add("note__priority");
    note__priority.textContent = "Priority: " + Notepad.Priority[note.priority];

    note__section.append(btnDecrease, btnIncrease, note__priority);
    return note__section;
};
const createNoteFooterSectionTwo = function () {
    const note__section = document.createElement("section");
    note__section.classList.add("note__section");

    const edit_note = createActionButton(NOTE_ACTIONS.EDIT, ICON_TYPES.EDIT);
    const delete_note = createActionButton(NOTE_ACTIONS.DELETE, ICON_TYPES.DELETE);

    note__section.append(edit_note, delete_note);
    return note__section;
};


const renderListItems = (listRef, data) => {
    const listItems = data.map(item => createListItem(item));
    listRef.innerHTML = '';
    listRef.append(...listItems);
};
const addListItem = (listRef, note) => {
    listRef.append(createListItem(note));
};

let notepad = new Notepad(initialNotes);
const note_list = document.querySelector(".note-list");
renderListItems(note_list, notepad.notes);

const note_editor = document.querySelector(".note-editor");
const search_form = document.querySelector(".search-form");
const [...input] = note_editor.querySelectorAll(".note-editor__input");

const validOrInvalidShow = (obj) => {
    obj.forEach((val) => {
        if (val.value !== "") {
            val.classList.remove("invalid");
            val.classList.add("valid");
        } else {
            val.classList.remove("valid");
            val.classList.add("invalid");
        }
    });
};
const removeClassAndValue = (obj) => {
    obj.value = "";
    obj.classList.remove("valid");
};
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




