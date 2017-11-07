import {Component, OnInit} from '@angular/core';
import {ApiManagerService} from '../../../utility/shared-service/api-manager.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  p = 1;
  tPage = null;
  pageItems = 10;

  showTable = true;
  showForm = false;

  ssList = [];

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

  initialFunction() {
    this.getSubScription();
  }

  initial(subscribeData: any) {
    this.subscribeForm = new FormGroup({
      name: new FormControl(subscribeData ? subscribeData.name : ''),
      planType: new FormControl(subscribeData ? subscribeData.planType : ''),
      description: new FormControl(subscribeData ? subscribeData.description : ''),
      duration: new FormControl(subscribeData ? subscribeData.duration : ''),
      price: new FormControl(subscribeData ? subscribeData.price : ''),
      discount: new FormControl(subscribeData ? subscribeData.discount : '0'),
      discountedPrice: new FormControl(subscribeData ? subscribeData.discountedPrice : ''),
      planId: new FormControl(subscribeData ? subscribeData._id : '')
    });
  }

  showProperty(subscribeData: any) {
    this.showForm = true;
    this.showTable = false;
    this.initial(subscribeData);
    this.existingData = subscribeData;
  }

  selectDiscount(valueDis) {
    this.selectedDiscount = +valueDis;
    this.afterDiscountPrice = (this.selectedPrice - ((this.selectedPrice * this.selectedDiscount) / 100));
    return this.afterDiscountPrice;
  }

  selectPrice(valuePrice) {
    this.selectedPrice = +valuePrice;
    this.afterDiscountPrice = this.selectedPrice;
    return this.afterDiscountPrice;
  }

  getSubScription() {
    this.apiService.getAPI(`api/admin/subscription/getPlans?limit=${this.pageItems}&page=${this.p}`)
      .subscribe((res: any) => {
        this.tPage = res.pager.totalRecords;
        this.ssList = res.data.subscriptions;
      });
  }

  addSubscription(formValue: any) {
    if (this.subscribeForm.valid === true) {
      if (this.existingData == null) {
        this.apiService.postAPI(`api/admin/subscription/addPlan`, formValue)
          .subscribe(() => {
              this.getSubScription();
              this.showTable = true;
              this.showForm = false;
            },
            msg => {
              console.log(`Error: ${msg.status} ${msg.statusText}`);
            });
      } else {
        // const url = `phone/${this.selectNumber.phone_id}`;
        this.apiService.postAPI(`api/admin/subscription/updatePlan`, formValue)
          .subscribe(() => {
              this.getSubScription();
              this.showTable = true;
              this.showForm = false;
            },
            msg => {
              console.log(`Error: ${msg.status} ${msg.statusText}`);
            });
      }
    }
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
