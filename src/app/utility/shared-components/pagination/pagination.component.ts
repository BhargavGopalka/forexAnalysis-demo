import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  RecordsPerPage: any[] = [10, 20, 30];

  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  @Output() numberChange: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
