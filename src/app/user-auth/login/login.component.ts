import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Constant} from '../../utility/constants/constants';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ApiManagerService} from '../../utility/shared-service/api-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  passwordMessage: string;
  usernameMessage: string;

  constructor(private routes: Router,
              private apiService: ApiManagerService) {
  }

  ngOnInit() {
    this.generateForm();
  }

  generateForm() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', {validators: [Validators.required, Validators.minLength(2)]}),
      password: new FormControl('', {validators: [Validators.required, Validators.maxLength(10)]}),
      isRemember: new FormControl(false)
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
    if (this.loginForm.valid === true) {
      this.apiService.postPublicAPI(Constant.adminLogin, formValue)
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
