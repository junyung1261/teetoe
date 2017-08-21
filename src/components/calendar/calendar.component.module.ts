import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

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
    
    DateTimePickerComponent
  ],
  imports: [
    

    CommonModule,
    FormsModule,
    NgbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot(),
    CalendarModule
  ],

  exports: [
    
    DateTimePickerComponent

  ]
})
export class CalendarComponentModule {}
