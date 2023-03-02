// console.log("CMPS 350");

let index = 0;
let output = "";

while (index <= 100) {
  if (index % 2 != 0) {
    // console.log(index);
    output += index + " ";
  }

  index += 1;
}

console.log(output);

/**********************************************************************/

let output2 = "";
for (let index = 1; index <= 100; index++) {
  if (index % 2 != 0) {
    output2 += index + " ";
  }
}
console.log(output2);

/**********************************************************************/

const cars = ["Toyota", "Honda", "BMW"];
cars.push("Volvo");
cars.unshift("Mercedes");

// console.log(cars);

function display(array) {
  for (const car of array) {
    console.log(car);
  }
}

cars.sort();
display(cars);
