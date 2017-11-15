import {Component, OnInit} from '@angular/core';
import {Constant, PaginationItems} from '../../../utility/constants/constants';
import {ApiManagerService} from '../../../utility/shared-service/api-manager.service';
import {FormControl, FormGroup} from '@angular/forms';
import {LatestNews} from './latest-news.model';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.css']
})
export class LatestNewsComponent implements OnInit {

  /* Pagination Variables */
  p = 1;
  tPage: number;
  pageItems = PaginationItems.initialRecords;

  viewDataGrid = true;
  viewAddEditForm = false;

  existingData = null;

  newsList: LatestNews[] = [];

  newsForm: FormGroup;
  searchFilter: FormControl = new FormControl();

  constructor(private apiService: ApiManagerService) {
  }

  ngOnInit() {
    this.initialFunctions();
  }

  /* Functions that will call Initially */
  initialFunctions() {
    this.getNews();
    this.searchNews(this.searchFilter);
  }

  /* Getting newsList on search Input */
  searchNews(control: FormControl) {
    control.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(() => {
        return this.apiService.getAPI(Constant.getNews, this.params);
      })
      .subscribe((res: any) => {
        this.tPage = res.pager.totalRecords;
        this.newsList = res.data.news;
      });
  }


  /* Building Form */
  formBuild(newsData: any) {
    this.newsForm = new FormGroup({
      news: new FormControl(newsData ? newsData.news : '')
    });
  }

  /* will call when clicked on Add or Edit button */
  addEditDetail(newsData?: any) {
    this.viewAddEditForm = true;
    this.viewDataGrid = false;
    this.formBuild(newsData);
    if (newsData) {
      this.existingData = newsData;
    }
  }

  /*Getting News-grid Data*/
  getNews() {
    this.apiService.getAPI(Constant.getNews, this.params)
      .subscribe((res: any) => {
        this.tPage = res.pager.totalRecords;
        this.newsList = res.data.news;
      });
  }

  /* Adding and Updating News */
  addNews(formValue: any) {
    if (this.existingData == null) {
      this.apiService.postAPI(Constant.addNews, formValue)
        .subscribe(() => {
            this.getNews();
            this.goPrev();
          },
          msg => {
            console.log(msg.status);
          });
    } else {
      formValue['id'] = this.existingData._id;                  // Pass Id for selected object, for update API
      this.apiService.postAPI(Constant.updateNews, formValue)
        .subscribe(() => {
            this.getNews();
            this.goPrev();
          },
          msg => {
            console.log(msg.status);
          });
    }
  }

  /* Remove selected object */
  removeNews(id): void {
    this.apiService.postAPI(Constant.deleteNews + `?id=${id}`)
      .subscribe(() => {
        this.getNews();
      });
  }

  /* Enable Disable object */
  enableDisableNews(newsData: any) {
    const enableDisableParam = {'id': newsData._id, isEnable: !newsData.isEnable};
    this.apiService.postAPI(Constant.enaDisNews, enableDisableParam)
      .subscribe(() => {
        (newsData.isEnable) = !(newsData.isEnable);
        return newsData.isEnable;
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
    this.getNews();
  }

  /* Leaving add/edit form view */
  goPrev() {
    this.viewAddEditForm = false;
    this.viewDataGrid = true;
  }

}
