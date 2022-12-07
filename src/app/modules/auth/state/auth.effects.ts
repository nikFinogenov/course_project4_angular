import {Injectable} from "@angular/core";
import {Actions, createEffect, Effect, ofType} from "@ngrx/effects";
import {AuthService} from "../services/auth.service";
import * as authActions from './auth.actions'
import {catchError, map, of, switchMap, tap, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import jwt_decode from "jwt-decode";

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  getProviderLink$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.getProviderLink),
      switchMap((action) => {
        return this.authService.getAuthProviderLink(action.provider).pipe(
          map(resp => authActions.getProviderLinkSuccess({payload: {link: resp.link, provider: action.provider}})),
          catchError((err: HttpErrorResponse) => of(authActions.getProviderLinkFailure({payload: err})))
        )
      })
    )
  })

  redirectToProviderAuthLink$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.getProviderLinkSuccess),
      tap((action) => {
        console.log(action.payload.link);
        window.location.href = action.payload.link
      }),
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(err.message, `Error status ${err.status}`)
        return throwError(err);
      })
    );
  }, {dispatch: false})

  setAuthToken$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.setAuthToken),
      tap((action) => {
        this.authService.saveAuthToken(action.token);
        const parsedToken = jwt_decode(action.token);
        // @ts-ignore
        this.toastr.success(`Welcome, ${parsedToken['name']}`, 'You are signed in');

      })
    )
  }, {dispatch: false})

  removeAuthToken$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.removeToken),
      tap(() => {
        this.authService.removeToken();
        this.router.navigate(['/'])

      })
    )
  }, {dispatch: false})

}
