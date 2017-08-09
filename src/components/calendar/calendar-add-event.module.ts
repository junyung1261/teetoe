import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarAddEventComponent } from './calendar-add-event'

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbDatepickerModule,
  NgbTimepickerModule
} from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';

import { DateTimePickerComponent } from './date-time-picker';




// auth components



@NgModule({
  declarations: [
    CalendarAddEventComponent,
    DateTimePickerComponent
  ],
  imports: [
    

    CommonModule,
    FormsModule,
    IonicPageModule.forChild(DateTimePickerComponent),
    NgbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot(),
    CalendarModule.forRoot(),
    IonicPageModule.forChild(CalendarAddEventComponent),
  ],

  exports: [
    CalendarAddEventComponent,
    DateTimePickerComponent

  ]
})
export class CalendarAddEventModule {}
