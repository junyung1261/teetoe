import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarSelectMentorModal } from './calendar-select-mentor'

// auth components



@NgModule({
  declarations: [
    CalendarSelectMentorModal,
   
  ],
  imports: [
    
    IonicPageModule.forChild(CalendarSelectMentorModal),
    
  ],

  exports: [
    
    CalendarSelectMentorModal,

  ]
})
export class CalendarEventDetailModule {}
