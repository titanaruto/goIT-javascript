/*
  Напиши функцию-конструкор User для создания
  пользователя со следующим свойствами:
    - name - строка (имя)
    - age - число (возраст)
    - friends - число (кол-во друзей)

  Имя, активность, возраст и друзей,
  будут переданы при вызове конструктора User.

  Добавь метод getInfo(), который, выводит строку:
  `User ${имя} is ${возраст} years old and has ${кол-во друщзей} friends`
*/

function User(user) {
  const {name, age, friends} = user;

  this.name = name;
  this.age = age;
  this.friends = friends;



  this.getInfo = function() {
    console.log(`
      Login: ${this.name}, 
      Pass: ${this.age}, 
      Type: ${this.friends}
    `);
  };
}

const mango = new User({ name: "Mango", age: 2, friends: 20 });
mango.getInfo(); // User Mango is 2 years old and has 20 friends

const poly = new User({ name: "Poly", age: 3, friends: 17 });
poly.getInfo(); // User Poly is 3 years old and has 17 friends
