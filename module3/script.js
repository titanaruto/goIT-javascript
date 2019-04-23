/*
Напиши функцию isLoginValid(login), в которой проверь количество символов параметра login и верни true или false в зависимости от того, попадает ли длина параметра в заданный диапазон от 4-х до 16-ти символов включительно.

Напиши функцию isLoginUnique(allLogins, login), которая принимает список всех логинов и добавляемый логин как параметры и проверяет наличие login в массиве allLogins, возвращая true если такого логина еще нет и false если логин уже используется.

Напиши функцию addLogin(allLogins, login) которая:

Принимает новый логин и массив всех логинов как параметры
Проверяет валидность логина используя вспомогательную функцию isLoginValid
Если логин не валиден, прекратить исполнение функции addLogin и вернуть строку 'Ошибка! Логин должен быть от 4 до 16 символов'
Если логин валиден, функция addLogin проверяеть уникальность логина с помощью функции isLoginUnique
Если isLoginUnique вернет false, тогда addLogin не добавляет логин в массив и возвращает строку 'Такой логин уже используется!'
Если isLoginUnique вернет true, addLogin добавляет новый логин в logins и возвращает строку 'Логин успешно добавлен!'
 */
const logins = ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'];

const isLoginValid = function(login) {
  // код
  if(login.length >= 4 && login.length <= 16){
    return true;
  } else {
    return false
  }
};

const isLoginUnique = function(allLogins, login) {
  // код
  if (allLogins.includes(login)){
    return false;
  } else {
    return true;
  }
};

const addLogin = function(allLogins, login) {
  // код
  if(!isLoginValid(login)){
    console.log( 'Ошибка! Логин должен быть от 4 до 16 символов');
  } else {
    if (!isLoginUnique(allLogins, login)){
      console.log( 'Такой логин уже используется!');
    } else{
      allLogins.push(login);
      console.log( 'Логин успешно добавлен!');
    }
  }
};

// Вызовы функции для проверки
addLogin(logins, 'Ajax'); // 'Логин успешно добавлен!'
addLogin(logins, 'robotGoogles'); // 'Такой логин уже используется!'
addLogin(logins, 'Zod'); // 'Ошибка! Логин должен быть от 4 до 16 символов'
addLogin(logins, 'jqueryisextremelyfast'); // 'Ошибка! Логин должен быть от 4 до 16 символов'
console.log(logins);