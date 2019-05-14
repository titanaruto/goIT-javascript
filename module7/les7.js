/*     
* Задание 7
Получить общую сумму баланса (поле balance) всех пользователей.

*/
const getTotalBalance = users => {
  // твой код
  return users.reduce((acc, item)=> acc + item.balance,0);
};

console.log(getTotalBalance(users)); // 20916
