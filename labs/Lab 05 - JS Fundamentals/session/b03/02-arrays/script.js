const matrix = [
  [2, 3],
  [34, 89],
  [55, 101, 34],
  [34, 89, 34, 99],
];

function flatten(matrix) {
  return matrix.reduce((acc, val) => acc.concat(val), []);

  const flat = [];

  for (row of matrix) {
    for (ele of row) {
      flat.push(ele);
    }
  }

  return flat;
}

// console.log(matrix.flat());
console.log(flatten(matrix));

/**********************************************************************/

function max(array) {
  return array.reduce((acc, val) => (val > acc ? val : acc), array[0]);

  let max = array[0];
  let f = (acc, val) => (val > acc ? val : acc);

  for (ele of array) {
    // if (ele > max) {
    //   max = ele;
    // }
    max = f(max, ele);
  }

  return max;
}

function sum(array) {
  return array.reduce((acc, val) => acc + val, 0);

  let sum = 0;
  let f = (acc, val) => acc + val;

  for (ele of array) {
    // sum = sum + ele;
    sum = f(sum, ele);
  }

  return sum;
}

console.log(max(flatten(matrix)));
console.log(sum(flatten(matrix)));

// max(max(max(array[0], array[1]), array[2]), ...)

/**********************************************************************/

function even(array) {
  return array.filter((ele) => ele % 2 === 0);
}

/**********************************************************************/

function square(array) {
  return array.map((x) => x ** 2);
}

console.log(square(flatten(matrix)));

/**********************************************************************/

function average(array) {
  return array.reduce((acc, val, _, arr) => acc + val / arr.length, 0);
  // return array.reduce((acc, val) => acc + val, 0) / array.length;
}

console.log(average(flatten(matrix)));

/**********************************************************************/

function sum40(array) {
  return array.filter((e) => e > 40).reduce((acc, val) => acc + val, 0);
  // return array.reduce((acc, val) => (val > 40 ? acc + val : acc), 0);
}

console.log(average(flatten(matrix)));

/**********************************************************************/

function distinct(array) {
  return array.filter((e, i, a) => a.indexOf(e) === i);
  // return array.reduce((acc, val) => {
  //   if (acc.indexOf(val) === -1) {
  //     acc.push(val);
  //   }
  //   return acc;
  // }, []);
}

console.log(distinct(flatten(matrix)));

/**********************************************************************/

function sortDesc(array) {
  return array.sort().reverse();
}
console.log(sortDesc(flatten(matrix)));
