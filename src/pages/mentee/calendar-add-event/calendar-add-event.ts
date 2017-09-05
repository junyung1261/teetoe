import { Component, ViewChild } from '@angular/core';
import { ViewController, NavController, ActionSheetController, IonicPage, NavParams, Content, App, ModalController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { CommunityProvider } from '../../../providers/community/community';
import { UtilProvider } from '../../../providers/util/util';
import { CalendarDateFormatter, DateFormatterParams, CalendarUtils, CalendarMonthViewDay } from 'angular-calendar';
import { GetMonthViewArgs, MonthView, getMonthView } from 'calendar-utils';
import { CustomDateFormatter } from '../../../providers/calendar/calendar.provider';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { EventProvider } from '../../../providers/event/event'

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
import { DataProvider } from '../../../providers/data';

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
    selector: 'page-calendar-add-event',
    templateUrl: 'calendar-add-event.html',
    
})
export class CalendarAddEventPage {
   
   @ViewChild(Content) content: Content;
    
    private view = 'day';
    private viewDate: Date;
    private segment: String = 'all';
    private events: CalendarEvent[];
    private mentors: any;
    private headerTitle: string;
    private newEventTitle:string;
    private nowUser: any;

    constructor(
        private viewController:ViewController, 
        private navCtrl: NavController, 
        private socialProvider: CommunityProvider, 
        private util:UtilProvider,
        private actionSheetCtrl: ActionSheetController,
        private camera: Camera,
        private navParams: NavParams,
        private eventProvider: EventProvider,
        private dataProvider: DataProvider,
        private modalCtrl: ModalController
        ) {
          this.viewDate = navParams.get('viewDate');
          this.events = navParams.get('viewDateEvents')
        
          this.headerTitle =this.dayViewTitle(this.viewDate) ;
          
    }

    toggle(){
        this.content.resize();
    }

     ionViewWillEnter() {
         console.log('ㅎㅇ');
        this.events.sort(function (a ,b) {

            if(a.start.getTime() === b.start.getTime()){
                    console.log('같다');
                return a.end.getTime() - b.end.getTime();
            }
            return a.start.getTime() - b.start.getTime();
        });

        this.dataProvider.getCurrentUser().subscribe((user) => {
                    this.nowUser = user;
        });
        
     }

    
   
    dayViewTitle = function (_a) {
        
        var date = _a, locale = _a.locale;
        return new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'long',
            weekday: 'short'
        }).format(date);
    };
    
    convert12H(a) { 
        let time: Date = a; 
        let getTime = time.getHours();
        let getMin = time.getMinutes(); 
        let str: string;
        let min: string;
        if (getTime < 12 ) { 
            str = '오전 ';
            } 
        else { 
            str = '오후 '; 
            if(getTime != 12)  getTime %= 12;  
            } 
        
        if (("" + getMin).length == 1) min = "0" + getMin.toString();
        else min = getMin.toString();
         
        let res = str + getTime.toString() + ':' + min;
        return res; 
    }

    pushEvent(){
        if(this.newEventTitle){
        
        
        var newEvent: CalendarEvent = {
            start: new Date(this.viewDate.setHours(8,0,0)),
            end: new Date(this.viewDate.setHours(8,0,0)),
            title: this.newEventTitle, 
            color: colors.blue, 
            tracks: ['init'],
            isDone: false
            
        };
        this.eventProvider.createEvent(newEvent);
        this.events.push(newEvent);
        this.reset();
        }
    }

    deleteEvent(event){
            
        this.events.splice(this.events.indexOf(event),1);
        this.eventProvider.deleteEvent(event.id);
    }

    

    dismiss() {
        
        this.viewController.dismiss(this.events);
    }

    
    selectMentor(event) {
        if(this.nowUser.isMentee === 'mentee'){
            console.log('시발');
            let modal = this.modalCtrl.create('CalendarSelectMentorModal', {event: event, mentors: this.mentors});   
            modal.present();
        }
     // this.navCtrl.push('ScheduleDetailPage');
      
  }

  goToEventDetail(event: any) {
    // go to the session detail page
    // and pass in the session data
    if(this.nowUser.isMentee ==='mentee') {
        if(event.mentor) this.navCtrl.push('CalendarEventDetailPage', {event: event, userId: event.mentor.mentorID});
        else this.navCtrl.push('CalendarEventDetailPage', {event: event});
    }
    else this.navCtrl.push('CalendarEventDetailPage', {event: event, userId: this.nowUser.$key});
  }





    reset() {
        this.newEventTitle="";
        
    }
}