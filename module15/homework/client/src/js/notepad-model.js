import {PRIORITY_TYPES} from './utils/constants.js';
import * as api from './services/api';

const shortid = require('shortid');

// console.log(shortid.generate());
export default class Notepad {


    constructor(notes = []) {
        this._notes = notes;
    }

    get notes() {
        return api.getNotes().then(notes => {
            this._notes = notes;
            return this._notes;
        });
    }


    findNoteById(id) {
        /*
         * Ищет заметку в массиве notes
         *
         * Принимает: идентификатор заметки
         * Возвращает: заметку с совпавшим полем id или undefined если ничего не найдено
         */
        return api.getNotes().then(notes => {
            return notes.find(elem => elem.id === id)
        });

    }

    saveNote(titleText, bodyText) {
        const newItem = {
            id: shortid.generate(),
            title: titleText,
            body: bodyText,
            priority: PRIORITY_TYPES.LOW,
        };
        return api.saveNote(newItem).then(savedItem => {
            this._notes.push(savedItem);
            return savedItem;
        });

    };

    deleteNote(id) {
        /*
         * Удаляет заметку по идентификатору из массива notes
         *
         * Принимает: идентификатор заметки
         * Возвращает: ничего
         */
        return api.deleteNote(id).then(() => {
            this._notes = this._notes.filter(note => note.id !== id);
            return id;
        });

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
        let updateNote = Object.assign(note, updatedContent);
        return api.updateNote(id, updateNote).then(updatedItem => {
            this._notes = this._notes.map(item =>
                item.id === updatedItem.id ? updatedItem : item
            );
            return updatedItem;
        });
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
        return api.updateNote(id, note).then(updatedItem => {
            this._notes = this._notes.map(item =>
                item.id === updatedItem.id ? updatedItem : item
            );
            return updatedItem;
        });
    }

    filterNotesByQuery(query) {
        /*
         * Фильтрует массив заметок по подстроке query.
         * Если значение query есть в заголовке или теле заметки - она подходит
         *
         * Принимает: подстроку для поиска в title и body заметки
         * Возвращает: новый массив заметок, контент которых содержит подстроку
         */
        return api.getNotes().then(notes => {
            return notes.filter(
                elem =>
                    elem.body.toLowerCase().includes(query.toLowerCase()) ||
                    elem.title.toLowerCase().includes(query.toLowerCase())
            );
        });

    }

    filterNotesByPriority(priority) {
        /*
         * Фильтрует массив заметок по значению приоритета
         * Если значение priority совпадает с приоритетом заметки - она подходит
         *
         * Принимает: приоритет для поиска в свойстве priority заметки
         * Возвращает: новый массив заметок с подходящим приоритетом
         */
        return api.getNotes().then(notes => {
            return notes.filter(elem => elem.priority === priority)
        });

    }
}