import {PRIORITY_TYPES} from './utils/constants.js';

const shortid = require('shortid');

// console.log(shortid.generate());
export default class Notepad {


    constructor(notes = []) {
        this._notes = notes;
    }

    get notes() {
        return this._notes;
    }


    findNoteById(id) {
        /*
         * Ищет заметку в массиве notes
         *
         * Принимает: идентификатор заметки
         * Возвращает: заметку с совпавшим полем id или undefined если ничего не найдено
         */
        return new Promise(resolve => {
            resolve(this._notes.find(elem => elem.id === id));
        });

    }

    saveNote(titleText, bodyText) {
        return new Promise(resolve => {
            const newItem = {
                id: shortid.generate(),
                title: titleText,
                body: bodyText,
                priority: PRIORITY_TYPES.LOW,
            };
            this._notes.push(newItem);
            resolve(newItem);
        });
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
        return new Promise(resolve => {
            let note = this.findNoteById(id);
            resolve(Object.assign(note, updatedContent));
        });

    }

    updateNotePriority(id, priority) {
        /*
         * Обновляет приоритет заметки
         *
         * Принимает: идентификатор заметки и ее новый приоритет
         * Возвращает: обновленную заметку
         */

        return new Promise(resolve => {
            let note = this.findNoteById(id);
            note.priority = priority;
            resolve(note);
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
        return new Promise(resolve => {
            resolve(this._notes.filter(
                elem =>
                    elem.body.toLowerCase().includes(query.toLowerCase()) ||
                    elem.title.toLowerCase().includes(query.toLowerCase())
            ));
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
        return new Promise(resolve => {
            resolve(this._notes.filter(elem => elem.priority === priority));
        });

    }
}