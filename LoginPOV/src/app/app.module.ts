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
import { ForgotPasswordComponent } from './user/forgotPassword.component';
import { NotFoundComponent } from './others/notFound.component';
import { AppConfig } from './app.config';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';

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
    component: UserListComponent
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
    ForgotPasswordComponent,
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
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    AppConfig,
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
