import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './user/signin.component';
import { SignUpComponent } from './user/signup.component';
import { UserListComponent } from './user/userlist.component';
import { UserEditComponent } from './user/useredit.component';
import { ForgotPasswordComponent } from './user/forgotPassword.component';
import { ChangePasswordComponent } from './user/changePassword.component';
import { NotFoundComponent } from './others/notFound.component';
import { AppConfig } from './app.config';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, RoleGuardService, RoleGuardEditPreventionService } from './_services/index';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: SignInComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'resetPassword',
    component: ForgotPasswordComponent
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent
  },
  {
    path: 'userlist',
    component: UserListComponent,
    canActivate: [RoleGuardService]
  },
  {
    path: 'useredit/:userid',
    component: UserEditComponent,
    canActivate: [RoleGuardEditPreventionService]
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
   redirectTo: '/404'
  },
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    UserListComponent,
    UserEditComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    NotFoundComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [
    AppConfig,
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        RoleGuardService,
        RoleGuardEditPreventionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
