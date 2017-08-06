import { Component } from '@angular/core';
import { ViewController, NavController, ActionSheetController, IonicPage, NavParams} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { CommunityProvider } from '../../providers/community/community';
import { UtilProvider } from '../../providers/util/util';
import { CalendarDateFormatter, DateFormatterParams, CalendarUtils, CalendarMonthViewDay } from 'angular-calendar';
import { GetMonthViewArgs, MonthView, getMonthView } from 'calendar-utils';
import { CustomDateFormatter } from '../../providers/calendar/calendar.provider';

@IonicPage()

@Component({
    selector: 'calendar-add-event',
    templateUrl: 'calendar-add-event.html',
    
})
export class CalendarAddEventComponent {
   
    view = 'day';
    viewDate: Date;
    public myPhotosRef: any;
    public myPhoto: any;
    public myPhotoURL: any;
    title: string;
    postContent:string;
    image = null;
    blobImage;
    constructor(
        private viewController:ViewController, 
        private navController: NavController, 
        private socialProvider: CommunityProvider, 
        private util:UtilProvider,
        private actionSheetCtrl: ActionSheetController,
        private camera: Camera,
        private navParams: NavParams
        ) {
          this.viewDate = navParams.get('viewDate');
          this.title =this.dayViewTitle(this.viewDate) ;
    }

    
    dayViewTitle = function (_a) {
        var date = _a.date, locale = _a.locale;
        return new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'long',
            weekday: 'short'
        }).format(date);
    };
    

    dismiss(data:boolean) {
        
        this.viewController.dismiss(data);
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
            this.dismiss(true);
            
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
        this.postContent = "";
        this.image = null;
        this.blobImage = null;
    }
}