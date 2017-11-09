import {Component, OnInit} from '@angular/core';
import {ApiManagerService} from '../../../utility/shared-service/api-manager.service';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-coupon-code',
  templateUrl: './coupon-code.component.html',
  styleUrls: ['./coupon-code.component.css']
})
export class CouponCodeComponent implements OnInit {

  p = 1;
  tPage = null;
  pageItems = 10;

  showTable = true;
  showForm = false;
  peoplePage = false;
  peopleHide = true;

  existingData = null;
  minDate = new Date();
  MinimumDate: any;

  couponsList = [];
  peopleList = [];
  planTypeList = [];
  selectedDuration = [];
  durationList = [];
  completeDurationList = [];
  signalDurationList = [];
  tradingDurationList = [];
  allDuration = [];

  couponForm: FormGroup;

  constructor(private apiService: ApiManagerService,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.initialFunction();
  }

  initialFunction() {
    this.getCoupon();
    this.getPlanType();
    this.getDuration();
  }

  initial(couponData: any) {
    this.couponForm = new FormGroup({
      campaignName: new FormControl(couponData ? couponData.campaignName : ''),
      planType: new FormControl(couponData ? couponData.planType : ''),
      duration: new FormControl(couponData ? couponData.duration : ''),
      validFrom: new FormControl(couponData ? couponData.validFrom : ''),
      validTo: new FormControl(couponData ? couponData.validTo : ''),
      discount: new FormControl(couponData ? couponData.discount : ''),
      id: new FormControl(couponData ? couponData._id : '')
    });
  }

  showProperty(couponData: any) {
    this.showForm = true;
    this.showTable = false;
    this.initial(couponData);
    this.existingData = couponData;
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.couponForm.patchValue({validTo: ''});
    this.MinimumDate = event.value;
  }

  addCoupon(formValue: any) {
    if (this.existingData == null) {
      this.apiService.postAPI(`api/admin/coupanCode/add`, formValue)
        .subscribe(() => {
            this.getCoupon();
            this.showTable = true;
            this.showForm = false;
          },
          msg => {
            console.log(`Error: ${msg.status} ${msg.statusText}`);
          });
    } else {
      this.apiService.postAPI(`api/admin/coupanCode/update`, formValue)
        .subscribe(() => {
            this.getCoupon();
            this.showTable = true;
            this.showForm = false;
          },
          msg => {
            console.log(`Error: ${msg.status} ${msg.statusText}`);
          });
    }
  }

  getCoupon() {
    this.apiService.getAPI(`api/admin/coupanCode/getAll?page=${this.p}&limit=${this.pageItems}&`)
      .subscribe((res: any) => {
        this.tPage = res.pager.totalRecords;
        this.couponsList = res.data.campaign;
      });
  }

  /*Getting Plan Types*/
  getPlanType() {
    this.http.get(`http://104.236.11.8:3000/public/config`, {
      headers: new HttpHeaders().set('x-access-token', '2e53a2427762250dfa56096ecab1b3b6'),
    })
      .subscribe((res: any) => {
        this.planTypeList = res.data.planType;
      });
  }

  /*Getting Duration based on changes on Plan Type*/
  onSelectPlanType(value: string) {
    if (+value === 4) {
      this.http.get(`http://104.236.11.8:3000/public/config`, {
        headers: new HttpHeaders().set('x-access-token', '2e53a2427762250dfa56096ecab1b3b6'),
      })
        .subscribe((res: any) => {
          this.selectedDuration = res.data.duration;
          this.anyDurationList();
        });
    } else {
      this.selectedDuration = this.allDuration.filter(duration => {
        return duration.planType === +value;
      });
    }
    return this.selectedDuration;
  }

  anyDurationList() {
    for (let i = 0; i < this.selectedDuration.length; i++) {
      this.selectedDuration[i].duration = this.selectedDuration[i]['day'];
      delete this.selectedDuration[i].key1;
    }
  }

  /*Getting Duration List*/
  getDuration() {
    this.http.get(`http://104.236.11.8:3000/public/packages`, {
      headers: new HttpHeaders().set('x-access-token', '2e53a2427762250dfa56096ecab1b3b6'),
    })
      .subscribe((res: any) => {
        this.completeDurationList = res.data.Complete;
        this.signalDurationList = res.data.Signal;
        this.tradingDurationList = res.data.Trading_Guide;
        this.getAllDuration();
      });
  }

  /*Push durationList data into allDuration array*/
  getAllDuration() {
    this.durationList.push(this.completeDurationList);
    this.durationList.push(this.signalDurationList);
    this.durationList.push(this.tradingDurationList);
    /*Method number 1 to push*/
    for (const a of this.durationList) {
      for (const b of a) {
        this.allDuration.push(b);
      }
    }
    /*Method number 2 */
    // this.allDuration = this.durationList.reduce((a, b) => a.concat(b));
  }

  removeCoupon(id: number, index: number): void {
    this.apiService.postAPI(`api/admin/coupanCode/delete?id=${id}`)
      .subscribe(() => {
        this.couponsList.splice(index, 1);
      });
  }

  addPeople(value) {
    this.peoplePage = true;
    this.peopleHide = false;
    this.apiService.getAPI(`api/admin/coupanCode/coupan/getAll?page=${this.p}&limit=${this.pageItems}&campaignId=${value}&`)
      .subscribe((res: any) => {
        this.peopleList = res.data.coupan;
      });
  }

  goBack() {
    this.peoplePage = false;
    this.peopleHide = true;
    this.peopleList = [];
  }

  goPrev() {
    this.showForm = false;
    this.showTable = true;
  }

  onChange(value) {
    this.p = 1;
    this.pageItems = +value;
    this.getCoupon();
  }

}
