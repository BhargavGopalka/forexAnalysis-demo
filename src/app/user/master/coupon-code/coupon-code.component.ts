import {Component, OnInit} from '@angular/core';
import {ApiManagerService} from '../../../utility/shared-service/api-manager.service';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {Constant, PaginationItems} from '../../../utility/constants/constants';
import {CouponCode} from './coupon-code.model';

@Component({
  selector: 'app-coupon-code',
  templateUrl: './coupon-code.component.html',
  styleUrls: ['./coupon-code.component.css']
})
export class CouponCodeComponent implements OnInit {

  /* Pagination Variables */
  p = 1;
  tPage = null;
  pageItems = PaginationItems.initialRecords;

  viewDataGrid = true;
  viewAddEditForm = false;
  viewPeoplePage = false;
  hidePeoplePage = true;

  existingData = null;
  minDate = new Date();
  MinimumDate: any;
  campaign: string;

  couponsList: CouponCode[] = [];
  peopleList = [];
  planTypeList = [];
  selectedDuration = [];
  durationList = [];
  completeDurationList = [];
  signalDurationList = [];
  tradingDurationList = [];
  allDuration = [];

  couponForm: FormGroup;

  constructor(private apiService: ApiManagerService) {
  }

  ngOnInit() {
    this.initialFunction();
  }

  /* Functions that will call Initially */
  initialFunction() {
    this.getCoupon();
    this.getPlanType();
    this.getDuration();
  }

  /* Building the form to Add or Edit details */
  formBuild(couponData: any) {
    if (couponData) {
      this.onSelectPlanType(couponData.planType);
    }
    this.couponForm = new FormGroup({
      campaignName: new FormControl(couponData ? couponData.campaignName : ''),
      planType: new FormControl(couponData ? couponData.planType : ''),
      duration: new FormControl(couponData ? couponData.duration : ''),
      validFrom: new FormControl(couponData ? couponData.validFrom : ''),
      validTo: new FormControl(couponData ? couponData.validTo : ''),
      discount: new FormControl(couponData ? couponData.discount : '')
    });
  }

  /* Will call when Add or Edit button will be clicked */
  addEditCouponDetail(couponData: any) {
    this.viewAddEditForm = true;
    this.viewDataGrid = false;
    this.formBuild(couponData);
    this.existingData = couponData;
  }

  /* Will call whenever date changes inside FormControl "validFrom" */
  validFromDateChange(event: MatDatepickerInputEvent<Date>) {
    this.couponForm.patchValue({validTo: ''});    /* if there is value inside validTo FormControl it will make it empty */
    this.MinimumDate = event.value;                     /* setting minimum date for validTo FormControl */
  }

  /* Add or Edit Coupon detail */
  addCoupon(formValue: any) {
    if (this.existingData == null) {
      this.apiService.postAPI(Constant.addCoupon, formValue)
        .subscribe(() => {
            this.getCoupon();
            this.goPrev();
          },
          msg => {
            console.log(msg.status);
          });
    } else {
      formValue['id'] = this.existingData._id; // Pass Id for selected object, for update API
      this.apiService.postAPI(Constant.updateCoupon, formValue)
        .subscribe(() => {
            this.getCoupon();
            this.goPrev();
          },
          msg => {
            console.log(msg.status);
          });
    }
  }

  /* Getting Coupon Data */
  getCoupon() {
    this.apiService.getAPI(Constant.getCoupon, this.params)
      .subscribe((res: any) => {
        this.tPage = res.pager.totalRecords;
        this.couponsList = res.data.campaign;
      });
  }

  /*Getting Plan Types*/
  getPlanType() {
    this.apiService.getPublicAPI(Constant.config)
      .subscribe((res: any) => {
        this.planTypeList = res.data.planType;
      });
  }

  /*Getting Duration based on changes on Plan Type*/
  onSelectPlanType(value: string) {
    if (+value === 4) {
      this.apiService.getPublicAPI(Constant.config)
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


  /* Changing name of SelectedDuration's "day" and "name" key to "duration" and "durationType"  */
  anyDurationList() {
    for (let i = 0; i < this.selectedDuration.length; i++) {
      this.selectedDuration[i].duration = this.selectedDuration[i]['day'];
      this.selectedDuration[i].durationType = this.selectedDuration[i]['name'];
      delete this.selectedDuration[i].key1;
    }
  }

  /*Getting Duration List*/
  getDuration() {
    this.apiService.getPublicAPI(Constant.packages)
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

  /* Delete Coupon */
  removeCoupon(id: number): void {
    this.apiService.postAPI(Constant.deleteCoupon + `?id=${id}`)
      .subscribe(() => {
        this.getCoupon();
      });
  }

  /* Checking maximum discount value */
  checkMaxValue(value) {
    if (value <= 100) {
      return true;
    } else {
      value = value.substring(0, value.length - 1);
    }
    const control = this.couponForm.controls['discount'];
    control.setValue(value);
  }

  /* on clicking add people button */
  addPeople(value) {
    this.viewPeoplePage = true;
    this.hidePeoplePage = false;
    this.campaign = value;
    this.apiService.getAPI(Constant.getCouponPeople, this.params)
      .subscribe((res: any) => {
        this.peopleList = res.data.coupan;
      });
  }

  /* setting params to pass */
  get params(): any {
    let params = {};
    params = {'page': this.p, 'limit': this.pageItems};
    this.campaign ? params['campaignId'] = this.campaign : '';
    return params;
  }

  /* Leaving add people Page */
  goBack() {
    this.viewPeoplePage = false;
    this.hidePeoplePage = true;
    this.peopleList = [];
  }
  
  /* leaving Add/Edit form */
  goPrev() {
    this.viewAddEditForm = false;
    this.viewDataGrid = true;
  }

  /* on Changing records per page number on Pagination */
  onChange(value) {
    this.p = 1;
    this.pageItems = +value;
    this.getCoupon();
  }

}
