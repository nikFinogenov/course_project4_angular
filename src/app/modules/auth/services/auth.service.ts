import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../../../../environments/environments";
import {AuthProvider} from "../auth-provider";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly apiUrl = environments.apiUrl

  constructor(private http: HttpClient) { }

  saveAuthToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getAuthToken(): Observable<string | null>  {
    return of(localStorage.getItem('token'));
  }

  getAuthProviderLink(provider: AuthProvider): Observable<{link: string}> {
    return this.http.post<{link: string}>(`${this.apiUrl}/auth/provider-link`, {
      provider,
      origin: window.location.origin
    })
  }

  removeToken(): void {
    localStorage.removeItem('token')
  }

}
