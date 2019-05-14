/*     
* Задание 2
Получить массив объектов пользователей по цвету глаз (поле eyeColor).

*/
const getUsersByEyeColor = (users, color) => {
  // твой код
  return users.filter(value => value.eyeColor === color);
};

console.log(getUsersByEyeColor(users, 'blue')); // [объект Moore Hensley, объект Sharlene Bush, объект Carey Barr]
