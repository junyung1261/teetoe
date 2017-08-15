import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticePage } from "./notice";


@NgModule({
  declarations: [
    NoticePage,
    
   
  ],
  imports: [
    
 
    IonicPageModule.forChild(NoticePage)
  ],
  exports: [
    NoticePage
    
  ]
})
export class NoticePageModule {}
