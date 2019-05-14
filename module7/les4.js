/*     
* Задание 4
Получить массив только неактивных пользователей (поле isActive).

*/
const getInactiveUsers = users => {
  // твой код
  return users.filter(val=>val.isActive === false);
};

console.log(getInactiveUsers(users)); // [объект Moore Hensley, объект Ross Vazquez, объект Blackburn Dotson]