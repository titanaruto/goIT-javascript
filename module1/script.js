const ADMIN_LOGIN = "admin";
const ADMIN_PASSWORD = "m4ng0h4ckz";
let message;

const LOGIN = prompt("Введите login");

if (!LOGIN) {
  message = "Отменено пользователем!";
} else if (LOGIN !== ADMIN_LOGIN) {
  message = "Доступ запрещен, неверный логин!";
} else {
  const PASSWORD = prompt("Введите password");
  if (!PASSWORD) {
    message = "Отменено пользователем!";
  } else if (PASSWORD !== ADMIN_PASSWORD) {
    message = "Доступ запрещен, неверный пароль!";
  } else {
    message = "Добро пожаловать!";
  }
}

alert(message);
