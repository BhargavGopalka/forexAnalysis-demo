export class LatestNews {
  private _id: string;
  private _news: string;
  private _isEnable: Boolean;
  private _isDelete: Boolean;
  private _createDate: Date;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get news(): string {
    return this._news;
  }

  set news(value: string) {
    this._news = value;
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
