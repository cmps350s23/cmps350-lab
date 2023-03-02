console.log("CMPS 350");
// alert("CMPS 350");

let index = 1;

while (index <= 100) {
  if (index % 2) {
    console.log(index);
  }
  // index += 1;
  index++;
}

/**********************************************************************/

for (let index = 1; index <= 100; index += 1) {
  if (index % 2) {
    console.log(index);
  }
}

let output = "";
for (let index = 1; index <= 100; index += 1) {
  if (index % 2) {
    output += index + " ";
  }
}
console.log(output);

/**********************************************************************/

// console.log(
//   Array.from({ length: 100 })
//     .map((_, i) => i + 1)
//     .filter((i) => i % 2)
//     .join(" ")
// );

/**********************************************************************/

const cars = ["Toyota", "Honda", "BMW"];
cars.push("Volvo");
cars.unshift("Mercedes");
console.log(cars);

function display(array) {
  for (let item of array) {
    console.log(item);
  }
}
display(cars);
cars.forEach((car) => console.log(car));

const p = (car) => console.log(car);
cars.forEach(p);

cars.sort();
display(cars);
