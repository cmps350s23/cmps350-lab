// function id(x) {
//   return x;
// }

// const id = (x) => x;

const matrix = [
  [2, 3],
  [34, 89],
  [55, 101, 34],
  [34, 89, 34, 99],
];

/**********************************************************************/

function flatten(matrix) {
  return matrix.reduce((acc, val) => acc.concat(val));
  // return matrix.reduce((acc, val) => [...acc, ...val]);

  const flat = [];
  for (row of matrix) {
    for (ele of row) {
      flat.push(ele);
    }
  }

  return flat;
}

console.log(flatten(matrix));

/**********************************************************************/

function max(array) {
  let mx = array[0];

  for (ele of array) {
    if (ele > mx) {
      mx = ele;
    }
  }
  return mx;
}

console.log(max(flatten(matrix)));

/**********************************************************************/

function sortDesc(array) {
  // return array.sort().reverse();
  return array.sort((a, b) => (a < b ? +1 : a > b ? -1 : 0));
}
console.log(sortDesc(flatten(matrix)));

/**********************************************************************/

function square(array) {
  const sqr = [];
  const fn = (e) => e * e;

  for (const ele of array) {
    sqr.push(fn(ele));
  }

  return sqr;
}

function square(array) {
  return array.map((e) => e * e);
}

// array.filter((e) => e > 5);
console.log(square(flatten(matrix)));

/**********************************************************************/

function sum(array) {
  return array.reduce((acc, val) => acc + val);

  const s = 0;
  const reducer = (acc, val) => acc + val;

  for (const val of array) {
    s = reducer(s, val);
  }

  return s;
}

console.log(sum(flatten(matrix)));

function max(array) {
  return array.reduce((acc, val) => (val > acc ? val : acc), array[0]);

  const s = array[0];
  const reducer = (acc, val) => (val > acc ? val : acc);

  for (const val of array) {
    s = reducer(s, val);
  }

  return s;
}

console.log(max(flatten(matrix)));

function average(array) {
  return array.reduce((acc, val) => acc + val) / array.length;
}

console.log(average(flatten(matrix)));

/**********************************************************************/

function distinct(array) {
  return array.filter((e, i, a) => a.indexOf(e) === i);
}

console.log(distinct(flatten(matrix)));

/**********************************************************************/

function sum40(array) {
  return array.reduce((a, v) => (v > 40 ? a + v : a), 0);
}
console.log(sum40(flatten(matrix)));
