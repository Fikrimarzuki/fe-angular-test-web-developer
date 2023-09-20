import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class Authentication implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
  Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    if (route.url[0].path === "login") {
      if (this.cookieService.check("LOGIN_INFO")) {
        this.router.navigate(["/dashboard"])
        return false
      }
      return true
    }
    
    if (this.cookieService.check("LOGIN_INFO")) {
      return true
    }
    this.router.navigate(["/dashboard"])
    return false
  }
}