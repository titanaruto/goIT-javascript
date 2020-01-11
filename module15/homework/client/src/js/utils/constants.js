export const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

export const NOTIFICATION_MESSAGES = {
  NOTE_DELETED_SUCCESS: 'Заметка успешно удалена',
  NOTE_PRIORITY_UPDATE_SUCCESS: 'Приоритет заметки успешно изменен',
  NOTE_EDIT_SUCCESS: 'Заметка успешно изменена',
  NOTE_ADDED_SUCCESS: 'Заметка успешно добавлена',
  EDITOR_FIELDS_EMPTY: 'Заполните поля редактора',
};

export const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

export const Priority = {
  0: "LOW",
  1: "NORMAL",
  2: "HIGH"
};
