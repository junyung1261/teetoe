import { Component, ViewChild, Input } from '@angular/core';
import { ViewController, NavController, ActionSheetController, IonicPage, NavParams, Content } from 'ionic-angular';
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
    selector: 'calendar-add-event',
    templateUrl: 'calendar-add-event.html',
    
})
export class CalendarAddEventComponent {
   @Input() eventRef;
   @ViewChild(Content) content: Content;
    item: number = 5;
    view = 'day';
    viewDate: Date;
    segment: String = 'all';
    events: CalendarEvent[];
    public myPhotosRef: any;
    public myPhoto: any;
    public myPhotoURL: any;
    headerTitle: string;
    postContent:string;
    newEventTitle:string;
    image = null;
    blobImage;
    constructor(
        private viewController:ViewController, 
        private navController: NavController, 
        private socialProvider: CommunityProvider, 
        private util:UtilProvider,
        private actionSheetCtrl: ActionSheetController,
        private camera: Camera,
        private navParams: NavParams,
        private eventProvider: EventProvider
        ) {
          this.viewDate = navParams.get('viewDate');
          this.events = navParams.get('viewDateEvents')
        
          this.headerTitle =this.dayViewTitle(this.viewDate) ;
          
    }

    toggle(){
        this.content.resize();
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

    pushEvent(){
        if(this.newEventTitle){
        
        
        var newEvent: CalendarEvent = {start: startOfDay(this.viewDate), title: this.newEventTitle, color: colors.blue, tracks: ['init'] };
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
        console.log("빠이");
        this.viewController.dismiss(this.events);
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