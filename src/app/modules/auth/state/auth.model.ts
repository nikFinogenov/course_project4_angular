import {AuthProvider} from "../auth-provider";
import {HttpErrorResponse} from "@angular/common/http";


export interface AuthState {
  providerLink: providerLink
  jwtToken: string;
  isLoading: boolean;
  isLoadingSuccess: boolean;
  isLoadingFailure: boolean;
  error: HttpErrorResponse
}

export interface providerLink {
  [key: string]: string;
}
