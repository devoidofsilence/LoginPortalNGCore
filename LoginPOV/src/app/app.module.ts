import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './user/signin.component';
import { SignUpComponent } from './user/signup.component';
import { UserListComponent } from './user/userlist.component';
import { UserEditComponent } from './user/useredit.component';
import { ForgotPasswordComponent } from './user/forgotPassword.component';
import { ChangePasswordComponent } from './user/changePassword.component';
import { ConfirmationDialogComponent } from './others/confirmation-dialog.component';
import { NotFoundComponent } from './others/notFound.component';
import { AppConfig } from './app.config';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, RoleGuardService, RoleGuardEditPreventionService, ConfirmationDialogService } from './_services/index';

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
    path: 'changePassword/:userid',
    component: ChangePasswordComponent
    // canActivate: [RoleGuardService]
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
    AlertComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    NgbModule.forRoot()
  ],
  providers: [
    AppConfig,
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        RoleGuardService,
        RoleGuardEditPreventionService,
        ConfirmationDialogService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ ConfirmationDialogComponent ],
})
export class AppModule { }
