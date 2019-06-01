// import {createListItem} from "./view";
import noteTemplate from './view.hbs';
import {Priority} from "./utils/constants";

export const renderListItems = (listRef, data) => {
    const listPriorityRefact = refactorPriority(data);

    const listItems = listPriorityRefact.map(item => noteTemplate(item)).join("");
    console.log(listItems);
    listRef.innerHTML = '';
    listRef.insertAdjacentHTML('beforeend', listItems);
};
export const addListItem = (listRef, note) => {
    let noteRes = refactorPriority(note);
    console.log(noteRes);
    listRef.insertAdjacentHTML('beforeend', noteTemplate(noteRes));
};

const refactorPriority = (data) => {
    if (data.length === undefined) {
        data.priority = Priority[data.priority];
        return data;
    } else {
        return Object.assign(data.map(item => item.priority = Priority[item.priority]), data);
    }

};

