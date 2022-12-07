import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {combineLatest, map, Observable} from 'rxjs';
import {select, Store} from "@ngrx/store";
import {AuthService} from "../services/auth.service";
import {getAuthToken} from "../state/auth.selectors";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private store$: Store,
    private router: Router,
    private authService: AuthService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return combineLatest([
      this.store$.pipe(select(getAuthToken)),
      this.authService.getAuthToken()
    ]).pipe(
      map(([stateToken, storageToken]) => {
        console.log([stateToken, storageToken]);
        if (stateToken || storageToken) {
          return true
        } else {
          this.router.navigate(['/401-not-authorized']);
          return false
        }
      })
    )
  }

}
