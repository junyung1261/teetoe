import { Component, ViewChild } from '@angular/core';
import { ViewController, NavController, ActionSheetController, IonicPage, NavParams, Content } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

import { EventProvider } from '../../../providers/event/event'
import { DataProvider } from '../../../providers/data';
import { LoadingProvider } from '../../../providers/loading'
import * as firebase from 'firebase';



@IonicPage()

@Component({
    selector: 'page-academy-add',
    templateUrl: 'academy-add.html',
    
})
export class AcademyAddPage {
   

    private friends: any;
    private mentors: any;
    
    private friendRequests: any;
    private searchFriend: any;
    private nowUser: any;
    private peopleView: string;
    private status;
    
    constructor(public navCtrl: NavController, 
                public navParams: NavParams, 
                
                public dataProvider: DataProvider,
                public loadingProvider: LoadingProvider,
                public angularfireDatabase: AngularFireDatabase) {
     
      this.peopleView = 'mentee';
     
     
      
    }
  
  
    ionViewDidLoad() {
      // Initialize
      this.searchFriend = '';
      //this.loadingProvider.show();
  
      // Get user data on database and get list of friends.
     
  
    }
  
  
    addAcademy(){
        
        
        // Add conversation.
        this.angularfireDatabase.list('academy').push({
          dateCreated: new Date().toString(),
          
          name: '청솔학원',
          location: '서울시 동작구 상도동 어디어디'
        }).then(success => {
            
        var classes;
        classes=[{
          course: 'high',
          grade:'1',
          name:'수학선행반'
        },
        {
            course: 'high',
            grade:'2',
            name:'영어심화반'
          },
          {
            course: 'high',
            grade:'3',
            name:'서울대준비반'
          },
          {
            course: 'high',
            grade:'2',
            name:'국어반'
          }];
        classes.forEach(data => {
            this.angularfireDatabase.list('academy/'+success.key +'/class').push(data);
            
        });
        
        })
    }

    addClass(){

    }
    
  
  
    searchInit(){
      this.searchFriend='';
    }
    searchUser(){
      this.navCtrl.push('PeopleSearchPage');
    }
  
    userProfile(user) {
      console.log(user);
      this.navCtrl.push('UserProfilePage', {uid:user.$key});
    }
}