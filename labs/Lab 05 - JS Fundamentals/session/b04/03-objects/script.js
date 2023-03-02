import promptSync from "prompt-sync";
const prompt = promptSync();

// const student = {
//   name: "John",
//   gender: "M",
//   age: 21,
//   grade: 79,
// };

/*
const students = [];

Array.from({ length: 5 }).forEach(() => {
  const student = {};
  student.name = prompt("Name: ");
  student.gender = prompt("Gender: ");
  student.age = Math.random() * (25 - 18 + 1) + 18;
  student.grade = Math.random() * (100 - 0 + 1) + 0;

  students.push(student);
});

console.log(students);
*/

const students = [
  { name: "Ahmed", gender: "Male", grade: 85, age: 23 },
  { name: "Sara", gender: "Female", grade: 77, age: 31 },
  { name: "Hassen", gender: "Male", grade: 92, age: 29 },
  { name: "Zahra", gender: "Female", grade: 63, age: 20 },
  { name: "Abdulahi", gender: "Male", grade: 54, age: 22 },
];

console.log(
  students.reduce((acc, val) => (val.age < acc.age ? val : acc), students[0])
);
