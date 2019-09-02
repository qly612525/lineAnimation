// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...

export interface IRotateOptions {
  speech?: number
}

export interface IMoveOptions {
  speech?: number
}

export type rotateCallback = (rotate: number) => void
export type moveCallback = (v: Vector) => void

export default class Vector {
  /**
   * degree to radian function
   * @param degree degree value
   */
  static degreeToRadian(degree: number): number {
    return degree * (Math.PI / 180.0)
  }

  /**
   * radian to degree function.
   * @param radian radian value
   */
  static radianToDegree(radian: number): number {
    return radian * (180.0 / Math.PI)
  }

  /**
   * create vector by points.
   * @param start start point
   * @param end end point
   */
  static fromPoints(start: number[], end: number[]): Vector {
    return new Vector([start[1] - start[0], end[1] - end[0]])
  }

  private _value = [0.0, 0.0]

  /**
   * create vector object.
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
  public calcRotateRadian(v: Vector): number {
    const originMod = this.mod()
    const targetMod = v.mod()

    const dotProduce = this.dotProduce(v)
    const crossProduce = this.crossProduce2D(v)

    if (crossProduce > 0) return Math.acos(dotProduce / (originMod * targetMod))
    else if (crossProduce < 0) return -1 * Math.acos(dotProduce / (originMod * targetMod))
    else return 0
  }

  /**
   * rotate handle
   * @param v anthor Vector
   * @param handler external handler
   * @param options params
   */
  public rotateTo(v: Vector, handler: rotateCallback, options?: IRotateOptions): rotateCallback[] {
    const radian = this.calcRotateRadian(v)
    const sign = radian < 0 ? -1 : 1
    const opts: IRotateOptions = options ? options : {}
    const speech = opts.speech ? opts.speech : 0.05
    if (Math.abs(radian) <= speech) return [() => handler(sign * radian)]
    else {
      const count = Math.floor(radian / speech)
      const rest = radian - count * sign * speech
      const handlers: rotateCallback[] = []
      let index = 0
      while (index < count) {
        handlers.push(() => handler(sign * speech))
        index++
      }
      if (rest !== 0) handlers.push(() => handler(sign * rest))
      return handlers
    }
  }

  public moveTo(handler: moveCallback, options?: IMoveOptions): moveCallback[] {
    const opts: IRotateOptions = options ? options : {}
    const speech = opts.speech ? opts.speech : 0.1
    const mod = this.mod()
    if (mod <= speech) return [() => handler(this)]
    else {
      const count = Math.floor(mod / speech)
      const unitVector = this.scale(speech)
      const rest = this.add(unitVector.scale(-1 * count))
      const handlers: moveCallback[] = []
      let index = 0
      while (index < count) {
        handlers.push(() => handler(unitVector))
        index++
      }
      if (rest.mod() > 0) handlers.push(() => handler(rest))
      return handlers
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

  public add(v: Vector): Vector {
    const value = this._value
    return new Vector([value[0] + v.value[0], value[1] + v.value[1]])
  }

  public scale(coeff: number): Vector {
    const value = this._value
    return new Vector([value[0] * coeff, value[1] * coeff])
  }
}
