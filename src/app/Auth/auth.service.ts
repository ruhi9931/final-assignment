import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
// import { User } from "./Userr.model";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Userr } from "./Userr.model";


export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthService {
  [x: string]: any;
  role: string = '';

   //user is declared as BehaviorSubject that will react to changes in user data.
  user = new BehaviorSubject<Userr | null>(null);

  //used to keep the track of expiration time of the token.
  private tokenExpirationTimer: any;
  
  //It'll check whether the logged in person is Admin or not.
  private _isAdmin: boolean = false; 

  constructor(private http: HttpClient, private router: Router) { }

  //we'll get the value of isAdmin, if Admin will be logged in , it'll return true otherwise it'll return false.
  get isAdmin(): boolean {
    return this._isAdmin;
  }

  //we'll be the setting the value for admin. it's true or false.
  set isAdmin(value: boolean) {
    this._isAdmin = value;
    localStorage.setItem('isAdmin', JSON.stringify(value));
  }

  //it'll be called when user will try to signup.
  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCSSRoGJdxRBsjnseFrmJlPycoRsvUJxhM',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn,
          );
        })
      );
  }

  //it'll called when user will try to login.
  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCSSRoGJdxRBsjnseFrmJlPycoRsvUJxhM',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      })
    );
  }


  //After login if page will be refreshed that time the autoLogin() will be called.
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData')!);
    if (!userData) {
      return;
    }

    const loadedUser = new Userr(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  //logout() will be called whenever user will click on the logout button.
  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    // localStorage.removeItem('admin');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  //autoLogout() will be automatically called , when the token will be expired.
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  //Below method will handle the authentication process whether the user is valid or not.
  private handleAuthentication(
    email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new Userr(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }


  //below method will be called whenever any error will be occured.
  private handleError(errorRes: HttpErrorResponse) {
    // console.log(errorRes);

    let errorMessage = 'either email or password is incorrect!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}