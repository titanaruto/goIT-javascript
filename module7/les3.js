/*     
* Задание 3
Получить массив имен пользователей по полу (поле gender).

*/
const getUsersByGender = (users, gender) => {
  // твой код
 return users.filter(val=> val.gender === gender).map(val=> val.name);
};

console.log(getUsersByGender(users, 'male')); // [ 'Moore Hensley', 'Ross Vazquez', 'Carey Barr', 'Blackburn Dotson' ]
