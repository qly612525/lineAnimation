// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...

export default class Vector {
  /**
   * degree to radian function
   * @param degree degree value
   */
  static degreeToRadian(degree: number): number {
    return degree * (Math.PI / 180.0)
  }

  /**
   * radian to degree function
   * @param radian radian value
   */
  static radianToDegree(radian: number): number {
    return radian * (180.0 / Math.PI)
  }

  private _value = [0.0, 0.0]

  /**
   * create Vector object.
   * @constructor
   * @param nums vector element
   */
  constructor(nums: number[]) {
    this._value = nums
  }

  /**
   * get vector value
   */
  public get value(): number[] {
    return this._value
  }

  /**
   * caclcuate vector rotateTo special vector need's radian
   * @param v anthor Vector
   */
  public rotateTo(v: Vector): number {
    const originMod = this.mod()
    const targetMod = v.mod()

    const dotProduce = this.dotProduce(v)
    const crossProduce = this.crossProduce2D(v)

    if (dotProduce === 0) return 0
    else {
      if (crossProduce > 0) return Math.acos(dotProduce / (originMod * targetMod))
      else if (crossProduce < 0) return -1 * Math.acos(dotProduce / (originMod * targetMod))
      else return 0
    }
  }

  /**
   * calculate vectors dot produce
   * @param v another Vector
   */
  public dotProduce(v: Vector): number {
    const originV = this._value
    const targetV = v.value
    return originV[0] * targetV[0] + originV[1] * targetV[1]
  }

  /**
   * calculate 2D vectors cross produce
   * @param v another Vector
   */
  public crossProduce2D(v: Vector): number {
    const originV = this._value
    const targetV = v.value
    return originV[0] * targetV[1] - originV[1] * targetV[0]
  }

  /**
   * calculate vector's length
   */
  public mod(): number {
    const value = this._value
    return Math.sqrt(value[0] * value[0] + value[1] * value[1])
  }
}
