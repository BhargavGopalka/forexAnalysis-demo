import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Constant, PaginationItems} from '../../constants/constants';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  recordsArray = PaginationItems.paginationArray;

  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  @Output() numberChange: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
