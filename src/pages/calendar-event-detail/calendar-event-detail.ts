import { Component, ViewChild, Input } from '@angular/core';
import { ViewController, NavController, ActionSheetController, IonicPage, NavParams, Content, ModalController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { CommunityProvider } from '../../providers/community/community';
import { UtilProvider } from '../../providers/util/util';
import { CalendarDateFormatter, DateFormatterParams, CalendarUtils, CalendarMonthViewDay } from 'angular-calendar';
import { GetMonthViewArgs, MonthView, getMonthView } from 'calendar-utils';
import { CustomDateFormatter } from '../../providers/calendar/calendar.provider';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { EventProvider } from '../../providers/event/event'

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





@IonicPage()

@Component({
    selector: 'page-calendar-event-detail',
    templateUrl: 'calendar-event-detail.html',
    
})
export class CalendarEventDetailPage {
   
public event1 = {
    month: '1990-02-19',
    timeStarts: '00:00',
    timeEnds: '1990-02-20',
    time:'07:00'
  }

   @ViewChild(Content) content: Content;
    item: number = 5;
    view = 'day';
    viewDate: Date;
    segment: String = 'all';
    event: CalendarEvent;
    event_slice: CalendarEvent;
    start: any;
    public myPhotosRef: any;
    public myPhoto: any;
    public myPhotoURL: any;
    headerTitle: string;
    postContent:string;
    newEventTitle:string;
    image = null;
    blobImage;
    end: any;
    hours: number[];
    callback: any;




    constructor(
        private viewController:ViewController, 
        private navController: NavController, 
        private socialProvider: CommunityProvider, 
        private util:UtilProvider,
        private actionSheetCtrl: ActionSheetController,
        private camera: Camera,
        private navParams: NavParams,
        private eventProvider: EventProvider,
       
        ) {
         
    
    }

    compare(){
        let start = new Date(this.start);
        let end = new Date(this.end);
        
        
        if(start.getTime() > end.getTime()) {
            console.log(start.toISOString());
            console.log(end.toISOString());
            this.start = end.toISOString();
            this.end = start.toISOString();
            
        }

        this.event.start = new Date(start.getTime() + start.getTimezoneOffset() * 60000);
        this.event.end = new Date(end.getTime() + end.getTimezoneOffset() * 60000);
    }
    ionViewWillEnter() {
    this.event = this.navParams.data.event;
    this.event_slice =  JSON.parse(JSON.stringify(this.event)); 
    //this.callback = this.navParams.get("callback");
    
     ;   

  
    var eventTime = this.event;
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds

    this.start = new Date(eventTime.start.getTime() - (eventTime.start.getTimezoneOffset() * 60000)).toISOString();
    
    this.end = new Date(eventTime.end.getTime() - (eventTime.end.getTimezoneOffset() * 60000)).toISOString();
    }

    ionViewWillLeave(){
        if(JSON.stringify(this.event_slice) !== JSON.stringify(this.event)) {
            console.log('업뎃');
            this.eventProvider.updateEvent(this.event);
        }
        
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
            getTime %= 12;  
            } 
       
        if (("" + getMin).length == 1) min = "0" + getMin.toString();
        else min = getMin.toString();
         
        let res = str + getTime.toString() + ':' + min;
        return res; 
    }

   

    

    dismiss() {
        
        //this.viewController.dismiss(this.events);
    }

    sendPost() {
        let obj = {content: this.postContent, image:this.image};
        this.socialProvider.createPost(obj)
        .then((postKey) => {
            console.log(postKey);
            // if Image is Added
            if(this.blobImage) {
                this.socialProvider.postImage(postKey, this.blobImage)
                .then(url => {
                    this.socialProvider.updatePost(postKey,{image:url});
                });
            }
            this.reset();
            
            
        });
    }

    openPost() {
    

      this.navController.push('ScheduleDetailPage');
      
  }

    addImage() {
        this.presentPictureSource()
        .then(source => {
            let sourceType:number = Number(source);
            return this.util.getPicture(sourceType, false);
        })
        .then(imageData => {
            this.blobImage = this.util.dataURItoBlob(imageData);
        });
    }

   presentPictureSource() {
        let promise = new Promise((res, rej) => {
            let actionSheet = this.actionSheetCtrl.create({
            title: 'Select Picture Source',
            buttons: [
                { text: 'Camera', handler: () => { res(1); } },
                { text: 'Gallery', handler: () => { res(0); } },
                { text: 'Cancel', role: 'cancel', handler: () => { rej('cancel'); } }
            ]
            });
            actionSheet.present();
        });
        return promise;
    }





    reset() {
        this.newEventTitle="";
        this.postContent = "";
        this.image = null;
        this.blobImage = null;
    }
}