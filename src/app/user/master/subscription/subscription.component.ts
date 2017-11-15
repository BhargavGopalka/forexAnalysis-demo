import {Component, OnInit} from '@angular/core';
import {ApiManagerService} from '../../../utility/shared-service/api-manager.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Constant, PaginationItems} from '../../../utility/constants/constants';
import {Subscribe} from './subscribe.model';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  /* Pagination Variables */
  p = 1;
  tPage = null;
  pageItems = PaginationItems.initialRecords;

  viewDataGrid = true;
  viewAddEditForm = false;

  ssList: Subscribe[] = [];

  existingData = null;
  selectedPrice: number;
  selectedDiscount = 0;
  afterDiscountPrice: number;

  subscribeForm: FormGroup;

  constructor(private apiService: ApiManagerService) {
  }

  ngOnInit() {
    this.initialFunction();
  }

  /* Functions that will call Initially */
  initialFunction() {
    this.getSubScription();
  }

  /* Will Build the form */
  formBuild(subscribeData: any) {
    if (subscribeData) {
      this.selectPrice(subscribeData.price);
      this.selectDiscount(subscribeData.discount);
    }
    this.subscribeForm = new FormGroup({
      name: new FormControl(subscribeData ? subscribeData.name : ''),
      planType: new FormControl(subscribeData ? subscribeData.planType : ''),
      description: new FormControl(subscribeData ? subscribeData.description : ''),
      duration: new FormControl(subscribeData ? subscribeData.duration : ''),
      price: new FormControl(subscribeData ? subscribeData.price : ''),
      discount: new FormControl(subscribeData ? subscribeData.discount : '0'),
      discountedPrice: new FormControl({value: subscribeData ? subscribeData.discountedPrice : '', disabled: true})
    });
  }

  /* Function to Add or Edit details */
  editAddSsDetail(subscribeData: any) {
    this.viewAddEditForm = true;
    this.viewDataGrid = false;
    this.formBuild(subscribeData);
    this.existingData = subscribeData;
  }

  /* Getting "Discounted Price" From "Price" and "Discount" field */
  selectDiscount(valueDis) {
    this.selectedDiscount = +valueDis;
    this.afterDiscountPrice = (this.selectedPrice - ((this.selectedPrice * this.selectedDiscount) / 100));
    return this.afterDiscountPrice;
  }

  /* Getting "Discounted Price" based on "Price" field */
  selectPrice(valuePrice) {
    this.selectedPrice = +valuePrice;
    if (this.selectedDiscount === 0) {
      this.afterDiscountPrice = this.selectedPrice;
    } else {
      this.afterDiscountPrice = (this.selectedPrice - ((this.selectedPrice * this.selectedDiscount) / 100));
    }
    return this.afterDiscountPrice;
  }

  /* Getting subscription data */
  getSubScription() {
    this.apiService.getAPI(Constant.getSubscription, this.params)
      .subscribe((res: any) => {
        this.tPage = res.pager.totalRecords;
        this.ssList = res.data.subscriptions;
      });
  }

  /* Add or Edit Subscription data */
  addSubscription(formValue: any) {
    if (this.subscribeForm.valid === true) {
      if (this.existingData == null) {
        this.apiService.postAPI(Constant.addSubscription, formValue)
          .subscribe(() => {
              this.getSubScription();
              this.goPrev();
            },
            msg => {
              console.log(msg.status);
            });
      } else {
        formValue['planId'] = this.existingData._id;
        this.apiService.postAPI(Constant.updateSubscription, formValue)
          .subscribe(() => {
              this.getSubScription();
              this.goPrev();
            },
            msg => {
              console.log(msg.status);
            });
      }
    }
  }

  /* Enable Disable Subscription */
  enableDisableSubscription(ssInfo: any) {
    const enableDisableParam = {'planId': ssInfo._id, isEnable: !ssInfo.isEnable};
    this.apiService.postAPI(Constant.enaDisSubscription, enableDisableParam)
      .subscribe(() => {
        (ssInfo.isEnable) = !(ssInfo.isEnable);
        return ssInfo.isEnable;
      });
  }

  /* Checking maximum discount value */
  checkMaxValue(value) {
    if (value <= 100) {
      return true;
    } else {
      value = value.substring(0, value.length - 1);
    }
    const control = this.subscribeForm.controls['discount'];
    control.setValue(value);
  }

  /* Defining Params to pass */
  get params(): any {
    let params = {};
    params = {'page': this.p, 'limit': this.pageItems};
    return params;
  }

  /* on Changing records per page value on pagination */
  onChange(value) {
    this.p = 1;
    this.pageItems = +value;
    this.getSubScription();
  }

  /* Leaving Add/Edit Form / on Clicking at cancel button */
  goPrev() {
    this.viewAddEditForm = false;
    this.viewDataGrid = true;
  }

}
