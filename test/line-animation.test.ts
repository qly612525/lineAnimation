import Vector from '../src/line-animation'

/**
 * 向量旋转角计算测试
 */
describe('Vector class.', () => {
  it('new vector should be get value.', () => {
    const v = new Vector([0.0, 1.0])
    expect(v.value).toEqual([0.0, 1.0])
  })
})

/**
 * 向量旋转角计算测试
 */
describe('Vector Rotate Calculate.', () => {
  it('vector b (1.0, 1.0) rotate to vector a (0.0, 1.0) should be 45 degree.', () => {
    const va = new Vector([0.0, 1.0])
    const vb = new Vector([1.0, 1.0])
    expect(vb.rotateTo(va)).toBeCloseTo(Vector.degreeToRadian(45))
  })

  it('vector a (0.0, 1.0) rotate to vector b (1.0, 1.0) should be -45 degree.', () => {
    const va = new Vector([0.0, 1.0])
    const vb = new Vector([1.0, 1.0])
    expect(va.rotateTo(vb)).toBeCloseTo(Vector.degreeToRadian(-45))
  })

  it('vector b (1.0, -1.0) rotate to vector a (0.0, 1.0) should be 135 degree.', () => {
    const va = new Vector([0.0, 1.0])
    const vb = new Vector([1.0, -1.0])
    expect(vb.rotateTo(va)).toBeCloseTo(Vector.degreeToRadian(135))
  })

  it('vector a (1.0, 1.0) rotate to vector b (1.0, 1.0) should be 0 degree.', () => {
    const va = new Vector([1.0, 1.0])
    const vb = new Vector([1.0, 1.0])
    expect(va.rotateTo(vb)).toBeCloseTo(Vector.degreeToRadian(0))
  })
})

/**
 * 工具类函数测试
 */
describe('utils test.', () => {
  it('The radian of 45 degree should be close to radian value 0.785398', () => {
    expect(Vector.degreeToRadian(45)).toBeCloseTo(0.785398)
  })

  it('The degree of 0.785398 radian should be close to degree value 45', () => {
    expect(Vector.radianToDegree(0.785398)).toBeCloseTo(45)
  })
})
