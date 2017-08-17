import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountPage } from './account';
import { IonicImageViewerModule } from 'ionic-img-viewer';

// auth components



@NgModule({
  declarations: [
    AccountPage
    
  ],
  imports: [
    IonicImageViewerModule,
    IonicPageModule.forChild(AccountPage)
  ],

  exports: [
    AccountPage
    

  ]
})
export class AccountPageModule {}
