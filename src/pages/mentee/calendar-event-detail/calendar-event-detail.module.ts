import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarEventDetailPage } from './calendar-event-detail'
import { CalendarComponentModule } from '../../../components/calendar/calendar.component.module'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';
import { Elastic } from '../../../components/elastic-textArea'
import { DateFormatPipe } from '../../../pipes/date';
// auth components



@NgModule({
  declarations: [
    CalendarEventDetailPage,
    Elastic,
    DateFormatPipe
  ],
  imports: [
    
    CalendarComponentModule,
    CommonModule,
    FormsModule, 
    NgbModalModule.forRoot(),
    IonicPageModule.forChild(CalendarEventDetailPage),
    CalendarModule.forRoot()
    
  ],

  exports: [
    DateFormatPipe,
    CalendarEventDetailPage,
    Elastic
  ]
})
export class CalendarEventDetailModule {}
