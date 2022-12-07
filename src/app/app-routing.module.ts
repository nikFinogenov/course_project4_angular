import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {NotAuthorizedComponent} from "./components/not-authorized/not-authorized.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {InfoComponent} from "./components/info/info.component";
import {AuthGuard} from "./modules/auth/guards/auth.guard";
import {SecuredComponentComponent} from "./components/secured-component/secured-component.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'secured-page',
    component: SecuredComponentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '401-not-authorized',
    component: NotAuthorizedComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]; // sets up routes constant where you define your routes


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
