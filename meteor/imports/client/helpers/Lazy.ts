
export class Lazy<T> {

  private _value: T;
  private _compute: () => T;
  private _computed: boolean;

  public constructor(compute: () => T) {
    this._compute   = compute;
    this._computed  = false;
    this._value     = null;
  }

  public get value(): T {
    if (!this._computed) {
      this._value    = this._compute();
      this._computed = true;
    }

    return this._value;
  }

}

