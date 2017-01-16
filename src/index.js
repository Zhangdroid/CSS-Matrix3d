/**
 * Check if is Numeric.
 * @param n
 * @return {Boolean}
 */
const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n)

function multiplyMatrixAndPoint (matrix, point) {
  const c0r0 = matrix[ 0], c1r0 = matrix[ 1], c2r0 = matrix[ 2], c3r0 = matrix[ 3]
  const c0r1 = matrix[ 4], c1r1 = matrix[ 5], c2r1 = matrix[ 6], c3r1 = matrix[ 7]
  const c0r2 = matrix[ 8], c1r2 = matrix[ 9], c2r2 = matrix[10], c3r2 = matrix[11]
  const c0r3 = matrix[12], c1r3 = matrix[13], c2r3 = matrix[14], c3r3 = matrix[15]

  //Now set some simple names for the point
  const x = point[0]
  const y = point[1]
  const z = point[2]
  const w = point[3]

  //Multiply the point against each part of the 1st column, then add together
  const resultX = (x * c0r0) + (y * c0r1) + (z * c0r2) + (w * c0r3)

  //Multiply the point against each part of the 2nd column, then add together
  const resultY = (x * c1r0) + (y * c1r1) + (z * c1r2) + (w * c1r3)

  //Multiply the point against each part of the 3rd column, then add together
  const resultZ = (x * c2r0) + (y * c2r1) + (z * c2r2) + (w * c2r3)

  //Multiply the point against each part of the 4th column, then add together
  const resultW = (x * c3r0) + (y * c3r1) + (z * c3r2) + (w * c3r3)

  return [resultX, resultY, resultZ, resultW]
}

function multiplyMatrices (matrixA, matrixB) {
  const row0 = [matrixB[0], matrixB[1], matrixB[2], matrixB[3]]
  const row1 = [matrixB[4], matrixB[5], matrixB[6], matrixB[7]]
  const row2 = [matrixB[8], matrixB[9], matrixB[10], matrixB[11]]
  const row3 = [matrixB[12], matrixB[13], matrixB[14], matrixB[15]]

  // Multiply each row by the matrix
  const result0 = multiplyMatrixAndPoint(matrixA, row0)
  const result1 = multiplyMatrixAndPoint(matrixA, row1)
  const result2 = multiplyMatrixAndPoint(matrixA, row2)
  const result3 = multiplyMatrixAndPoint(matrixA, row3)

  // Turn the results back into a single matrix
  return [
    result0[0], result0[1], result0[2], result0[3],
    result1[0], result1[1], result1[2], result1[3],
    result2[0], result2[1], result2[2], result2[3],
    result3[0], result3[1], result3[2], result3[3],
  ]
}

function generateMatrix (matrices) {
  if (!matrices || !matrices[0]) throw new Error('Unaccepted value. Must be an array')

  let inputMatrix = matrices[0]

  for(let i = 1; i < matrices.length; i++) {
    inputMatrix = multiplyMatrices(inputMatrix, matrices[i])
  }

  return inputMatrix
}

const scale =  (w = 1, h = 1, d = 1) => {
  if (!isNumeric(w) || !isNumeric(h) || !isNumeric(d)) {
    throw new Error('Unaccepted value. Must be a number')
  }
  return [
    w,    0,    0,   0,
    0,    h,    0,   0,
    0,    0,    d,   0,
    0,    0,    0,   1
  ]
}

const translate = (x = 0, y = 0, z = 0) => {
  if (!isNumeric(x) || !isNumeric(y) || !isNumeric(z)) {
    throw new Error('Unaccepted value. Must be a number')
  }
  return [
    1,    0,    0,   0,
    0,    1,    0,   0,
    0,    0,    1,   0,
    x,    y,    z,   1
  ]
}

const rotate = (axis, degree) => {
  if (!isNumeric(degree)) throw new Error('Unaccepted value. Degree must be a number')
  const a = degree * (180 / Math.PI)
  const sin = Math.sin
  const cos = Math.cos

  let result

  switch (axis) {
    case 'x':
      result = [
        1,       0,        0,     0,
        0,  cos(a),  -sin(a),     0,
        0,  sin(a),   cos(a),     0,
        0,       0,        0,     1
      ]
      break
    case 'y':
      result = [
        cos(a),   0, sin(a),   0,
        0,        1,      0,   0,
        -sin(a),  0, cos(a),   0,
        0,        0,      0,   1
      ]
      break
    case 'z':
      result = [
        cos(a), -sin(a),    0,    0,
        sin(a),  cos(a),    0,    0,
        0,            0,    1,    0,
        0,            0,    0,    1
      ]
      break
    default:
      throw new Error('Unaccepted value. Axis must be \'x\', \'y\' or \'z\'')
  }

  return result
}
/**
 * Transform Matrix Array To CSS Matrix.
 * @param array
 * @return {string}
 */
const matrixArrayToCssMatrix = array => `matrix3d(${array.join(',')})`

const generateCSS = (...values) => {
  const transformMatrix = generateMatrix(values)
  return matrixArrayToCssMatrix(transformMatrix)
}

export { scale, translate, rotate, generateMatrix, generateCSS }