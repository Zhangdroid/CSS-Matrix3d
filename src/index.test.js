const matrix = require('./index')
const { scale, translate, rotate, generateMatrix, generateCSS } = matrix

describe('CSS array to matrix', () => {
  it('scale', () => {
    expect(scale()).toEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    expect(scale(1)).toEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    expect(scale(1, 1)).toEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    expect(scale(1, 1, 1)).toEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    expect(scale(2, 2, 1)).toEqual([2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    expect(scale(0, 0, 0)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1])
    expect(scale(-1, -1, -1)).toEqual([-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1])

    expect(() => { scale('a') }).toThrowError(/Unaccepted/)
    expect(() => { scale('a', 'b') }).toThrowError(/Unaccepted/)
  })

  it('translate', () => {
    expect(translate()).toEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    expect(translate(0, 0, 0)).toEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    expect(translate(40, 40)).toEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 40, 40, 0, 1])
    expect(translate(-40, -40)).toEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -40, -40, 0, 1])

    expect(() => { translate('a') }).toThrowError(/Unaccepted/)
    expect(() => { translate('a', 'b') }).toThrowError(/Unaccepted/)
  })

  it('rotate', () => {
    expect(rotate('x', 30)).toEqual([1, 0, 0, 0, 0, -0.9121880689272984, 0.4097717985741408, 0, 0, -0.4097717985741408, -0.9121880689272984, 0, 0, 0, 0, 1])
    expect(rotate('x', -30)).toEqual([1, 0, 0, 0, 0, -0.9121880689272984, -0.4097717985741408, 0, 0, 0.4097717985741408, -0.9121880689272984, 0, 0, 0, 0, 1])
    expect(rotate('x', 0)).toEqual([1, 0, 0, 0, 0, 1, -0, 0, 0, 0, 1, 0, 0, 0, 0, 1])

    expect(() => { rotate(1) }).toThrowError(/Unaccepted/)
    expect(() => { rotate('a') }).toThrowError(/Unaccepted/)
    expect(() => { rotate() }).toThrowError(/Unaccepted/)
  })
})

describe('Generate matrix', () => {
  it('Generate matrix', () => {
    expect(generateMatrix([translate(40, 40)])).toEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 40, 40, 0, 1])
    expect(generateMatrix([translate(40, 40), rotate('x', 30)])).toEqual([1, 0, 0, 0, 0, -0.9121880689272984, 0.4097717985741408, 0, 0, -0.4097717985741408, -0.9121880689272984, 0, 40, 40, 0, 1])
    expect(generateMatrix([translate(40, 40), rotate('x', 30), scale(2, 2, 2)])).toEqual([2, 0, 0, 0, 0, -1.8243761378545968, 0.8195435971482816, 0, 0, -0.8195435971482816, -1.8243761378545968, 0, 40, 40, 0, 1])
    expect(() => { generateMatrix() }).toThrowError(/Unaccepted/)
  })
})
describe('Generate CSS', () => {
  it('Generate CSS', () => {
    expect(generateCSS(translate(40, 40))).toEqual('matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,40,40,0,1)')
    expect(generateCSS(translate(40, 40), rotate('x', 30))).toEqual('matrix3d(1,0,0,0,0,-0.9121880689272984,0.4097717985741408,0,0,-0.4097717985741408,-0.9121880689272984,0,40,40,0,1)')
    expect(generateCSS(translate(40, 40), rotate('x', 30), scale(2, 2, 2))).toEqual('matrix3d(2,0,0,0,0,-1.8243761378545968,0.8195435971482816,0,0,-0.8195435971482816,-1.8243761378545968,0,40,40,0,1)')

    expect(() => { generateCSS() }).toThrowError(/Unaccepted/)
  })
})
