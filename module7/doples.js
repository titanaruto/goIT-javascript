/*     
* Получить массив всех умений всех пользователей (поле skills),
 при этом не должно быть повторяющихся умений и они должны быть отсортированы в алфавитном порядке

*/
const getSkills = users =>
  users.reduce((allSkills, user) => {
    allSkills.push(...user.skills);

    return allSkills;
  }, []);

const getSkillgStats = (acc, skill) => {
  if (!acc.hasOwnProperty(skill)) {
    acc[skill] = 0;
  }

  acc[skill] += 1;

  return acc;
};

const getUniqueSkills = users => {
  // твой код
  const skills = getSkills(users);
  const countSkills = skills => skills.reduce(getSkillgStats, {});
  return Object.keys(countSkills(skills)).sort();
};


console.log(getUniqueSkills(users));
// [ 'adipisicing', 'amet', 'anim', 'commodo', 'culpa', 'elit', 'ex', 'ipsum', 'irure', 'laborum', 'lorem', 'mollit', 'non', 'nostrud', 'nulla', 'proident', 'tempor', 'velit', 'veniam' ]

/*    
Массив имен (поле name) людей, отсортированных в зависимости от количества их друзей (поле friends)
*/
const sortByCountFriends = (a, b) => a.friends.length - b.friends.length;
const getNamesSortedByFriendsCount = users => {
  // твой код
  return users.sort(sortByCountFriends).map(value => value.name);
};

console.log(getNamesSortedByFriendsCount(users));
// [ 'Moore Hensley', 'Sharlene Bush', 'Elma Head', 'Carey Barr', 'Blackburn Dotson', 'Sheree Anthony', 'Ross Vazquez' ]
