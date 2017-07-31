import { NgModule,  LOCALE_ID } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarPage } from "./calendar";
import { CalendarModule } from 'angular-calendar';

//import { NgCalendarModule  } from 'ionic2-calendar';
@NgModule({
  declarations: [
    CalendarPage
  ],
  imports: [
    
    CalendarModule.forRoot(),
    IonicPageModule.forChild(CalendarPage)
  ],
  exports:[
    CalendarPage
  ]
   
})
export class CalendarPageModule {}
