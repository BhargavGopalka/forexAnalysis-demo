import {Component, OnInit} from '@angular/core';
import {ApiManagerService} from '../../../utility/shared-service/api-manager.service';
import {Constant, PaginationItems} from '../../../utility/constants/constants';
import {TradingGuide} from './trading-guide.model';
import * as moment from 'moment';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {post} from 'selenium-webdriver/http';

@Component({
  selector: 'app-trading-guide',
  templateUrl: './trading-guide.component.html',
  styleUrls: ['./trading-guide.component.css']
})
export class TradingGuideComponent implements OnInit {

  /* Pagination Variables */
  p = 1;
  tPage: number;
  pageItems = PaginationItems.initialRecords;

  tradingList: TradingGuide[] = [];

  selectedDate: Date;

  dataGrid: Boolean = false;
  addForm: Boolean = false;
  removeTrade: Boolean = false;

  tradingGuideForm: FormGroup;
  searchFilter: FormControl = new FormControl();

  constructor(private apiService: ApiManagerService) {
  }

  ngOnInit() {
    this.initialFunction();
  }

  /* Will call At the beginning */
  initialFunction() {
    this.getTradingGuide();
    this.searchTrading(this.searchFilter);
  }

  /* Getting TradingGuide data on search input*/
  searchTrading(control: FormControl) {
    control.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(() => {
      return this.apiService.getAPI(Constant.getTrading, this.params);
      })
      .subscribe((res: any) => {
        this.tPage = res.pager.totalRecords;
        this.tradingList = res.data.tradingGuide;
        if (this.tradingList.length === 0) {
          this.dataGrid = false;
        } else {
          this.dataGrid = true;
        }
      });
  }

  /* Creating form-array to add multiple values */
  formArray() {
    this.tradingGuideForm = new FormGroup({
      tradingArray: new FormArray([this.formBuild()])
    });
  }

  /* Building the Form to Add Data */
  formBuild() {
    return new FormGroup({
      instrumentType: new FormControl(''),
      stBias: new FormControl(''),
      targets: new FormControl(''),
      invalidation: new FormControl(''),
      s1: new FormControl(''),
      s2: new FormControl(''),
      s3: new FormControl(''),
      r1: new FormControl(''),
      r2: new FormControl(''),
      r3: new FormControl(''),
      description: new FormControl(''),
      isFav: new FormControl(false),
    });
  }

  /* Add another trade data */
  onAddTrade() {
    (<FormArray>this.tradingGuideForm.get('tradingArray')).push(this.formBuild());
    this.removeTrade = true;
  }

  /* remove selected trade data */
  onRemoveTrade(i: number) {
    (<FormArray>this.tradingGuideForm.get('tradingArray')).removeAt(i);
  }

  /* Getting Trading data */
  getTradingGuide(value?) {

    if (value) {                        /* Checking the value */
      this.selectedDate = value;
    } else {                            /* In the beginning when application loads value shows undefined */
      this.selectedDate = new Date();   /* In that case assigning today's date to it */
    }

    this.apiService.getAPI(Constant.getTrading, this.params)
      .subscribe((res: any) => {
        this.tPage = res.pager.totalRecords;
        this.tradingList = res.data.tradingGuide;
        if (this.tradingList.length === 0) {
          this.dataGrid = false;
        } else {
          this.dataGrid = true;
        }
      });
  }

  /* on clicking add button to add Trading Guide */
  onClickAddTrading() {
    this.addForm = true;
    this.dataGrid = false;
    this.formArray();
  }

  /* Adding Trading Form Data*/
  addTradingGuide(formValue: any) {
    const tradingArray = formValue.tradingArray;
    const postDataValue = {
      'dateString': moment(this.selectedDate).format('MM/DD/YYYY'),
      'tradingData': JSON.stringify(tradingArray),
    };
    console.log(postDataValue);
    this.apiService.postAPI(Constant.addTrading, postDataValue)
      .subscribe(() => {
          this.goPrev();
          this.getTradingGuide();
        },
        msg => {
          console.log(msg.status);
        });
  }

  /* Setting Params */
  get params(): any {
    let params = {};
    params = {'records': `all`};
    this.searchFilter.value ? params['search'] = this.searchFilter.value : '';
    this.selectedDate ? params['dateString'] = moment(this.selectedDate).format('MM/DD/YYYY') : '';
    return params;
  }

  /* Leave Add-Form */
  goPrev() {
    this.addForm = false;
    this.dataGrid = true;
  }

}
