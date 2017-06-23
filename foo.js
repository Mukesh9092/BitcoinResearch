const add = (a, b) => a + b
const divide = (q, p) => q / p

const y = (a, b, c) => {
  const d = divide(a, b)
  const e = add(d, c)

  return e
}

const z = (functionOne, functionTwo, varOne, varTwo, varThree) => {
  const resultOne = functionOne(varOne, varTwo)
  const resultTwo = functionTwo(resultOne, varThree)

  return resultTwo
}

let answerOne = y(10, 2, 5)
let answerTwo = z(divide, add, 10, 2, 5)

console.log('Answer one: ' + answerOne)
console.log('Answer two: ' + answerTwo)
