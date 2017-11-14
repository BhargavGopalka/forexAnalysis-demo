export class TradingGuide {
  private _id: string;
  private _instrumentType: string;
  private _sortOrder: number;
  private _stBias: string;
  private _targets: number;
  private _invalidation: number;
  private _s1: number;
  private _s2: number;
  private _s3: number;
  private _r1: number;
  private _r2: number;
  private _r3: number;
  private _isFav: Boolean;
  private _createDate: Date;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get instrumentType(): string {
    return this._instrumentType;
  }

  set instrumentType(value: string) {
    this._instrumentType = value;
  }

  get sortOrder(): number {
    return this._sortOrder;
  }

  set sortOrder(value: number) {
    this._sortOrder = value;
  }

  get stBias(): string {
    return this._stBias;
  }

  set stBias(value: string) {
    this._stBias = value;
  }

  get targets(): number {
    return this._targets;
  }

  set targets(value: number) {
    this._targets = value;
  }

  get invalidation(): number {
    return this._invalidation;
  }

  set invalidation(value: number) {
    this._invalidation = value;
  }

  get s1(): number {
    return this._s1;
  }

  set s1(value: number) {
    this._s1 = value;
  }

  get s2(): number {
    return this._s2;
  }

  set s2(value: number) {
    this._s2 = value;
  }

  get s3(): number {
    return this._s3;
  }

  set s3(value: number) {
    this._s3 = value;
  }

  get r1(): number {
    return this._r1;
  }

  set r1(value: number) {
    this._r1 = value;
  }

  get r2(): number {
    return this._r2;
  }

  set r2(value: number) {
    this._r2 = value;
  }

  get r3(): number {
    return this._r3;
  }

  set r3(value: number) {
    this._r3 = value;
  }

  get isFav(): Boolean {
    return this._isFav;
  }

  set isFav(value: Boolean) {
    this._isFav = value;
  }

  get createDate(): Date {
    return this._createDate;
  }

  set createDate(value: Date) {
    this._createDate = value;
  }

  get updatedDate(): Date {
    return this._updatedDate;
  }

  set updatedDate(value: Date) {
    this._updatedDate = value;
  }

  get isDeleted(): Boolean {
    return this._isDeleted;
  }

  set isDeleted(value: Boolean) {
    this._isDeleted = value;
  }

  get dateString(): Date {
    return this._dateString;
  }

  set dateString(value: Date) {
    this._dateString = value;
  }

  private _updatedDate: Date;
  private _isDeleted: Boolean;
  private _dateString: Date;
}
