import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {getProviderLink} from "../../state";
import {AuthProvider} from "../../auth-provider";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  constructor(private store$: Store) {
  }

  clickHandler(): void {
    this.store$.dispatch(getProviderLink({provider: AuthProvider.GOOGLE}))
  }
}

