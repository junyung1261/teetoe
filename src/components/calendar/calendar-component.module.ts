import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbDatepickerModule,
  NgbTimepickerModule
} from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';
import { CalendarAddEventModule } from './calendar-add-event.module'
import { DateTimePickerComponent } from './date-time-picker';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CalendarAddEventModule,
    IonicPageModule.forChild(DateTimePickerComponent),
    NgbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot(),
    CalendarModule
  ],
  declarations: [ DateTimePickerComponent],
  exports: [ DateTimePickerComponent]
})
export class ClendarComponentModule {}
