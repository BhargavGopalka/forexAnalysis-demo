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

  p = 1;
  tPage = null;
  pageItems = PaginationItems.initialRecords;

  showTable = true;
  showForm = false;

  ssList: Subscribe[] = [];

  existingData = null;
  selectedPrice: number;
  selectedDiscount = 0;
  afterDiscountPrice: number;
  discountValue: number;

  subscribeForm: FormGroup;

  constructor(private apiService: ApiManagerService) {
  }

  ngOnInit() {
    this.initialFunction();
  }

  initialFunction() {
    this.getSubScription();
  }

  /* Will Build form */
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

  /* Function will let program know, is it for Add or Edit details */
  editAddSsDetail(subscribeData: any) {
    this.showForm = true;
    this.showTable = false;
    this.formBuild(subscribeData);
    this.existingData = subscribeData;
  }

  selectDiscount(valueDis) {
    this.selectedDiscount = +valueDis;
    this.afterDiscountPrice = (this.selectedPrice - ((this.selectedPrice * this.selectedDiscount) / 100));
    return this.afterDiscountPrice;
  }

  selectPrice(valuePrice) {
    this.selectedPrice = +valuePrice;
    if (this.selectedDiscount === 0) {
      this.afterDiscountPrice = this.selectedPrice;
    } else {
      this.afterDiscountPrice = (this.selectedPrice - ((this.selectedPrice * this.selectedDiscount) / 100));
    }
    return this.afterDiscountPrice;
  }

  getSubScription() {
    this.apiService.getAPI(Constant.getSubscription, this.params)
      .subscribe((res: any) => {
        this.tPage = res.pager.totalRecords;
        this.ssList = res.data.subscriptions;
      });
  }

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
      // debugger;
      value = value.substring(0, value.length - 1);
    }
    const control = this.subscribeForm.controls['discount'];
    control.setValue(value);
  }

  get params(): any {
    let params = {};
    params = {'page': this.p, 'limit': this.pageItems};
    return params;
  }

  onChange(value) {
    this.p = 1;
    this.pageItems = +value;
    this.getSubScription();
  }

  goPrev() {
    this.showForm = false;
    this.showTable = true;
  }

}
