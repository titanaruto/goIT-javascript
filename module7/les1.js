/*     
* Задание 1
Получить массив имен всех пользователей (поле name).

*/

const getAllNames = users => {
  // твой код
  return users.map(val=> val.name);
};

console.log(getAllNames(users));
// [ 'Moore Hensley', 'Sharlene Bush', 'Ross Vazquez', 'Elma Head', 'Carey Barr', 'Blackburn Dotson', 'Sheree Anthony' ]
