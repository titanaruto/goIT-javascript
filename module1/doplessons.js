const SHARM = 15;
const HURGADA = 25;
const TABA = 6;

const tour = prompt("Введите число необходимых мест");

if (!tour) {
  alert("Нам очень жаль, приходите еще!");
} else if (typeof Number(tour) === "number") {
  let nameGroup;
  if (Number(tour) <= TABA) {
    nameGroup = "taba";
    let result = confirm(
      `Есть ${TABA} мест в группе ${nameGroup}, согласys ли быть в этой группе`
    );
    if (result) {
      alert(`Приятного путешествия в группе ${nameGroup}`);
    } else {
      alert("Нам очень жаль, приходите еще!");
    }
  } else if (Number(tour) <= SHARM) {
    nameGroup = "sharm";
    let result = confirm(
      `Есть ${SHARM} мест в группе ${nameGroup}, согласys ли быть в этой группе`
    );
    if (result) {
      alert(`Приятного путешествия в группе ${nameGroup}`);
    } else {
      alert("Нам очень жаль, приходите еще!");
    }
  } else if (Number(tour) <= HURGADA) {
    nameGroup = "hurgada";
    let result = confirm(
      `Есть ${HURGADA} мест в группе ${nameGroup}, согласys ли быть в этой группе`
    );
    if (result) {
      alert(`Приятного путешествия в группе ${nameGroup}`);
    } else {
      alert("Нам очень жаль, приходите еще!");
    }
  } else {
    alert("Извините, столько мест нет ни в одной группе!");
  }
} else {
  alert("Ошибка ввода!");
}
