import {Component, OnInit} from '@angular/core';
import {Constant} from '../../../utility/constants/constants';
import {ApiManagerService} from '../../../utility/shared-service/api-manager.service';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {

  p = 1;
  tPage: number;
  pageItems = Constant.recordsPerPage[0];

  enquiryList: any[] = [];
  messageInput: string;

  constructor(private apiService: ApiManagerService) {
  }

  ngOnInit() {
    this.initialFunctions();
  }

  /* List of Function that will called Initially */
  initialFunctions() {
    this.getEnquiry();
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

  /* Search Enquiry based on input */
  // searchEnquiry() {
  //   this.apiService.getAPI(Constant.getIssue, this.params)
  //     .subscribe(res => {
  //       this.tPage = res.pager.totalRecords;
  //       this.enquiryList = res.data.contactUs;
  //     });
  //   return this.enquiryList;
  // }

  get params(): any {
    let params = {};
    params = {'page': this.p, 'limit': this.pageItems};
    this.messageInput ? params['search'] = this.messageInput : '';
    return params;
  }

  /* On changing 'Records Per Page' number on Pagination */
  onChange(value) {
    this.p = 1;
    this.pageItems = +value;
    this.getEnquiry();
  }

}
