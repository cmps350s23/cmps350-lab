import promptSync from "prompt-sync";
const prompt = promptSync();

function getStudents() {
  let students = [];

  for (const i in [1, 2, 3, 4, 5]) {
    const student = {};

    student.name = prompt("Name: ");
    student.gender = prompt("Gender: ");
    student.age = Math.floor(Math.random() * (25 - 18) + 18);
    student.grade = Math.floor(Math.random() * (100 - 60) + 60);

    students.push(student);
  }

  return students;
}

// const students = getStudents();
const students = [
  { name: "Ahmed", gender: "Male", grade: 85, age: 23 },
  { name: "Sara", gender: "Female", grade: 77, age: 31 },
  { name: "Hassen", gender: "Male", grade: 92, age: 29 },
  { name: "Zahra", gender: "Female", grade: 63, age: 20 },
  { name: "Abdulahi", gender: "Male", grade: 54, age: 22 },
];

console.log(
  "Youngest:",
  students.reduce((stua, stuv) => (stuv.age < stua.age ? stuv : stua))
);
console.log(
  "Oldest:",
  students.reduce((stua, stuv) => (stuv.age > stua.age ? stuv : stua))
);
