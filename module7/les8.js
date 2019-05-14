/*     
* Задание 8
Массив имен всех пользователей у которых есть друг с указанным именем.

*/
const getUsersByFriend = (users, name) => {
  // твой код
  const names = [];
  users.forEach(num => {
    if (num.friends.some(val => val === name)) {
      names.push(num.name);
    }
  });

  return names;
};

console.log(getUsersByFriend(users, "Briana Decker")); // [ 'Sharlene Bush', 'Sheree Anthony' ]
console.log(getUsersByFriend(users, "Goldie Gentry")); // [ 'Elma Head', 'Sheree Anthony' ]
