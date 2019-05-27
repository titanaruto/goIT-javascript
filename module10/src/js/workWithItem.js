import {createListItem} from "./view";

export const renderListItems = (listRef, data) => {
    const listItems = data.map(item => createListItem(item));
    listRef.innerHTML = '';
    listRef.append(...listItems);
};
export const addListItem = (listRef, note) => {
    listRef.append(createListItem(note));
};

export const validOrInvalidShow = (obj) => {
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
export const removeClassAndValue = (obj) => {
    obj.value = "";
    obj.classList.remove("valid");
};

