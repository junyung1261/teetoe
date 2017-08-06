import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarAddEventComponent } from './calendar-add-event'


// auth components



@NgModule({
  declarations: [
    CalendarAddEventComponent,
    
  ],
  imports: [
    
    IonicPageModule.forChild(CalendarAddEventComponent),
  ],

  exports: [
    CalendarAddEventComponent,
    

  ]
})
export class CalendarAddEventModule {}
