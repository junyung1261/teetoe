import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { DataProvider } from '../../../providers/data'
import { LoadingProvider } from '../../../providers/loading'
import * as firebase from 'firebase';

@IonicPage({
  
})

@Component({
  selector: 'page-home-mentor',
  templateUrl: 'home-mentor.html'
 
})


export class MentorHomePage {

  private class: any;
  private user;
  private testClass: any;
  private myClass: any;
  private actionButtons: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
               private modalCtrl: ModalController, public dataProvider: DataProvider,
                public actionSheetCtrl: ActionSheetController,
                public loadingProvider: LoadingProvider,) {
                  
     

                  this.dataProvider.getCurrentUser().subscribe((user) => {
                    this.user = user;
                  });
      
      
    }

  ionViewDidLoad(){
    
    
    if(this.user.class){
      this.loadingProvider.show();
      this.myClass = [];
      this.user.class.forEach( _class => {
        this.dataProvider.getClass(this.user.belong, _class).subscribe((_class) =>{
          if (_class) {
            
            
            this.addOrUpdateClass(_class);
            
          } else {
            this.myClass = [];
          }
        }) 
      });
      this.loadingProvider.hide();
     
      



    }
    
    
    
   
       //this.loadingProvider.hide();
     
  }

  addOrUpdateClass(_class) {
    if (!this.myClass) {
      this.myClass = [_class];
      this.myClass[i]  = {text: 'test', handler: ()=> { this.test2('vvv');}}
    } else {
      var index = -1;
      for (var i = 0; i < this.myClass.length; i++) {
        if (this.myClass[i].$key == _class.$key) {
          index = i;
        }
      }
      if (index > -1) {
        this.myClass[index] = _class;
      } else {
        this.myClass.push(_class);
      }
    }
    
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
    this.navCtrl.push('MenteeListPage');

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

  openTestPage(){
    this.navCtrl.push('AcademyAddPage');
  }

  
  test(){
    console.log(this.myClass);
    this.myClass.sort(function(a, b) {
      
            var c1 = b['course']
            var c2 = a['course']
            var g1 = a['grade']
            var g2 = b['grade']
            var l1 = a['label']
            var l2 = b['label']
            var n1 = a['name']
            var n2 = b['name']
            var s1 = a['school']
            var s2 = b['school']
           
            if (c1 < c2) return -1;
            if (c1 > c2) return 1;
            if (g1 < g2) return -1;
            if (g1 > g2) return 1;
            if (l1 < l2) return -1;
            if (l1 > l2) return 1;
            if (s1 < s2) return -1;
            if (s1 > s2) return 1;
            if (n1 < n2) return -1;
            if (n1 > n2) return 1;
             return 0;
           });

     
    this.initActionButtons();

    let actionSheet = this.actionSheetCtrl.create({
      title: '반 선택',
      buttons: this.actionButtons
    });
 
    actionSheet.present();

    

  }

  initActionButtons(){
    
    
    /*handler: () => {
      console.log('Destructive clicked');
    }*/
    
    this.actionButtons = [];
    
    this.myClass.forEach( _class =>{
        this.actionButtons.push({
          text: _class.grade + '학년 ' + _class.name,
          handler: () => {
            console.log(_class.name);
          }
        });
    });
   
    this.actionButtons.push({
      text: '반 관리',
      handler: () => {
        this.navCtrl.push('ClassPage', {user: this.user, myClass:this.myClass});
        console.log('Archive clicked');
      }
    },
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    });

    
  }

  test2(data){
    console.log(data);
  }
}