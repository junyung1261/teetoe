import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { EmailSignInComponent } from '../components/email-sign-in/email-sign-in';
import { EmailSignUpComponent } from '../components/email-sign-up/email-sign-up';




@NgModule({
  imports: [
      IonicPageModule.forChild(EmailSignInComponent), 
      IonicPageModule.forChild(EmailSignUpComponent)],
  declarations: [
      EmailSignInComponent,
      EmailSignUpComponent,],
  exports: [
      EmailSignInComponent,
      EmailSignUpComponent,]
}) export class SignModule {}