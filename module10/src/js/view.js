import {ICON_TYPES, NOTE_ACTIONS,Priority} from "./utils/constants";


export  const createListItem = function (note) {
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
    note__priority.textContent = "Priority: " + Priority[note.priority];

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

