import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarAddEventPage } from './calendar-add-event'
import { CalendarComponentModule } from '../../../components/calendar/calendar.component.module'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';

// auth components



@NgModule({
  declarations: [
    CalendarAddEventPage,
    
  ],
  imports: [
    
    CalendarComponentModule,
    CommonModule,
    FormsModule, 
    NgbModalModule.forRoot(),
    IonicPageModule.forChild(CalendarAddEventPage),
    CalendarModule.forRoot()
    
  ],

  exports: [
    
    CalendarAddEventPage

  ]
})
export class CalendarAddEventModule {}
