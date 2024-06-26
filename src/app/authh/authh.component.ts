import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from '../Auth/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authh',
  templateUrl: './authh.component.html',
  styleUrls: ['./authh.component.css']
})
export class AuthhComponent {

  //property used to check both the passwords are same.
  confirmPassword: string = '';

  //to check whether the signup process is done.
  signupSuccess: boolean = false;

  //it'll check, if any error is occured.
  error: string = '';

  //it'll check whether the user is in login form.
  isLogin: boolean = false;

  // role:string='';

  constructor(private authService: AuthService, private router: Router) { }

  //the below method is used to toggle between login and signup form.
  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  //it'll be called when the user will submit the login form.
  onSubmitLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }

    console.log(form);

    const email = form.value.email;
    const password = form.value.password;

    if (email === 'admin@gmail.com' && password === '0987654321') {
      this.authService.isAdmin = true;
      // localStorage.setItem('admin',JSON.stringify(this.authService.isAdmin));
    } else {
      this.authService.isAdmin = false;;
    }

    let authObs: Observable<AuthResponseData>;


    authObs = this.authService.login(email, password);


    authObs.subscribe(
      resData => {
        console.log(resData);
        this.router.navigate(['home']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
      }
    )
    form.reset();
  }

  //it'll be called when the user will submit the signup form.
  onSubmitSignup(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    authObs = this.authService.signup(email, password);

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.signupSuccess = true;
        this.isLogin = true;
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
      }
    )
    form.reset();
  }
}