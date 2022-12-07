import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthState} from "./auth.model";
import {eAppState} from "../../state/state";
import {AuthProvider} from "../auth-provider";


export const getAuthState = createFeatureSelector<AuthState>(eAppState.AUTH)

export const getProviderLink = (provider: AuthProvider) => createSelector(getAuthState, (state) => {
  return state.providerLink[provider]
});

export const getAuthToken = createSelector(getAuthState, (state) => {
  return state.jwtToken
})
