import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, combineLatest, Observable, switchMap, throwError} from "rxjs";
import {select, Store} from "@ngrx/store";
import {AuthService} from "../services/auth.service";
import {getAuthToken} from "../state/auth.selectors";
import {environments} from "../../../../environments/environments";
import {removeToken} from "../state";

export const InterceptorSkipHeader = 'X-Skip-Interceptor';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private authService: AuthService,
              private store$: Store) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return combineLatest([
      this.store$.pipe(select(getAuthToken)),
      this.authService.getAuthToken()]
    ).pipe(
      switchMap(([stateToken, storageToken]) => {
        const token = stateToken || storageToken || '';

        if (request.headers.has(InterceptorSkipHeader)) {
          const headers = request.headers.delete(InterceptorSkipHeader);
          return next.handle(request.clone({ headers }));
        }

        const clonedRequest = request.clone({
          headers: request.headers
            .set('Authorization', `${environments.defaultTokenType} ${token}`)
        });
        return next.handle(clonedRequest).pipe(
          catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
              this.store$.dispatch(removeToken())
            }
            return throwError(error);
          })
        );
      })
    )


  }
}
