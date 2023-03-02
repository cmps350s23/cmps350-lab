const matrix = [
  [2, 3],
  [34, 89],
  [55, 101, 34],
  [34, 89, 34, 99],
];

function flatten(matrix) {
  return matrix.reduce((acc, val) => acc.concat(val), []);
  // const flat = [];
  // for (row of matrix) {
  //   for (ele of row) {
  //     flat.push(ele);
  //   }
  // }
  // return flat;
}

console.log("Flatten:", flatten(matrix));

/**********************************************************************/

function max(array) {
  return array.reduce((acc, val) => (val > acc ? val : acc));

  // const m = array[0];

  // for (ele of array) {
  //   // m = ele > m ? ele : m;

  //   if (ele > m) {
  //     m = ele;
  //   }
  // }

  // return m;
}

console.log("Max:", max(flatten(matrix)));

/**********************************************************************/

function total(array) {
  return array.reduce((acc, val) => acc + val, 0);

  // const t = 0;
  // const fn = (t, e) => t + e;

  // for (e of array) {
  //   t = fn(t, e);
  // }

  // return t;
}

console.log("Total:", total(flatten(matrix)));

function id(array) {
  return array.reduce((acc, val) => [...acc, val], []);
}

console.log("Identity:", id(flatten(matrix)));

/**********************************************************************/

function square(array) {
  return array.map((e) => e * e);

  // const square = [];
  // const fn = (e) => e * e;

  // for (e of array) {
  //   square.push(fn(e));
  // }

  // return square;
}

function triple(array) {
  return array.map((e) => e * e * e);

  // const triple = [];
  // const fn = (e) => e * e * e;

  // for (e of array) {
  //   triple.push(fn(e));
  // }

  // return triple;
}

console.log("Square:", square(flatten(matrix)));

/**********************************************************************/

function sum40(array) {
  return array.filter((e) => e > 40).reduce((acc, val) => acc + val);
}

console.log("Sum40:", sum40(flatten(matrix)));

/**********************************************************************/

function distinct(array) {
  return array.filter(
    (element, index, array) => array.indexOf(element) === index
  );

  const filtered = [];

  for (let i = 0; i < array.length; i++) {
    // if (unique e) {
    // if (e is not duplicated) {
    // if (e is found only once) {
    let found = false;
    for (let j = 0; j < i; j++) {
      if (array[i] === array[j]) {
        found = true;
      }
    }

    if (!found) {
      filtered.push(array[i]);
    }
  }

  return filtered;
}

console.log("Distinct:", distinct(flatten(matrix)));

/**********************************************************************/

function average(array) {
  const fn = (acc, val, _, arr) => acc + val / arr.length;
  return array.reduce(fn);

  // return array.reduce((acc, val) => acc + val) / array.length;
}

console.log("Average:", average(flatten(matrix)));

/**********************************************************************/

function sortDesc(array) {
  // return array.sort().reverse();
  return array.sort((a, b) => (a < b ? +1 : b < a ? -1 : 0));
}

// console.log("DSort:", sortDesc(flatten(matrix)));
console.log("DSort:", sortDesc([1, 4, 5, 2, 3]));
