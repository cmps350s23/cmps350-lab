console.log("CMPS 350");

let index = 1;
let output = "";

while (index <= 100) {
  if (index % 2) {
    output += index + " ";
  }

  index += 1;
}

console.log(output);

// console.log(
//   Array.from({ length: 100 })
//     .map((e, i) => i + 1)
//     .filter((e) => e % 2 == 1)
//     .join(" ")
// );

/**********************************************************************/

let output2 = "";

for (let index = 1; index <= 100; index++) {
  if (index % 2) {
    output2 += index + " ";
  }
}

console.log(output2);

/**********************************************************************/

const cars = ["Toyota", "Honda", "BMW"];
cars.push("Volvo");
cars.unshift("Mercedes");

// console.log(cars);

function print(e) {
  console.log(e);
}

// const print = (e) => console.log(e);

function display(array) {
  // for (const ele of array) {
  //   console.log(ele);
  // }

  array.forEach((e) => console.log(e));
  array.forEach(print);
}

display(cars);

/**********************************************************************/

// function id(x) {
//   return x;
// }

// const id = (x) => x;
// id(0);

// const sum = (a, b) => a + b;

display(cars.sort());

/**********************************************************************/
