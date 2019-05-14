/*     
* Задание 5
Получить пользоваля (не массив) по email (поле email, он уникальный).

*/
const getUserByEmail = (users, email) => {
  // твой код
  return users.find(val=> val.email === email);
};

console.log(getUserByEmail(users, 'shereeanthony@kog.com')); // {объект пользователя Sheree Anthony}
console.log(getUserByEmail(users, 'elmahead@omatom.com')); // {объект пользователя Elma Head}
