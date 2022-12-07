import {createAction, props} from "@ngrx/store";
import {AuthProvider} from "../auth-provider";
import {HttpErrorResponse} from "@angular/common/http";


export enum eAuthActions {
  GET_PROVIDER_LINK = '[AUTH] Get provider link',
  GET_PROVIDER_LINK_SUCCESS = '[AUTH] Get provider link success',
  GET_PROVIDER_LINK_FAILURE = '[AUTH] Get provider link failure',

  SET_AUTH_TOKEN = '[AUTH] Set Token',

  REMOVE_AUTH_TOKEN = '[AUTH] Remove Token'
}

export const getProviderLink = createAction(
  eAuthActions.GET_PROVIDER_LINK,
  props<{provider: AuthProvider}>()
);

export const getProviderLinkSuccess = createAction(
  eAuthActions.GET_PROVIDER_LINK_SUCCESS,
  props<{payload: {link: string; provider: AuthProvider}}>()
)
export const getProviderLinkFailure = createAction(
  eAuthActions.GET_PROVIDER_LINK_FAILURE,
  props<{ payload: HttpErrorResponse }>()
)

export const setAuthToken = createAction(
  eAuthActions.SET_AUTH_TOKEN,
  props<{token: string}>()
)

export const removeToken = createAction(
  eAuthActions.REMOVE_AUTH_TOKEN
)
