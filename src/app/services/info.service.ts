import {Injectable} from '@angular/core';
import {environments} from "../../environments/environments";
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {InterceptorSkipHeader} from "../modules/auth/interceptors/auth.interceptor";

export interface iInfo {
  date: string;
  authorName: string;
  appName: string;
}

export const invalidJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjYmNlYTEwMy03MGZkLTQ3YWMtOTkwZS1mZTAzYTJkZDhiMzYiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9naXZlbm5hbWUiOiJBbnJpIE1hdGlzIiwiZW1haWwiOiJpZGVhc29mdHVrcithdGNAZ21haWwuY29tIiwianRpIjoiODAyZmVkZTEtMzBkMy00Y2I4LTlhMWUtNTBkM2Q4M2MwNGU4IiwiaXNidXMiOiJUcnVlIiwiYnVzZnJlc2F0IjoiMDIvMjcvMjAxOSAxMzoyNjowMCIsImJ1c3R5cCI6IlNwYXJlUGFydHNTdG9yZSIsImlhdCI6IjE2Njk0NzIxNDUiLCJuYmYiOjE2Njk0NzIxNDUsImV4cCI6MTY2OTY0NDk0NSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIn0.xG0rl82Ni6ImbGC0tvc_KOcs1wp_DPI5CsgbswbnV_4';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  readonly apiUrl = environments.apiUrl

  constructor(private http: HttpClient, private toastr: ToastrService) {
  }

  getInfo(): Observable<iInfo> {
    return this.http.get<iInfo>(`${this.apiUrl}/info`).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(err.error.message, `Error ${err.status}`)
        return throwError(err)
      })
    );
  }

  getInfoWithInvalidToken(): Observable<iInfo> {
    const headers = {
      "Authorization": `Bearer ${invalidJWT}`
    }
    // @ts-ignore
    headers[InterceptorSkipHeader] = InterceptorSkipHeader;
    return this.http.get<iInfo>(
      `${this.apiUrl}/info`,
      {
        headers
      }
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(err.error.message, `Error ${err.status}`)
        return throwError(err)
      })
    );
  }

  getOpenInfo(): Observable<iInfo> {
    return this.http.get<iInfo>(`${this.apiUrl}/infoUnsafe`).pipe(
      catchError((err: HttpErrorResponse) => {
        ;
        this.toastr.error(err.error.message, `Error ${err.status}`)
        return throwError(err)
      })
    );
  }
}
