import {AuthState, providerLink} from "./auth.model";
import {Action, createReducer, on} from "@ngrx/store";
import {HttpErrorResponse} from "@angular/common/http";
import * as authActions from './auth.actions'
import {removeToken} from "./auth.actions";


export const initialState: AuthState = {
  jwtToken: localStorage.getItem('token') || '',
  providerLink: {},
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false,
  error: {} as HttpErrorResponse,
}

const authReducer = createReducer(
  initialState,
  on(authActions.getProviderLink, (state, {provider}) => {
    return {
      ...state,
      isLoading: true,
      isLoadingSuccess: false,
      isLoadingFailure: false,
      error: {} as HttpErrorResponse,
    }
  }),
  on(authActions.getProviderLinkSuccess, (state, {payload}) => {
    const updatedProvider: providerLink = {};
    updatedProvider[payload.provider] = payload.link
    const provider = Object.assign({}, state.providerLink, updatedProvider)
    return {
      ...state,
      isLoading: false,
      isLoadingSuccess: true,
      isLoadingFailure: false,
      providerLink: provider
    }
  }),
  on(authActions.getProviderLinkFailure, (state, {payload}) => ({
    ...state,
    error: payload,
    isLoading: false,
    isLoadingFailure: true
  })),
  on(authActions.setAuthToken, (state, {token}) => ({
    ...state,
    jwtToken: token
  })),
  on(authActions.removeToken, (state) => ({
    ...state,
    jwtToken: ''
  }))
);

export const AuthReducer = (state: AuthState | undefined, action: Action): any => {
  return authReducer(state, action);
}
