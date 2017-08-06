import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailSignInComponent } from './email-sign-in';


// auth components



@NgModule({
  declarations: [
    EmailSignInComponent,
    
  ],
  imports: [
    
    IonicPageModule.forChild(EmailSignInComponent),
  ],

  exports: [
    EmailSignInComponent,
    

  ]
})
export class EmailSignInModule {}
