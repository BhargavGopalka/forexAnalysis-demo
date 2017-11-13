import {Component, OnInit} from '@angular/core';
import {ApiManagerService} from '../../../utility/shared-service/api-manager.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Constant, PaginationItems} from '../../../utility/constants/constants';
import {Faq} from './faq.model';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  p = 1;
  tPage: number;
  pageItems = PaginationItems.initialRecords;

  showTable = true;
  showForm = false;

  existingData = null;
  messageInput: string;

  faqList: Faq[] = [];

  faqForm: FormGroup;

  constructor(private apiService: ApiManagerService) {
  }

  ngOnInit() {
    this.initialFunction();
  }

  initialFunction() {
    this.getFaq();
  }

  initial(faqData: any) {
    this.faqForm = new FormGroup({
      question: new FormControl(faqData ? faqData.question : ''),
      answers: new FormControl(faqData ? faqData.answers : ''),
      id: new FormControl(faqData ? faqData._id : '')
    });
  }

  showProperty(faqData: any) {
    this.showForm = true;
    this.showTable = false;
    this.initial(faqData);
    this.existingData = faqData;
  }

  getFaq() {
    this.apiService.getAPI(Constant.getFaq, this.params)
      .subscribe((res: any) => {
        this.tPage = res.pager.totalRecords;
        this.faqList = res.data.faqs;
      });
  }

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

  get params(): any {
    let params = {};
    params = {'page': this.p, 'limit': this.pageItems};
    this.messageInput ? params['search'] = this.messageInput : '';
    return params;
  }

  onChange(value) {
    this.p = 1;
    this.pageItems = +value;
    this.getFaq();
  }

  goPrev() {
    this.showForm = false;
    this.showTable = true;
  }

}
