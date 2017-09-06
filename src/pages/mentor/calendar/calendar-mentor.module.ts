import { NgModule,  LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';
import { MentorCalendarPage } from "./calendar-mentor";
import { CalendarModule } from 'angular-calendar';
import {
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponentModule } from '../../../components/calendar/calendar.component.module'
//import { NgCalendarModule  } from 'ionic2-calendar';
@NgModule({
  declarations: [
    MentorCalendarPage
  ],
  imports: [
    CalendarComponentModule,
    CommonModule,
    FormsModule,
    NgbModalModule.forRoot(),
    IonicPageModule.forChild(MentorCalendarPage),
    CalendarModule.forRoot()

  ],
  exports:[
    MentorCalendarPage
  ]
   
})
export class CalendarPageModule {}
