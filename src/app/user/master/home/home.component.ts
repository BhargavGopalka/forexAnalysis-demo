import {Component, OnInit} from '@angular/core';
import {ApiManagerService} from '../../../utility/shared-service/api-manager.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Constant, PaginationItems} from '../../../utility/constants/constants';
import {User} from './user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  // pagination Variables
  p = 1;
  tPage = null;
  pageItems = PaginationItems.initialRecords;

  showTable = true;
  showForm = false;

  userList: User[] = [];
  countryList = [];
  numberForm: FormGroup;

  constructor(private apiService: ApiManagerService) {
  }

  ngOnInit() {
    this.initializeMethod();
  }

  initializeMethod() {
    this.getUserData();
    this.getCountry();
  }

  editUserDetail(numberData) {
    this.showForm = true;
    this.showTable = false;
    this.initial(numberData);
  }

  initial(numberData: any) {
    this.numberForm = new FormGroup({
      firstName: new FormControl(numberData.firstName ? numberData.firstName : ''),
      lastName: new FormControl(numberData.lastName ? numberData.lastName : ''),
      userName: new FormControl({value: numberData.userName ? numberData.userName : '', disabled: true}),
      country: new FormControl(numberData.countryCode ? numberData.countryCode : ''),
      countryCode: new FormControl(numberData.countryCode ? numberData.countryCode : ''),
      email: new FormControl(numberData.email ? numberData.email : ''),
      contactNo: new FormControl(numberData.contactNo ? numberData.contactNo : ''),
      userType: new FormControl(numberData.userType ? numberData.userType : ''),
      discount: new FormControl(numberData.discount ? numberData.discount : ''),
      userId: new FormControl(numberData._id ? numberData._id : ''),
      subscriptionPlanId: new FormControl(numberData.subscriptionPlanId ? numberData.subscriptionPlanId : '')
    });
  }

  /* Getting User grid data */
  getUserData() {
    this.apiService.getAPI(Constant.getUser, this.params)
      .subscribe((res: any) => {
        this.tPage = res.pager.totalRecords;
        this.userList = res.data.customers;
      });
  }

  updateData(formValue: any) {
    this.apiService.postAPI(Constant.updateUser, formValue)
      .subscribe(() => {
          this.getUserData();
          this.goPrev();
        },
        msg => {
          console.log(msg.status);
        });
  }

  getCountry() {
    this.apiService.getPublicAPI(Constant.config)
      .subscribe((res: any) => {
        this.countryList = res.data.country;
      });
  }

  /* Enable Disable User Status */
  enableDisableUser(numberInfo: any) {
    const enableDisableParam = {'userId': numberInfo._id, isEnable: !numberInfo.isEnable};
    this.apiService.postAPI(Constant.enaDisUser, enableDisableParam)
      .subscribe(() => {
        (numberInfo.isEnable) = !(numberInfo.isEnable);
        return numberInfo.isEnable;
      });
  }

  get params(): any {
    let params = {};
    params = {'page': this.p, 'limit': this.pageItems};
    return params;
  }

  goPrev() {
    this.showForm = false;
    this.showTable = true;
  }

  onChange(value) {
    this.p = 1;
    this.pageItems = +value;
    this.getUserData();
  }

}
