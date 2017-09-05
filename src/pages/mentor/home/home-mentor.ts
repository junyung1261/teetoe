import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams, ModalController } from 'ionic-angular';
import { DataProvider } from '../../../providers/data'

@IonicPage({
  
})

@Component({
  selector: 'page-home-mentor',
  templateUrl: 'home-mentor.html'
 
})


export class MentorHomePage {

 
  private user;
 
  constructor(public navCtrl: NavController, public navParams: NavParams,
               private modalCtrl: ModalController, public dataProvider: DataProvider) {
      this.dataProvider.getCurrentUser().subscribe((user) => {
        this.user = user;
      });           
     
    
    }

  

  onTabSelect(tab: { index: number; id: string; }) {
    console.log(`Selected tab: `, tab);
  }

  openNoticePage(){
    this.navCtrl.push('NoticePage');

  }

  openAttendancePage(){
    this.navCtrl.push('NoticePage');

  }

  openCalendarPage(){
    this.navCtrl.push('MentorCalendarPage');

  }

  openMenteeListPage(){
    this.navCtrl.push('NoticePage');

  }

  openChartPage(){
    this.navCtrl.push('NoticePage');

  }

  openQuestionPage(){
    this.navCtrl.push('NoticePage');

  }

  openParentsPage(){
    this.navCtrl.push('NoticePage');

  }

  

  
}