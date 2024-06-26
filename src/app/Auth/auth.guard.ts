import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable, map, of, switchMap, take } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  // Activating route guard to prevent the unauthorized access.
  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  //     return this.authService.user.pipe(
  //       take(1),
  //       map(user => {
  //         // const isAdmin = this.authService.isAdmin;
  //         const isAuth = !!user; // user ? true : false

  //         if (isAuth) {
  //           return true;
  //         }
  //         return this.router.createUrlTree(['/auth']);
  //       })
  //     );
  //   }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this.authService.user.pipe(
        take(1),
        map(user => {
          const isAuth = !!user; // user ? true : false
          const isAdminString = localStorage.getItem('isAdmin');
          let isAdmin = false;
          if (isAdminString !== null) {
            isAdmin = JSON.parse(isAdminString);
          }
  
          if (isAuth) {
            if (route.data && route.data["roles"] && !isAdmin) {
              return this.router.createUrlTree(['/home']);
            }
            return true;
          }
          return this.router.createUrlTree(['/auth']);
        })
      );
    }
}
