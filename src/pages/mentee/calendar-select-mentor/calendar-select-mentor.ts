import { Component, ViewChild } from '@angular/core';
import { ViewController, NavController, ActionSheetController, IonicPage, NavParams, Content } from 'ionic-angular';

import { EventProvider } from '../../../providers/event/event'
import { DataProvider } from '../../../providers/data';





@IonicPage()

@Component({
    selector: 'page-calendar-select-mentor',
    templateUrl: 'calendar-select-mentor.html',
    
})
export class CalendarSelectMentorModal {
   

    private event: any;
    private mentors: any;
    private nowUser: any;
    private selectMentor: any;


    constructor(
        private viewCtrl:ViewController, 
        private navCtrl: NavController, 
       
        private actionSheetCtrl: ActionSheetController,
  
        private navParams: NavParams,
        private eventProvider: EventProvider,
        private dataProvider: DataProvider
        ) {

        
        //console.log(this.event);
        
         
    
    }

   
    ionViewWillEnter() {
        this.event = this.navParams.get('event');
        if(this.event.mentor) {
            console.log(this.event.mentor);
            this.dataProvider.getUser(this.event.mentor.mentorID).subscribe( user => {
                this.selectMentor = user;
            });
        }

        this.dataProvider.getCurrentUser().subscribe((user) => {
                    this.nowUser = user;
                    if(user.isMentee === 'mentee') {
                    
                    if (user.mentors) {
                    for (var i = 0; i < user.mentors.length; i++) {
                        this.dataProvider.getUser(user.mentors[i]).subscribe((mentors) => {
                        this.addOrUpdateMentor(mentors);
                        
                        });
                    }
                    } else {
                    this.mentors = [];
                    }
                }
            });
          
    }

    ionViewWillLeave(){
        
            //this.eventProvider.updateEvent(this.event);
        
        
    }
    
    choseOne(mentor){
        this.selectMentor = mentor;
        
    }

    submitMentor(){
        if(this.selectMentor != null) this.event.mentor = {mentorID: this.selectMentor.$key, avatar: this.selectMentor.profileImg};
        else this.event.mentor = null;
        console.log(this.event);
        this.eventProvider.selectMentor(this.event);
        
        this.viewCtrl.dismiss();
    }
    
    addOrUpdateMentor(mentor) {
        if (!this.mentors) {
        this.mentors = [mentor];
        } else {
        var index = -1;
        for (var i = 0; i < this.mentors.length; i++) {
            if (this.mentors[i].$key == mentor.$key) {
            index = i;
            }
        }
        if (index > -1) {
            this.mentors[index] = mentor;
        } else {
            this.mentors.push(mentor);
        }
        }
    }
}