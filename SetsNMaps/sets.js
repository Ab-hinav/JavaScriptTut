//sets 
const sets = new Set();
sets.add(1);
sets.add(2);
sets.add(3);
console.log(sets);

// entries
console.log(sets.entries());
for (const [key, value] of sets.entries()) {
    console.log(key, value);
}

// maps
const map = new Map();
map.set('name', 'Max');
map.set('age', 30);
console.log(map);
console.log(map.entries());

for (const [key, val] of map.entries()) {
    console.log(key, val);
}

console.log(map.get('name'));
console.log(map.forEach((val, key) => console.log(key, val)));

// WeakSet
let person = { name: 'Max' };
const persons = new WeakSet();
persons.add(person);
person = null;
// the person object will be garbage collected
// but in case of set, it will not be garbage collected
console.log(persons);


// WeakMap
const personData = new WeakMap();
personData.set(person, 'Extra info');
person = null;
console.log(personData);
// WeakMap is used to store some extra data for an object , which will be garbage collected when the object is garbage collected
// but in case of map, the object will not be garbage collected
// WeakMap is not iterable
// WeakMap has only get, set, delete, has methods
