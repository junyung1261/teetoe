
import { NavController, NavParams, IonicPage, ModalController,LoadingController } from 'ionic-angular';
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
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { CalendarDateFormatter, DateFormatterParams, CalendarUtils, CalendarMonthViewDay } from 'angular-calendar';
import { GetMonthViewArgs, MonthView, getMonthView } from 'calendar-utils';

import { EventProvider } from '../../providers/event/event'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

//*********** Import image gallery **************//
import { GalleryModal } from 'ionic-gallery-modal';




@IonicPage()
@Component({
  selector: 'page-schedule-detail',
  templateUrl: 'schedule-detail.html',
 
})


export class ScheduleDetailPage {
    loaded: boolean ;
    imgGallery: FirebaseListObservable<any[]>;
    imgGalleryArray : any=[]; 
    photos: any[] = [];
    getIndex:number;
    

  constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public loadingCtrl: LoadingController,  
        public modalCtrl: ModalController, 
        public afDB: AngularFireDatabase) {
     let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', 
      content: ''
    });
    loadingPopup.present();
    this.imgGallery = afDB.list('/gallery');
    this.imgGallery.subscribe(imgGallery => {
        this.imgGalleryArray = imgGallery;
        loadingPopup.dismiss()
    })
        
    }

fullscreenImage(getIndex) {
    //console.log("NEW ==== getIndex="+getIndex);
    let modal = this.modalCtrl.create(GalleryModal,  {
        // For multiple images //
        photos:   this.imgGalleryArray ,
        // For single image //
        // photos: [{url:getImage}], 
      closeIcon: 'close-circle',
      initialSlide: getIndex 
      });
      // console.log("getIndex="+getIndex);
    modal.present();
  }

  

}






