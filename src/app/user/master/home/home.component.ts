import {Component, OnInit} from '@angular/core';
import {ApiManagerService} from '../../../utility/shared-service/api-manager.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Constant} from '../../../utility/constants/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // pagination array
  p = 1;
  tPage = null;
  pageItems = Constant.recordsPerPage[0];

  showTable = true;
  showForm = false;

  numberList = [];
  countryList = [];
  numberForm: FormGroup;

  constructor(private apiService: ApiManagerService) {
  }

  ngOnInit() {
    this.initializeMethod();
    console.log(this.pageItems);
  }

  initializeMethod() {
    this.getUserData();
    this.getCountry();
  }

  showProperty(numberData) {
    this.showForm = true;
    this.showTable = false;
    console.log(numberData);
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

  getUserData() {
    this.apiService.getAPI(Constant.getUser + `?limit=${this.pageItems}&page=${this.p}`)
      .subscribe((res: any) => {
        this.tPage = res.pager.totalRecords;
        this.numberList = res.data.customers;
      });
  }

  updateData(formValue: any) {
    this.apiService.postAPI(Constant.updateUser, formValue)
      .subscribe(() => {
          this.getUserData();
          this.showTable = true;
          this.showForm = false;
        },
        msg => {
          console.log(`Error: ${msg.status} ${msg.statusText}`);
        });
  }

  getCountry() {
    this.apiService.getHeaderAPI(Constant.config)
      .subscribe((res: any) => {
        this.countryList = res.data.country;
      });
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
