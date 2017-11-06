import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Constant} from '../constants/constants';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';

@Injectable()
export class ApiManagerService {

  constructor(private http: HttpClient) {
  }

  // /* Getting isLoading value */
  // private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  //
  // getLoader(): Observable<boolean> {
  //   return this.isLoading.asObservable();
  // }
  //
  // setLoader(value: boolean) {
  //   this.isLoading.next(value);
  // }
  //
  // private showLoader() {
  //   this.setLoader(true);
  // }
  //
  // private hideLoader() {
  //   this.setLoader(false);
  // }

  /* Getter and setter isLoading */
  /* End */

  /* GET API - read only, get all records */
  getAPI(endpoint: string, loader: boolean = true): Observable<any> {
    // if (loader) {
    //   this.showLoader();
    // }
    return this.http.get(Constant.baseUrl + endpoint, {
      headers: new HttpHeaders().set('x-access-token', sessionStorage.getItem('currentUser')),
    })
      .catch(this.onCatch)
      .map(res => {
        // this.extractData(res.json(), false);
        return res;
      })
      .finally(() => {
        // this.hideLoader();
      });
  }

  /* Delete record */
  deleteAPI(endpoint: string, loader: boolean = true): Observable<any> {
    // this.showLoader();
    return this.http.delete(Constant.baseUrl + endpoint, {
      headers: new HttpHeaders().set('x-access-token', sessionStorage.getItem('currentUser')),
    })
      .catch(this.onCatch)
      .map(res => {
        // this.extractData(res.json(), true);
        return res;
      })
      .finally(() => {
        // this.hideLoader();
      });
  }

  /* Add record */
  postAPI(endpoint: string, formVal: any): Observable<any> {
    // this.showLoader();
    return this.http.post(Constant.baseUrl + endpoint, formVal, {
      headers: new HttpHeaders().set('x-access-token', sessionStorage.getItem('currentUser')),
    })
      .catch(this.onCatch)
      .map(res => {
        // this.extractData(res, true);
        return res;
      })
      .finally(() => {
        // this.hideLoader();
      });
  }

  /* Update record */
  putAPI(endpoint: string, formVal: any): Observable<any> {
    // this.showLoader();
    return this.http.put(Constant.baseUrl + endpoint, formVal, {
      headers: new HttpHeaders().set('x-access-token', sessionStorage.getItem('currentUser')),
    })
      .catch(this.onCatch)
      .map(res => {
        // this.extractData(res.json(), true);
        return res;
      })
      .finally(() => {
        // this.hideLoader();
      });
  }

  // private extractData(res, show?: boolean) {
  //   const msg = res.message;
  //
  //   if (show && msg) {
  //     this.toastr.success(msg);
  //   }
  // }

  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    return Observable.throw(error);
  }
}
