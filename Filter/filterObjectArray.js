let people = [
    {name: "aaron", age: 65},
    {name: "beth", age: 2},
    {name: "cara", age: 13},
    {name: "daniel", age: 3},
    {name: "ella", age: 25},
    {name: "fin", age: 1},
    {name: "george", age: 43},
]

let youngPeople = people.filter(person => person.age <= 3);

console.log(youngPeople);