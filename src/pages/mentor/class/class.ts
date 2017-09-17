import { Component, ViewChild } from '@angular/core';
import { ViewController, NavController, ActionSheetController, IonicPage, NavParams, Content } from 'ionic-angular';

import { EventProvider } from '../../../providers/event/event'
import { DataProvider } from '../../../providers/data';
import { LoadingProvider } from '../../../providers/loading'
import * as firebase from 'firebase';



@IonicPage()

@Component({
    selector: 'page-class',
    templateUrl: 'class.html',
    
})
export class ClassPage {
   

    private friends: any;
    private mentors: any;
    private user: any;
    private friendRequests: any;
    private searchFriend: any;
    private nowUser: any;
    private peopleView: string;
    private status;
    private myClass: any;
    
    constructor(public navCtrl: NavController, 
                public navParams: NavParams, 
                
                public dataProvider: DataProvider,
                public loadingProvider: LoadingProvider) {
     
      this.peopleView = 'mentee';
     
      
    }
  
  
    ionViewDidLoad() {
      this.user = this.navParams.get('user');
      this.myClass = this.navParams.get('myClass');
     
      // Initialize
      this.searchFriend = '';
    //this.loadingProvider.show();
  
      // Get user data on database and get list of friends.
      
    
      
     
      
    }
  
   

    
      
       
       
  
  
    searchInit(){
      this.searchFriend='';
    }
    openClassAddPage(){
      this.navCtrl.push('ClassAddPage', {user: this.user, myClass: this.myClass});
    }
  
    userProfile(user) {
      
      this.navCtrl.push('UserProfilePage', {uid:user.$key});
    }

    
   
  


  
}