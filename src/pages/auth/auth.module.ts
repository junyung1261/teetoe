import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthPage } from './auth';


// auth components



@NgModule({
  declarations: [
    AuthPage,
    
  ],
  imports: [
    IonicPageModule.forChild(AuthPage),
  ],
  exports: [
    AuthPage,
  
  ]
})
export class AuthPageModule {}
