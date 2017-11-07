import {Component, OnInit} from '@angular/core';
import {ApiManagerService} from '../../../utility/shared-service/api-manager.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Constant} from '../../../utility/constants/constants';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  p = 1;
  tPage = null;
  pageItems = 10;

  showTable = true;
  showForm = false;

  numberList = [];
  countryList = [];

  numberForm: FormGroup;


  constructor(private apiService: ApiManagerService,
              private http: HttpClient,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.getUserData();
    this.getCountry();
  }

  showProperty(numberData: any) {
    this.showForm = true;
    this.showTable = false;
    this.initial(numberData);
  }

  initial(numberData: any) {
    this.numberForm = new FormGroup({
      firstName: new FormControl(numberData.firstName),
      lastName: new FormControl(numberData.lastName),
      userName: new FormControl({value: numberData.userName, disabled: true}),
      country: new FormControl(numberData.country),
      countryCode: new FormControl(numberData.countryCode),
      email: new FormControl(numberData.email),
      contactNo: new FormControl(numberData.contactNo),
      userType: new FormControl(numberData.userType),
      discount: new FormControl(numberData.discount),
      userId: new FormControl(numberData.decoded.userId),
      subscriptionPlanId: new FormControl(numberData.subscriptionPlanId)
    });
  }

  getUserData() {
    this.apiService.getAPI(`api/admin/customer/getUsers?limit=${this.pageItems}&page=${this.p}`)
      .subscribe((res: any) => {
        this.tPage = res.pager.totalRecords;
        this.numberList = res.data.customers;
      });
  }

  updateData(formValue: any) {
    this.apiService.postAPI(`api/admin/customer/updateUser`, formValue)
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
    if (this.countryList.length === 0) {
      const url = `public/config`;
      this.http.get(Constant.baseUrl + url, {
        headers: new HttpHeaders().set('x-access-token', `2e53a2427762250dfa56096ecab1b3b6`),
      })
        .subscribe((res: any) => {
          this.countryList = res.data.country;
        });
    }
  }

  onSelectCountry(value: string) {
    const country_code = value;
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
