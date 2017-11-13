export class Subscribe {
  private _id: string;
  private _name: string;
  private _description: string;
  private _duration: number;
  private _planType: number;
  private _price: number;
  private _discount: number;
  private _discountedPrice: number;
  private _planName: string;
  private _isEnable: Boolean;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get duration(): number {
    return this._duration;
  }

  set duration(value: number) {
    this._duration = value;
  }

  get planType(): number {
    return this._planType;
  }

  set planType(value: number) {
    this._planType = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get discount(): number {
    return this._discount;
  }

  set discount(value: number) {
    this._discount = value;
  }

  get discountedPrice(): number {
    return this._discountedPrice;
  }

  set discountedPrice(value: number) {
    this._discountedPrice = value;
  }

  get planName(): string {
    return this._planName;
  }

  set planName(value: string) {
    this._planName = value;
  }

  get isEnable(): Boolean {
    return this._isEnable;
  }

  set isEnable(value: Boolean) {
    this._isEnable = value;
  }

  get createDate(): Date {
    return this._createDate;
  }

  set createDate(value: Date) {
    this._createDate = value;
  }

  private _createDate: Date;
}
