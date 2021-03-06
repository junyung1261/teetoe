
import { NavController, NavParams, IonicPage, ModalController } from 'ionic-angular';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Input, Output, EventEmitter, OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  subWeeks,
  addWeeks,
  startOfMonth
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { CalendarDateFormatter, DateFormatterParams, CalendarUtils, CalendarMonthViewDay } from 'angular-calendar';
import { GetMonthViewArgs, MonthView, getMonthView } from 'calendar-utils';
import { CustomDateFormatter } from '../../../providers/calendar/calendar.provider';
import { EventProvider } from '../../../providers/event/event'


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};


@IonicPage()

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})



export class CalendarPage {



  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

view: string = 'month';
locale: string = 'kr';
activeDayIsOpen: boolean = false;
public viewDate: Date = new Date();

events: CalendarEvent[];
refresh: Subject<any> = new Subject();


selectedDay: CalendarMonthViewDay;

  
ionViewDidEnter() {
    this.eventProvider.getEventList().on('value', snapshot => {
      this.events = [];
        
      snapshot.forEach( snap => {
        
        this.events.push({
          id: snap.key,
          isDone: snap.val().isDone,
          title: snap.val().title,
          start: new Date(snap.val().startAt),
          end: new Date(snap.val().endAt),
          color: snap.val().color,
          tracks: snap.val().tracks,
          mentor: snap.val().mentor
        });
        
        return false
      });
    });
    
    
  }





  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    
    body.forEach(day => {
    
      if (isSameDay(this.viewDate, day.date)) {
        day.cssClass = 'cal-day-selected';
        this.selectedDay = day;
        
      }
    });
  }

  


  constructor(private navCtrl: NavController,  
              private modalCtrl: ModalController,
              private eventProvider: EventProvider,) {
     
        
    }


dayClicked({ date, events }: { date: Date; events: CalendarEvent[]; }, day:CalendarMonthViewDay): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
        this.viewDate = date;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }else if(date.getMonth() > this.viewDate.getMonth()){
        this.viewDate = date;
    }else{
        this.viewDate = date;
    }
    if (this.selectedDay) {
      delete this.selectedDay.cssClass;
    }
    day.cssClass = 'cal-day-selected';
    this.selectedDay = day;
    
  }


  addEvent(date) {
    
      let filter = this.events.filter(
          function(value){
              return isSameDay(date, value.start);
          }
      );

      let today = date;
      let modal = this.modalCtrl.create('CalendarAddEventPage',{viewDate: today, viewDateEvents: filter});
        
      modal.onDidDismiss(data =>{
        if(data.length===0) this.activeDayIsOpen=false;
      });
      modal.present()
      
  }

  

}







 
   /* private eventSource: any;
    private viewTitle: any;

   //[dateFormatter]="calendar.dateFormatter"
    
    isToday:boolean;
    calendar = {
        mode: 'month',
        currentDate: new Date(),
        dateFormatter: {
            formatMonthViewDay: function(date:Date) {
                return date.getDate().toString();
            },
            formatMonthViewDayHeader: function(date:Date) {
                var day: String[] =['일', '월', '화', '수', '목', '금', '토'] ;
                 return day[date.getDay()];
            },
            formatMonthViewTitle: function(date:Date) {
                return (date.getFullYear()%100).toString()+'년 '+(date.getMonth()+1).toString()+'월';
            },
            formatWeekViewDayHeader: function(date:Date) {
                return date.getHours;
            },
            formatWeekViewTitle: function(date:Date) {
                return 'testWT';
            },
            formatWeekViewHourColumn: function(date:Date) {
                return 'testWH';
            },
            formatDayViewHourColumn: function(date:Date) {
                return "오전 \n sdf" + date.getHours().toString();
            },
            formatDayViewTitle: function(date:Date) {
                return 'testDT';
            }
        }
    };

    constructor(private navController:NavController, public navParams: NavParams) {

    }

    loadEvents() {
        this.eventSource = this.createRandomEvents();
    }

    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    onEventSelected(event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    }

    changeMode(mode) {
        this.calendar.mode = mode;
    }

    today() {
        this.calendar.currentDate = new Date();
    }

    onTimeSelected(ev) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    }

    onCurrentDateChanged(event:Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    }

    createRandomEvents() {
        var events = [];
        for (var i = 0; i < 50; i += 1) {
            var date = new Date();
            var eventType = Math.floor(Math.random() * 2);
            var startDay = Math.floor(Math.random() * 90) - 45;
            var endDay = Math.floor(Math.random() * 2) + startDay;
            var startTime;
            var endTime;
            if (eventType === 0) {
                startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                if (endDay === startDay) {
                    endDay += 1;
                }
                endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                events.push({
                    title: 'All Day - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true
                });
            } else {
                var startMinute = Math.floor(Math.random() * 24 * 60);
                var endMinute = Math.floor(Math.random() * 180) + startMinute;
                startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                events.push({
                    title: 'Event - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: false
                });
            }
        }
        return events;
    }

    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }

    markDisabled = (date:Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    };
  
  
*/