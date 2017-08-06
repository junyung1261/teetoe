import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailSignUpComponent } from './email-sign-up';


// auth components



@NgModule({
  declarations: [
    EmailSignUpComponent,
    
  ],
  imports: [
    
    IonicPageModule.forChild(EmailSignUpComponent),
  ],

  exports: [
    EmailSignUpComponent,
    

  ]
})
export class EmailSignUpModule {}
