console.log("CMPS 350");

let index = 1;
let output = "";

while (index <= 100) {
  if (index % 2 === 1) {
    // console.log(index);
    output += index + " ";
  }

  index += 1;
}

console.log(output);

/**********************************************************************/

let output2 = "";

for (let index = 1; index <= 100; index += 1) {
  if (index % 2 === 1) {
    // console.log(index);
    output2 += index + " ";
  }
}

console.log(output2);

/**********************************************************************/

console.log(
  Array.from({ length: 100 })
    .map((_, i) => i + 1)
    .filter((e) => e % 2)
    .join(" ")
);

/**********************************************************************/

const cars = ["Toyota", "Honda", "BMW"];
cars.push("Volvo");
cars.unshift("Mercedes");
console.log(cars);

function display(array) {
  for (const ele of array) {
    console.log(ele);
  }
}
display(cars);

cars.forEach((e) => console.log(e));

const p = (e) => console.log(e);
p("Result");
cars.forEach(p);
// cars.forEach(console.log);

cars.sort();
display(cars);
