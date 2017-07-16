import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthPage } from './auth';
import { SignModule } from '../../app/sign.module'

// auth components



@NgModule({
  declarations: [
    AuthPage,
    
  ],
  imports: [
    SignModule,
    IonicPageModule.forChild(AuthPage),
  ],

  exports: [
    AuthPage,
    

  ]
})
export class AuthPageModule {}
