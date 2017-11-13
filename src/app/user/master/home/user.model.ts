export class User {
  private _id: string;
  private _subscriptionName: Array<any>;
  private _subscriptionPlanId: string;
  private _customerId: number;
  private _userName: string;
  private _profilePicture: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _country: string;
  private _contactNo: number;
  private _countryCode: string;
  private _userType: number;
  private _isEmailNotifictionOn: Boolean;
  private _isSmsNotificationOn: Boolean;
  private _isEnable: Boolean;
  private _isVerifyOTP: Boolean;
  private _isPaymentCompleted: Boolean;
  private _isWelcomeMailSend: Boolean;
  private _activeSubscriptions: Array<any>;
  private _accountSize: number;
  private _aboutUs: number;
  private _aboutUsDetails: string;
  private _isRemember: Boolean;
  private _discount: number;
  private _coupan: string;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get subscriptionName(): Array<any> {
    return this._subscriptionName;
  }

  set subscriptionName(value: Array<any>) {
    this._subscriptionName = value;
  }

  get subscriptionPlanId(): string {
    return this._subscriptionPlanId;
  }

  set subscriptionPlanId(value: string) {
    this._subscriptionPlanId = value;
  }

  get customerId(): number {
    return this._customerId;
  }

  set customerId(value: number) {
    this._customerId = value;
  }

  get userName(): string {
    return this._userName;
  }

  set userName(value: string) {
    this._userName = value;
  }

  get profilePicture(): string {
    return this._profilePicture;
  }

  set profilePicture(value: string) {
    this._profilePicture = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
  }

  get contactNo(): number {
    return this._contactNo;
  }

  set contactNo(value: number) {
    this._contactNo = value;
  }

  get countryCode(): string {
    return this._countryCode;
  }

  set countryCode(value: string) {
    this._countryCode = value;
  }

  get userType(): number {
    return this._userType;
  }

  set userType(value: number) {
    this._userType = value;
  }

  get isEmailNotifictionOn(): Boolean {
    return this._isEmailNotifictionOn;
  }

  set isEmailNotifictionOn(value: Boolean) {
    this._isEmailNotifictionOn = value;
  }

  get isSmsNotificationOn(): Boolean {
    return this._isSmsNotificationOn;
  }

  set isSmsNotificationOn(value: Boolean) {
    this._isSmsNotificationOn = value;
  }

  get isEnable(): Boolean {
    return this._isEnable;
  }

  set isEnable(value: Boolean) {
    this._isEnable = value;
  }

  get isVerifyOTP(): Boolean {
    return this._isVerifyOTP;
  }

  set isVerifyOTP(value: Boolean) {
    this._isVerifyOTP = value;
  }

  get isPaymentCompleted(): Boolean {
    return this._isPaymentCompleted;
  }

  set isPaymentCompleted(value: Boolean) {
    this._isPaymentCompleted = value;
  }

  get isWelcomeMailSend(): Boolean {
    return this._isWelcomeMailSend;
  }

  set isWelcomeMailSend(value: Boolean) {
    this._isWelcomeMailSend = value;
  }

  get activeSubscriptions(): Array<any> {
    return this._activeSubscriptions;
  }

  set activeSubscriptions(value: Array<any>) {
    this._activeSubscriptions = value;
  }

  get accountSize(): number {
    return this._accountSize;
  }

  set accountSize(value: number) {
    this._accountSize = value;
  }

  get aboutUs(): number {
    return this._aboutUs;
  }

  set aboutUs(value: number) {
    this._aboutUs = value;
  }

  get aboutUsDetails(): string {
    return this._aboutUsDetails;
  }

  set aboutUsDetails(value: string) {
    this._aboutUsDetails = value;
  }

  get isRemember(): Boolean {
    return this._isRemember;
  }

  set isRemember(value: Boolean) {
    this._isRemember = value;
  }

  get discount(): number {
    return this._discount;
  }

  set discount(value: number) {
    this._discount = value;
  }

  get coupan(): string {
    return this._coupan;
  }

  set coupan(value: string) {
    this._coupan = value;
  }

  get createdBy(): string {
    return this._createdBy;
  }

  set createdBy(value: string) {
    this._createdBy = value;
  }

  get isSubscriptionActive(): Boolean {
    return this._isSubscriptionActive;
  }

  set isSubscriptionActive(value: Boolean) {
    this._isSubscriptionActive = value;
  }

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }

  private _createdBy: string;
  private _isSubscriptionActive: Boolean;
  private _role: string;
}
