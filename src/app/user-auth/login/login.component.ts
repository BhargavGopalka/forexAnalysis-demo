import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Constant} from '../../utility/constants/constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  passwordMessage: string;
  usernameMessage: string;

  constructor(private fb: FormBuilder, private http: HttpClient, private routes: Router) {
  }

  ngOnInit() {
    this.generateForm();
  }

  generateForm() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.maxLength(10)]],
      isRemember: [false]
    });
  }

  usernameValidation(control: AbstractControl) {
    if (control.errors === null) {
      return null;
    } else {
      if (control.errors.required === true) {
        return this.usernameMessage = `Name is required`;
      }
      if (control.value.length < 2) {
        return this.usernameMessage = `Minimum length is 2`;
      }
    }
  }

  passwordValidation(control: AbstractControl) {
    if (control.errors === null) {
      return null;
    } else {
      if (control.errors.required === true) {
        return this.passwordMessage = `Password is required`;
      }
      if (control.value.length > 10) {
        return this.passwordMessage = `Maximum length is 10`;
      }
    }
  }

  login(formValue: any) {

    const url = `public/adminLogin`;

    if (this.loginForm.valid === true) {
      this.http.post(Constant.baseUrl + url, formValue, {
        headers: new HttpHeaders().set('x-access-token', '2e53a2427762250dfa56096ecab1b3b6'),
      })
        .subscribe((res: any) => {
            console.log(res);
            const token = res.token;
            sessionStorage.setItem('currentUser', token);
            if (res.status === 200) {
              this.routes.navigate(['home']);
            }
          },
          error => {
            console.log(error);
          });
    }
  }
}
