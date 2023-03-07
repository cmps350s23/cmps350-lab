import promptSync from "prompt-sync";
const prompt = promptSync();

function getStudents() {
  const students = [];

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

// console.log(getStudents());

const students = [
  { name: "Ahmed", gender: "Male", grade: 85, age: 23 },
  { name: "Sara", gender: "Female", grade: 77, age: 31 },
  { name: "Hassen", gender: "Male", grade: 92, age: 29 },
  { name: "Zahra", gender: "Female", grade: 63, age: 20 },
  { name: "Abdulahi", gender: "Male", grade: 54, age: 22 },
];

console.log(
  "Youngest:",
  students.reduce(
    (min, std) => (min.age < std.age ? min : std),
    Number.POSITIVE_INFINITY
  )
);

console.log(
  "Oldest:",
  students.reduce(
    (max, std) => (max.age > std.age ? max : std),
    Number.NEGATIVE_INFINITY
  )
);

console.log(
  "Average age:",
  students.reduce((avg, std) => avg + std.age, 0) / students.length
);

const sorted = students.sort((stda, stdb) => stda.age - stdb.age);
console.log(
  "Median age:",
  (sorted[Math.floor((sorted.length - 1) / 2)].age +
    sorted[Math.ceil((sorted.length - 1) / 2)].age) /
    2
);

const mean =
  students.reduce((mean, std) => mean + std.grade, 0) / students.length;
console.log("Mean:", mean);

console.log(
  "Variance:",
  students.reduce((vari, std) => vari + (std.grade - mean) ** 2, 0) /
    (students.length - 1)
);

console.log(
  "Male students:",
  students.filter((s) => s.gender === "Male")
);

console.log(
  "Female students:",
  students.filter((s) => s.gender === "Female")
);

console.log(
  "Sorted by name (asc):",
  students.sort((stda, stdb) =>
    stda.name < stdb.name ? -1 : stda.name > stdb.name ? +1 : 0
  )
);

console.log(
  "Sorted by grade (desc):",
  students.sort((stda, stdb) => stdb.grade - stda.grade)
);

console.log(
  "Failing:",
  students.filter((s) => s.grade < 60)
);

const maxGrade = students.reduce(
  (max, std) => (max > std.grade ? max : std.grade),
  0
);

console.log(
  "Highest grade:",
  students.filter((s) => s.grade === maxGrade)
);

const maxGradeFemale = students
  .filter((s) => s.gender === "Female")
  .reduce((max, std) => (max > std.grade ? max : std.grade), 0);

console.log(
  "Highest grade (female):",
  students.filter((s) => s.gender === "Female" && s.grade === maxGradeFemale)
);

const male = students.filter((s) => s.gender === "Male");
console.log(
  "Average grade (male):",
  male.reduce((avg, std) => avg + std.grade, 0) / male.length
);

console.log(
  "Students (extra):",
  students.map((s) => ({ ...s, passing: s.grade >= 60 }))
);
