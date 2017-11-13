export class Faq {
  private _id: string;
  private _question: string;
  private _answers: string;
  private _isEnable: Boolean;
  private _isDelete: Boolean;
  private _createDate: Date;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get question(): string {
    return this._question;
  }

  set question(value: string) {
    this._question = value;
  }

  get answers(): string {
    return this._answers;
  }

  set answers(value: string) {
    this._answers = value;
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
