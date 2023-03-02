const matrix = [
  [2, 3],
  [34, 89],
  [55, 101, 34],
  [34, 89, 34, 99],
];

// console.log(matrix.flat());

// [] [2, 3] -> [2, 3]
// [2, 3] [34, 89] -> [2, 3, 34, 89]

function flatten(matrix) {
  // return matrix.reduce((acc, val) => acc.concat(val), []);
  return matrix.reduce((acc, val) => [...acc, ...val], []);

  let flat = [];

  for (row of matrix) {
    // flat = [...flat, ...row];

    for (ele of row) {
      flat.push(ele);
      // flat = [...flat, ele];
    }
  }

  return flat;
}

console.log(flatten(matrix));

/**********************************************************************/

function reduce(array, reducer, initial) {
  let acc = initial;

  for (const ele of array) {
    acc = reducer(sum, ele);
  }

  return acc;
}

function sum(array) {
  return array.reduce((sum, ele) => sum + ele, 0);

  let sum = 0;
  const f = (sum, ele) => sum + ele;

  for (const ele of array) {
    // sum = sum + ele;
    sum = f(sum, ele);
  }

  return sum;
}

function max(array) {
  return array.reduce((max, ele) => (ele > max ? ele : max), array[0]);

  let max = array[0];
  const f = (max, ele) => (ele > max ? ele : max);

  for (const ele of array) {
    // if (ele > max) {
    //   max = ele;
    // }
    max = f(max, ele);
  }

  return max;
}

console.log(sum(flatten(matrix)));
console.log(max(flatten(matrix)));

// [1, 2, 3, 4, 5]
// sum(sum(sum(0, 1), 2), 3) ...

/**********************************************************************/

function square(array) {
  return array.map((x) => x ** 2);
  return array.map((x) => x * x);
}

console.log(square(flatten(matrix)));

/**********************************************************************/

function sum40(array) {
  //return array.reduce((acc, val) => acc + (val > 40 ? val : 0), 0)
  return array.filter((x) => x > 40).reduce((acc, val) => acc + val, 0);
}

console.log(sum40(flatten(matrix)));

/**********************************************************************/

function sortDesc(array) {
  return array.sort().reverse();
}

console.log(sortDesc(flatten(matrix)));

/**********************************************************************/

function average(array) {
  // return array.reduce((acc, val) => acc + val, 0) / array.length;
  return array.reduce((acc, val, _, arr) => acc + val / arr.length, 0);
}

console.log(average(flatten(matrix)));

/**********************************************************************/

function distinct(array) {
  return array.filter((x, i, a) => a.indexOf(x) === i);

  return array.reduce((acc, val) => {
    if (acc.indexOf(val) === -1) {
      acc.push(val);
    }
    return acc;
  }, []);
}

console.log(distinct(flatten(matrix)));
