// Lesson: Writing your first tests
export function max(a, b) {
  return (a>b)?a:b;
}

// Exercise
export function fizzBuzz(n) {
  if (n % 3 === 0 && n % 5 === 0) return 'FizzBuzz';
  if (n % 3 === 0) return 'Fizz!';
  if (n % 5 === 0) return 'Buzz';
  return n.toString();
}


export function calculateAverage(numbers){
  if(numbers.length === 0) return NaN;

  return (numbers.reduce((acc,num)=>acc+num,0)/numbers.length);
}


export function calculateFactorial(number){
  if(number % 1 !== 0)return undefined;
  if(number < 0)return undefined;
  if(number === 1)return 1;
  if(number === 0)return 1;
  return number * calculateFactorial(number-1);
}