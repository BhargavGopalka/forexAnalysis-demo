import {Component, OnInit} from '@angular/core';
import {ApiManagerService} from '../../../utility/shared-service/api-manager.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Constant} from '../../../utility/constants/constants';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  p = 1;
  tPage: number;
  pageItems = Constant.recordsPerPage[0];

  showTable = true;
  showForm = false;

  existingData = null;

  faqList: any[] = [];

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
    this.apiService.getAPI(`api/admin/faqs/getAll?page=${this.p}&limit=${this.pageItems}&`)
      .subscribe((res: any) => {
        this.tPage = res.pager.totalRecords;
        this.faqList = res.data.faqs;
      });
  }

  searchFaq(value: string) {
    const searchAnswer = {'answers': -1};
    // ApiEndpoints.Department + `?records=all&sortBy=department&sortOrder=asc&search=${JSON.stringify(searchName)}
    this.apiService.getAPI(`api/admin/faqs/getAll?
    page=${this.p}&
    limit=${this.pageItems}&
    sort=${JSON.stringify(searchAnswer)}&
    search=${value}&`)
      .subscribe(res => {
        this.faqList = res.data.faqs;
        // console.log(this.departmentList);
      });
  }

  addFaq(formValue: any) {
    if (this.existingData == null) {
      this.apiService.postAPI(`api/admin/faqs/add`, formValue)
        .subscribe(() => {
            this.getFaq();
            this.showTable = true;
            this.showForm = false;
          },
          msg => {
            console.log(`Error: ${msg.status} ${msg.statusText}`);
          });
    } else {
      this.apiService.postAPI(`api/admin/faqs/update`, formValue)
        .subscribe(() => {
            this.getFaq();
            this.showTable = true;
            this.showForm = false;
          },
          msg => {
            console.log(`Error: ${msg.status} ${msg.statusText}`);
          });
    }
  }

  removeFaq(id: number, index: number): void {
    this.apiService.postAPI(`api/admin/faqs/delete?id=${id}`)
      .subscribe(() => {
        this.faqList.splice(index, 1);
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
