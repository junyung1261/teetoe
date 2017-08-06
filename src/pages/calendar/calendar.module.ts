import { NgModule,  LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';
import { CalendarPage } from "./calendar";
import { CalendarModule } from 'angular-calendar';
import {
  NgbDatepickerModule,
  NgbTimepickerModule,
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';
import { ClendarComponentModule } from '../../components/calendar/calendar-component.module';
//import { NgCalendarModule  } from 'ionic2-calendar';
@NgModule({
  declarations: [
    CalendarPage
  ],
  imports: [
    ClendarComponentModule,
    CommonModule,
    FormsModule,
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
    IonicPageModule.forChild(CalendarPage)
  ],
  exports:[
    CalendarPage
  ]
   
})
export class CalendarPageModule {}
