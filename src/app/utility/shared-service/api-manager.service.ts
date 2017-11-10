import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Constant} from '../constants/constants';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ToastrService} from 'ngx-toastr';

import {catchError, tap} from 'rxjs/operators';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';


@Injectable()
export class ApiManagerService {

  constructor(private http: HttpClient,
              private toastr: ToastrService) {
  }

  /* Getting isLoading value */
  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /* Getter and setter Loader */
  getLoader(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  setLoader(value: boolean) {
    this.isLoading.next(value);
  }

  private showLoader() {
    this.setLoader(true);
  }

  private hideLoader() {
    this.setLoader(false);
  }

  /* End */

  /*Setting Header Data*/
  get httpOptions() {
    return {
      headers: new HttpHeaders().set('x-access-token', sessionStorage.getItem('currentUser'))
    };
  }

  get staticHeader() {
    return {
      headers: new HttpHeaders().set('x-access-token', `2e53a2427762250dfa56096ecab1b3b6`),
    };
  }

  /* End */

  /* GET API - read only, get all records */
  getAPI(endpoint: string): Observable<any> {
    this.showLoader();
    return this.http.get<any>(Constant.baseUrl + endpoint, this.httpOptions)
      .pipe(
        tap((res: any) => {
          this.extractData(res, false);
        }),
        catchError(this.onCatch)
      )
      .finally(() => {
        this.hideLoader();
      });
  }

  /*Get Api with static header*/
  getHeaderAPI(endpoint: string): Observable<any> {
    this.showLoader();
    return this.http.get(Constant.baseUrl + endpoint, this.staticHeader)
      .pipe(
        tap((res: any) => {
          this.extractData(res, false);
        }),
        catchError(this.onCatch)
      )
      .finally(() => {
        this.hideLoader();
      });
  }

  /* Delete record */
  deleteAPI(endpoint: string): Observable<any> {
    this.showLoader();
    return this.http.delete(Constant.baseUrl + endpoint, this.httpOptions)
      .pipe(
        tap((res: any) => {
          this.extractData(res, true);
        }),
        catchError(this.onCatch)
      )
      .finally(() => {
        this.hideLoader();
      });
  }

  /* Add record */
  postAPI(endpoint: string, formVal?: any): Observable<any> {
    this.showLoader();
    return this.http.post<any>(Constant.baseUrl + endpoint, formVal, this.httpOptions)
      .pipe(
        tap((res: any) => {
          this.extractData(res, true);
        }),
        catchError(this.onCatch)
      )
      .finally(() => {
        this.hideLoader();
      });
  }

  /* Update record */
  putAPI(endpoint: string, formVal: any): Observable<any> {
    this.showLoader();
    return this.http.put(Constant.baseUrl + endpoint, formVal, this.httpOptions)
      .pipe(
        tap((res: any) => {
          this.extractData(res, true);
        }),
        catchError(this.onCatch)
      )
      .finally(() => {
        this.hideLoader();
      });
  }

  /* Toastr Success Message */
  private extractData(res, show?: boolean) {
    const msg = res.message;

    if (show && msg) {
      this.toastr.success(msg);
    }
  }

  /* Catch an Error */
  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    return Observable.throw(error);
  }
}
