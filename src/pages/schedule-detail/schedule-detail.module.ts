import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScheduleDetailPage } from "./schedule-detail";

import { PostCmp } from '../../components/post/post';
import { MomentModule } from 'angular2-moment';
import { ShrinkHeaderModule } from '../../components/shrink-header/shrink-header.module';



@NgModule({
  declarations: [
    ScheduleDetailPage,
    
   
  ],
  imports: [
   
    
    IonicPageModule.forChild(ScheduleDetailPage)
  ],
  exports: [
    
    ScheduleDetailPage
  ]
  

})
export class ScheduleDetailPageModule {}
