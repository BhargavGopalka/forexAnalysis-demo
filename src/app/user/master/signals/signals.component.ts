import { Component, OnInit } from '@angular/core';
import {ApiManagerService} from "../../../utility/shared-service/api-manager.service";

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.css']
})
export class SignalsComponent implements OnInit {

  p = 1;
  tPage = null;
  pageItems = 10;
  activeRecord: number;
  pendingRecord: number;
  closedRecord: number;

  constructor(private apiService: ApiManagerService) { }

  ngOnInit() {
    this.initialFunction();
  }

  initialFunction() {
    this.getSignal();
  }

  getSignal() {
    this.apiService.getAPI(`api/admin/signal/getAllNew?limit=${this.pageItems}&page=${this.p}&`)
      .subscribe((res: any) => {
      this.activeRecord = res.data[0].pager.totalRecords;
      this.pendingRecord = res.data[1].pager.totalRecords;
      this.closedRecord = res.data[2].pager.totalRecords;
      });
  }

}
