import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthPage } from './auth';
import { EmailSignUpModule } from '../../components/email-sign-up/email-sign-up.module'
import { EmailSignInModule } from '../../components/email-sign-in/email-sign-in.module'
// auth components



@NgModule({
  declarations: [
    AuthPage,
    
  ],
  imports: [
    EmailSignUpModule,
    EmailSignInModule,
    IonicPageModule.forChild(AuthPage),
  ],

  exports: [
    AuthPage,
    

  ]
})
export class AuthPageModule {}
