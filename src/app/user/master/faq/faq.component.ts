import {Component, OnInit} from '@angular/core';
import {ApiManagerService} from '../../../utility/shared-service/api-manager.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Constant, PaginationItems} from '../../../utility/constants/constants';
import {Faq} from './faq.model';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  /* Pagination Variables */
  p = 1;
  tPage: number;
  pageItems = PaginationItems.initialRecords;

  viewDataGrid = true;
  viewAddEditForm = false;

  existingData = null;

  faqList: Faq[] = [];

  faqForm: FormGroup;
  searchFilter = new FormControl();

  constructor(private apiService: ApiManagerService) {
  }

  ngOnInit() {
    this.initialFunction();
  }

  /* Will call Initially */
  initialFunction() {
    this.getFaq();
    this.searchFaqs(this.searchFilter);
  }

  /* Getting FaqList on search Input */
  searchFaqs(control: FormControl) {
    control.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(() => {
        return this.apiService.getAPI(Constant.getFaq, this.params);
      })
      .subscribe((res: any) => {
            this.tPage = res.pager.totalRecords;
            this.faqList = res.data.faqs;
          });
  }

  /* Building Form for Add or Edit details */
  formBuild(faqData: any) {
    this.faqForm = new FormGroup({
      question: new FormControl(faqData ? faqData.question : ''),
      answers: new FormControl(faqData ? faqData.answers : ''),
      id: new FormControl(faqData ? faqData._id : '')
    });
  }

  /* Will call when Add or Edit button will be clicked */
  addEditFaqDetail(faqData: any) {
    this.viewAddEditForm = true;
    this.viewDataGrid = false;
    this.formBuild(faqData);
    this.existingData = faqData;
  }

  /* Getting Faq Details */
  getFaq() {
    this.apiService.getAPI(Constant.getFaq, this.params)
      .subscribe((res: any) => {
        this.tPage = res.pager.totalRecords;
        this.faqList = res.data.faqs;
      });
  }

  /* Add or Edit Faq Detail */
  addFaq(formValue: any) {
    if (this.existingData == null) {
      this.apiService.postAPI(Constant.addFaq, formValue)
        .subscribe(() => {
            this.getFaq();
            this.goPrev();
          },
          msg => {
            console.log(msg.status);
          });
    } else {
      formValue['id'] = this.existingData._id;
      this.apiService.postAPI(Constant.updateFaq, formValue)
        .subscribe(() => {
            this.getFaq();
            this.goPrev();
          },
          msg => {
            console.log(msg.status);
          });
    }
  }

  /* Delete FAQ */
  removeFaq(id: number): void {
    this.apiService.postAPI(Constant.deleteFaq + `?id=${id}`)
      .subscribe(() => {
        this.getFaq();
      });
  }

  /* Enable Disable object */
  enableDisableFaq(faqData: any) {
    const enableDisableParam = {'id': faqData._id, isEnable: !faqData.isEnable};
    this.apiService.postAPI(Constant.enaDisFaq, enableDisableParam)
      .subscribe(() => {
        (faqData.isEnable) = !(faqData.isEnable);
        return faqData.isEnable;
      });
  }

  /* Setting params to pass */
  get params(): any {
    let params = {};
    params = {'page': this.p, 'limit': this.pageItems};
    this.searchFilter.value ? params['search'] = this.searchFilter.value : '';
    return params;
  }

  /* on changing pagination's records per page value */
  onChange(value) {
    this.p = 1;
    this.pageItems = +value;
    this.getFaq();
  }

  /* Leaving add or edit form */
  goPrev() {
    this.viewAddEditForm = false;
    this.viewDataGrid = true;
  }

}
