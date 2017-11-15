import {Component, OnInit} from '@angular/core';
import {Constant, PaginationItems} from '../../../utility/constants/constants';
import {ApiManagerService} from '../../../utility/shared-service/api-manager.service';
import {Enquiry} from './enquiry.model';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {

  /* Pagination Variables */
  p = 1;
  tPage: number;
  pageItems = PaginationItems.initialRecords;

  enquiryList: Enquiry[] = [];
  searchFilter: FormControl = new FormControl();

  constructor(private apiService: ApiManagerService) {
  }

  ngOnInit() {
    this.initialFunctions();
  }

  /* List of Function that will called Initially */
  initialFunctions() {
    this.getEnquiry();
    this.searchEnquiry(this.searchFilter);
  }

  /* Getting EnquiryList based on search Input */
  searchEnquiry(control: FormControl) {
    control.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(() => {
        return this.apiService.getAPI(Constant.getIssue, this.params);
      })
      .subscribe((res: any) => {
        this.tPage = res.pager.totalRecords;
        this.enquiryList = res.data.contactUs;
      });
  }

  /* Getting data for Enquiry data grid */
  getEnquiry() {
    this.apiService.getAPI(Constant.getIssue, this.params)
      .subscribe((res: any) => {
        this.tPage = res.pager.totalRecords;
        this.enquiryList = res.data.contactUs;
      });
  }

  /* Remove selected Enquiry */
  removeEnquiry(id) {
    this.apiService.postAPI(Constant.deleteIssue + `?id=${id}`)
      .subscribe(() => {
        this.getEnquiry();
      });
  }

  /* setting params to pass */
  get params(): any {
    let params = {};
    params = {'page': this.p, 'limit': this.pageItems};
    this.searchFilter.value ? params['search'] = this.searchFilter.value : '';
    return params;
  }

  /* On changing 'Records Per Page' number on Pagination */
  onChange(value) {
    this.p = 1;
    this.pageItems = +value;
    this.getEnquiry();
  }

}
