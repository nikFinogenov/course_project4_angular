import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";
import {removeToken, setAuthToken} from "./modules/auth/state";
import {Observable} from "rxjs";
import {getAuthToken} from "./modules/auth/state/auth.selectors";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'auth-client-ui';
  token$: Observable<string | null> | undefined;


  constructor(private store$: Store, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(query => {
      if (query['token']) {
        this.store$.dispatch(setAuthToken({token: query['token']}))
      }
    });

    this.token$ = this.store$.pipe(select(getAuthToken))
  }

  singOutHandler(): void {
    this.store$.dispatch(removeToken())
  }
}
