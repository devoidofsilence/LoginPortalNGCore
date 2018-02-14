import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './user/signin.component';
import { SignUpComponent } from './user/signup.component';
import { ForgotPasswordComponent } from './user/forgotPassword.component';
import { NotFoundComponent } from './others/notFound.component';

const routes: Routes = [
  {
    path: '',
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
    path: '404',
    component: NotFoundComponent
  },
  {
   path: '**',
   redirectTo: '/404'
  }
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
