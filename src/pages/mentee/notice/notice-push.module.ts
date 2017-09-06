import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PushNoticePage } from "./notice-push";


@NgModule({
  declarations: [
    PushNoticePage,
    
   
  ],
  imports: [
    
 
    IonicPageModule.forChild(PushNoticePage)
  ],
  exports: [
    PushNoticePage
    
  ]
})
export class NoticePageModule {}
