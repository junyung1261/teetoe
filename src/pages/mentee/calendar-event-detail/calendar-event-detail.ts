import { Component, ViewChild, Input } from '@angular/core';
import { ViewController, NavController, ActionSheetController, IonicPage, NavParams, Content, ModalController } from 'ionic-angular';
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
import { DataProvider } from '../../../providers/data';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { LoadingProvider } from '../../../providers/loading';
import { Keyboard } from '@ionic-native/keyboard';
import { ImagePicker } from '@ionic-native/image-picker';
import { ImageProvider } from '../../../providers/image';

@IonicPage()

@Component({
    selector: 'page-calendar-event-detail',
    templateUrl: 'calendar-event-detail.html',
    
})
export class CalendarEventDetailPage {
   

   @ViewChild(Content) content: Content;
    item: number = 5;
    private event: CalendarEvent;
    private event_slice: CalendarEvent;
    private start: any;
    public myPhotosRef: any;
    public myPhoto: any;
    public myPhotoURL: any;
    
    private postContent:string;
    newEventTitle:string;
    image = null;
    blobImage;
    private end: any;
    private hours: number[];
    private segmentView: string;
    private userId: any;
    private mentor: any;
    private title: any;
    private comment: any;
    private scheduleCommentId: any;
    private comments: any;
    private alert: any;
    private updateDateTime: any;
    private commentsToShow: any;
    private startIndex: any = -1;
    private scrollDirection: any = 'bottom';
    private unreadCommentsCount = 0;
    private numberOfComments = 10;
    private imgGallery: FirebaseListObservable<any[]>;
    private imgGalleryArray : any=[]; 
  


    constructor(
        private viewController:ViewController, 
        private navCtrl: NavController, 
        private socialProvider: CommunityProvider, 
        private util:UtilProvider,
        private actionSheetCtrl: ActionSheetController,
        private camera: Camera,
        private navParams: NavParams,
        private eventProvider: EventProvider,
        public dataProvider: DataProvider, 
        public angularfireDatabase: AngularFireDatabase,
        public loadingProvider: LoadingProvider,
        public keyboard: Keyboard,
        public imagePicker: ImagePicker,
        public imageProvider: ImageProvider,
        ) 
        {
        this.segmentView = 'album'; 
        
    }

    compare() {
        let start = new Date(this.start);
        let end = new Date(this.end);
        
        var swap = function (x){return x};
        
        
        if(start.getTime() > end.getTime()) {
           
            this.start = end.toISOString();
            this.end = start.toISOString();
            
        }

        this.event.start = new Date(start.getTime() + start.getTimezoneOffset() * 60000);
        this.event.end = new Date(end.getTime() + end.getTimezoneOffset() * 60000);
    }

    ionViewWillEnter() {
    this.event = this.navParams.data.event;
    this.userId = this.navParams.data.userId;
    
    
    this.event_slice =  JSON.parse(JSON.stringify(this.event)); 
    var eventTime = this.event;
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds

    this.start = new Date(eventTime.start.getTime() - (eventTime.start.getTimezoneOffset() * 60000)).toISOString();
    
    this.end = new Date(eventTime.end.getTime() - (eventTime.end.getTimezoneOffset() * 60000)).toISOString();



    this.imgGallery = this.angularfireDatabase.list('/schedule/' + firebase.auth().currentUser.uid + '/' + this.event.id + '/album/');
    this.imgGallery.subscribe(imgGallery => {
        this.imgGalleryArray = imgGallery;
    })       


    //get scedule comment
    if(this.userId){
        
        // Get friend details.
        this.dataProvider.getUser(this.userId).subscribe((user) => {
          this.title = user.name;
        });
    
        // Get conversationInfo with friend.
        this.angularfireDatabase.object('/users/' + firebase.auth().currentUser.uid + '/schedule/' + this.event.id).subscribe((comment) => {
          if (comment.$exists() && comment.scheduleCommentId) {
            // User already have conversation with this friend, get conversation
            this.scheduleCommentId = comment.scheduleCommentId;

            console.log(this.scheduleCommentId);
            // Get conversation
            this.dataProvider.getScheduleCommentMessages(this.scheduleCommentId).subscribe((comments) => {
                this.unreadCommentsCount = comments.length - comment.commentsRead;
              if (this.comments) {
                // Just append newly added messages to the bottom of the view.
                if (comments.length > this.comments.length) {
                  let comment = comments[comments.length - 1];
                  this.dataProvider.getUser(comment.sender).subscribe((user) => {
                    comment.avatar = user.profileImg;
                  });
                  this.comments.push(comment);
                  // Also append to messagesToShow.
                  this.commentsToShow.push(comment);
                  // Reset scrollDirection to bottom.
                  this.scrollDirection = 'bottom';
                }
              } else {
                // Get all messages, this will be used as reference object for messagesToShow.
                this.comments = [];
                comments.forEach((comment) => {
                  this.dataProvider.getUser(comment.sender).subscribe((user) => {
                    comment.avatar = user.profileImg;
                  });
                  this.comments.push(comment);
                });
                // Load messages in relation to numOfMessages.
                if (this.startIndex == -1) {
                  // Get initial index for numberOfMessages to show.
                  if ((this.comments.length - this.numberOfComments) > 0) {
                    this.startIndex = this.comments.length - this.numberOfComments;
                  } else {
                    this.startIndex = 0;
                  }
                }
                if (!this.commentsToShow) {
                  this.commentsToShow = [];
                }
                // Set messagesToShow
                for (var i = this.startIndex; i < this.comments.length; i++) {
                  this.commentsToShow.push(this.comments[i]);
                }
                this.loadingProvider.hide();
              }
            });
          }
        });
    
        // Update messages' date time elapsed every minute based on Moment.js.
        var that = this;
        if (!that.updateDateTime) {
          that.updateDateTime = setInterval(function() {
            if (that.comments) {
              that.comments.forEach((comment) => {
                let date = comment.date;
                comment.date = new Date(date);
              });
            }
          }, 60000);
        }
    }
    }

    ionViewWillLeave(){
        if(JSON.stringify(this.event_slice) !== JSON.stringify(this.event)) {
           
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
    

      this.navCtrl.push('ScheduleDetailPage');
      
  }



  openGallery() {
    this.imageProvider.uploadSchedulePhoto(this.event);
    }

    openGallery2() {
        this.imageProvider.uploadPhoto(this.camera.PictureSourceType.PHOTOLIBRARY, this.event);
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

    scrollBottom() {
        var that = this;
        setTimeout(function() {
          that.content.scrollToBottom();
        }, 300);
      }


    pushComment() {
    if (this.comment) {
        // User entered a text on messagebox
        if (this.scheduleCommentId) {
        // Add Message to the existing conversation
        // Clone an instance of messages object so it will not directly be updated.
        // The messages object should be updated by our observer declared on ionViewDidLoad.
        let comments = JSON.parse(JSON.stringify(this.comments));
        comments.push({
            date: new Date().toString(),
            sender: firebase.auth().currentUser.uid,
            type: 'text',
            comment: this.comment
        });
        // Update conversation on database.
        this.dataProvider.getScheduleComment(this.scheduleCommentId).update({
            comments: comments
        });
        // Clear messagebox.
        this.comment = '';
        } else {
        // New Conversation with friend.
        var comments = [];
        comments.push({
            date: new Date().toString(),
            sender: firebase.auth().currentUser.uid,
            type: 'text',
            comment: this.comment
        });
        var users = [];
        users.push(firebase.auth().currentUser.uid);
        users.push(this.userId);
        // Add conversation.
        this.angularfireDatabase.list('scheduleComments').push({
            dateCreated: new Date().toString(),
            comments: comments,
            users: users
        }).then((success) => {
            let scheduleCommentId = success.key;
            
            this.comment = '';
            // Add conversation reference to the users.
            this.angularfireDatabase.object('/users/' + firebase.auth().currentUser.uid + '/schedule/' + this.event.id).update({
            scheduleCommentId: scheduleCommentId,
            commentsRead: 1
            });
            this.angularfireDatabase.object('/users/' + this.userId + '/schedule/' + this.event.id).update({
            scheduleCommentId: scheduleCommentId,
            commentsRead: 0
            });
        });
        }
        this.setMessagesRead();
    }
    }  


    setMessagesRead() {

        if (this.navCtrl.getActive().instance instanceof CalendarEventDetailPage && this.comments) {
          // Update user's messagesRead on database.
          var totalCommentsCount;
          this.dataProvider.getScheduleCommentMessages(this.scheduleCommentId).subscribe((comments) => {
            totalCommentsCount = comments.length;
          });
          this.angularfireDatabase.object('/users/' + firebase.auth().currentUser.uid + '/schedule/' + this.event.id).update({
            commentsRead: totalCommentsCount
          });
        }
      }

    isSender(comment) {
        if (comment.sender == firebase.auth().currentUser.uid) {
          return true;
        } else {
          return false;
        }
      }

    doScroll() {
    if (this.scrollDirection == 'bottom') {
        this.scrollBottom();
    } else if (this.scrollDirection == 'top') {
        this.scrollTop();
    }
    }

    scrollTop() {
    var that = this;
    setTimeout(function() {
        that.content.scrollToTop();
    }, 300);
    }

    onType(keyCode) {
    if (keyCode == 13) {
        this.keyboard.show();
        this.pushComment();
    }
    }


}