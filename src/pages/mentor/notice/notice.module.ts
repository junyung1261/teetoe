import { NgModule } from '@angular/core';
import { NoticePage } from './notice';
import { IonicPageModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    NoticePage,
  ],
  imports: [
    MomentModule,
    IonicPageModule.forChild(NoticePage),
  ],
  exports: [
    NoticePage
  ]
})
export class TimelinePageModule {}
