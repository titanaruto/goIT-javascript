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

  saveNote(note) {
    /*
     * Сохраняет заметку в массив notes
     *
     * Принимает: объект заметки
     * Возвращает: сохраненную заметку
     */
    this._notes.push(note);
    return note;
  }

  deleteNote(id) {
    /*
     * Удаляет заметку по идентификатору из массива notes
     *
     * Принимает: идентификатор заметки
     * Возвращает: ничего
     */
    for (let i = 0; i < this._notes.length; i++) {
      if (this._notes[i].id === id) {
        this._notes.splice(i, 1);
      }
    }
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


const createListItem = function(note) {
  const list__item = document.createElement("li");
  list__item.classList.add("list__item");
  list__item.dataset.id = note.id;

  const div_note = document.createElement("div");
  div_note.classList.add("note");


  div_note.append(createNoteContent(note));

  div_note.append(createNoteFooter(note));
  
  list__item.append(div_note);
  return list__item;
};
const createNoteContent = function(note) {
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

const createNoteFooter = function(note) {
  const note__footer = document.createElement("footer");
  note__footer.classList.add("note__footer");

  note__footer.append(createNoteFooterSection(note), createNoteFooterSectionTwo());
  return note__footer;
};
const createActionButton = function(name_btn, name_icon){
  const button  = document.createElement("button");
  button.classList.add("action");
  button.dataset.action = name_btn;
  const icon = document.createElement("i");
  icon.classList.add("material-icons", "action__icon");
  icon.textContent = name_icon;
  button.append(icon);
  return button;
};
const createNoteFooterSection = function(note) {
  const note__section = document.createElement("section");
  note__section.classList.add("note__section");

   const btnDecrease = createActionButton(NOTE_ACTIONS.DECREASE_PRIORITY,ICON_TYPES.ARROW_DOWN);
  const btnIncrease = createActionButton(NOTE_ACTIONS.INCREASE_PRIORITY,ICON_TYPES.ARROW_UP);

  const note__priority = document.createElement("span");
  note__priority.classList.add("note__priority");  
  note__priority.textContent = "Priority: "+ Notepad.Priority[note.priority];

  note__section.append(btnDecrease, btnIncrease, note__priority);
  return note__section;
};
const createNoteFooterSectionTwo = function() {
  const note__section = document.createElement("section");
  note__section.classList.add("note__section");

  const edit_note = createActionButton(NOTE_ACTIONS.EDIT,ICON_TYPES.EDIT); 
  const delete_note = createActionButton(NOTE_ACTIONS.DELETE,ICON_TYPES.DELETE); 

  note__section.append(edit_note, delete_note);
  return note__section;
};


const renderListItems = (listRef, data) => {
  const listItems = data.map(item => createListItem(item));

  listRef.append(...listItems);
};

let notepad = new Notepad(initialNotes);
// console.log(notepad.notes[0]);
const note_list = document.querySelector(".note-list");
renderListItems(note_list, notepad.notes);
// console.log(createNoteFooterSectionTwo());
