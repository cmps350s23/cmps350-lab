import promptSync from "prompt-sync";
const prompt = promptSync();

function getStudents() {
  const name = prompt("Name: ");
  const gender = prompt("Gender: ");
}

getStudents();

const students = [
  { name: "Ahmed", gender: "Male", grade: 85, age: 23 },
  { name: "Sara", gender: "Female", grade: 77, age: 31 },
  { name: "Hassen", gender: "Male", grade: 92, age: 29 },
  { name: "Zahra", gender: "Female", grade: 63, age: 20 },
  { name: "Abdulahi", gender: "Male", grade: 54, age: 22 },
];
