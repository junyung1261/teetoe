import { NgModule,  LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';
import { CalendarPage } from "./calendar";
import { CalendarModule } from 'angular-calendar';
import {
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponentModule } from '../../components/calendar/calendar.component.module'
//import { NgCalendarModule  } from 'ionic2-calendar';
@NgModule({
  declarations: [
    CalendarPage
  ],
  imports: [
    CalendarComponentModule,
    CommonModule,
    FormsModule,
    NgbModalModule.forRoot(),
    IonicPageModule.forChild(CalendarPage),
    CalendarModule.forRoot()

  ],
  exports:[
    CalendarPage
  ]
   
})
export class CalendarPageModule {}
