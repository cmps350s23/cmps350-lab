import promptSync from "prompt-sync";
const prompt = promptSync();

function getStudents() {
  const students = [];

  // input students
  for (const i of [1, 2, 3, 4, 5]) {
    const student = {};
    student.name = prompt("Name: ");
    student.gender = prompt("Gender: ");
    student.age = Math.floor(Math.random() * (25 - 19 + 1) + 19);
    student.grade = Math.floor(Math.random() * (100 - 0 + 1) + 0);
    students.push(student);
  }

  return students;
}

// const students = getStudents();
// console.log(students);

const students = [
  { name: "Ahmed", gender: "Male", grade: 85, age: 23 },
  { name: "Sara", gender: "Female", grade: 77, age: 31 },
  { name: "Hassen", gender: "Male", grade: 92, age: 29 },
  { name: "Zahra", gender: "Female", grade: 63, age: 20 },
  { name: "Abdulahi", gender: "Male", grade: 54, age: 22 },
];

console.log(
  "Youngest:",
  students.reduce((stdA, stdB) => (stdA.age < stdB.age ? stdA : stdB))
);

console.log(
  "Oldest:",
  students.reduce((stdA, stdB) => (stdB.age < stdA.age ? stdA : stdB))
);
