import {Component, OnInit} from '@angular/core';
import {Constant} from '../../../utility/constants/constants';
import {ApiManagerService} from '../../../utility/shared-service/api-manager.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.css']
})
export class LatestNewsComponent implements OnInit {

  p = 1;
  tPage: number;
  pageItems = Constant.recordsPerPage[0];

  showTable = true;
  showForm = false;

  existingData = null;
  param: any;

  newsList: any[] = [];

  newsForm: FormGroup;

  constructor(private apiService: ApiManagerService) {
  }

  ngOnInit() {
    this.initialFunctions();
  }

  initialFunctions() {
    this.getNews();
  }

  initial(newsData: any) {
    this.newsForm = new FormGroup({
      news: new FormControl(newsData ? newsData.news : '')
    });
  }

  showProperty(newsData?: any) {
    this.showForm = true;
    this.showTable = false;
    this.initial(newsData);
    if (newsData) {
      this.existingData = newsData;
    }
  }

  /*Getting News-grid Data*/
  getNews() {
    this.apiService.getAPI(Constant.getNews + `?page=${this.p}&limit=${this.pageItems}&`)
      .subscribe((res: any) => {
        this.tPage = res.pager.totalRecords;
        this.newsList = res.data.news;
      });
  }

  /* Search NEWS based on input */
  searchNews(value: string) {
    if (value === '') {
      this.getNews();
    } else {
      // const searchAnswer = {'createDate': -1};
      const url = `?page=${this.p}&limit=${this.pageItems}&search=${value}&`;
      this.apiService.getAPI(Constant.getNews + url)
        .subscribe(res => {
          this.tPage = res.pager.totalRecords;
          this.newsList = res.data.news;
        });
    }
    return this.newsList;
  }

  /* Adding and Updating News */
  addNews(formValue: any) {
    if (this.existingData == null) {
      this.apiService.postAPI(Constant.addNews, formValue)
        .subscribe(() => {
            this.getNews();
            this.showTable = true;
            this.showForm = false;
          },
          msg => {
            console.log(`Error: ${msg.status} ${msg.statusText}`);
          });
    } else {
      formValue['id'] = this.existingData._id; // Pass Id for selected object, for update API
      this.apiService.postAPI(Constant.updateNews, formValue)
        .subscribe(() => {
            this.getNews();
            this.showTable = true;
            this.showForm = false;
          },
          msg => {
            console.log(`Error: ${msg.status} ${msg.statusText}`);
          });
    }
  }

  /* Remove selected object */
  removeNews(id, index: number): void {
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

  /* On changing 'Records Per Page' number on Pagination */
  onChange(value) {
    this.p = 1;
    this.pageItems = +value;
    this.getNews();
  }

  goPrev() {
    this.showForm = false;
    this.showTable = true;
  }

}
