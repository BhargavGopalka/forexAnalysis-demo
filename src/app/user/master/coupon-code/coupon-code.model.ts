export class CouponCode {
  private _id: string;
  private _campaignName: string;
  private _planName: string;
  private _duration: number;
  private _planType: number;
  private _fromDateString: Date;
  private _toDateString: Date;
  private _validFrom: Date;
  private _validTo: Date;
  private _discount: number;
  private _isEnable: Boolean;
  private _isDelete: Boolean;
  private _createDate: Date;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get campaignName(): string {
    return this._campaignName;
  }

  set campaignName(value: string) {
    this._campaignName = value;
  }

  get planName(): string {
    return this._planName;
  }

  set planName(value: string) {
    this._planName = value;
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

  get fromDateString(): Date {
    return this._fromDateString;
  }

  set fromDateString(value: Date) {
    this._fromDateString = value;
  }

  get toDateString(): Date {
    return this._toDateString;
  }

  set toDateString(value: Date) {
    this._toDateString = value;
  }

  get validFrom(): Date {
    return this._validFrom;
  }

  set validFrom(value: Date) {
    this._validFrom = value;
  }

  get validTo(): Date {
    return this._validTo;
  }

  set validTo(value: Date) {
    this._validTo = value;
  }

  get discount(): number {
    return this._discount;
  }

  set discount(value: number) {
    this._discount = value;
  }

  get isEnable(): Boolean {
    return this._isEnable;
  }

  set isEnable(value: Boolean) {
    this._isEnable = value;
  }

  get isDelete(): Boolean {
    return this._isDelete;
  }

  set isDelete(value: Boolean) {
    this._isDelete = value;
  }

  get createDate(): Date {
    return this._createDate;
  }

  set createDate(value: Date) {
    this._createDate = value;
  }
}
