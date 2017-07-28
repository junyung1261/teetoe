import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ModalController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

import { CommunityProvider } from '../../providers/community/community';
import { UserProvider } from '../../providers/user/user';

import firebase from 'firebase/app';

@IonicPage()

@Component({
  selector: 'page-community',
  templateUrl: 'community.html'
  
})
export class CommunityPage {
  posts:any;
  userInput;
  feeds:any = [];
  communityView: string = "free";
  constructor(private navCtrl: NavController, private socialProvider: CommunityProvider, 
              private userProvider: UserProvider,private af: AngularFireAuth, 
              private modalCtrl: ModalController, private afDB: AngularFireDatabase) {
    
    this.userProvider.getUid()
    .then(uid => {
       firebase.database().ref(`posts`)
       .on('child_added', (snapshot) => {
         this.feeds.unshift({$key:snapshot.key, $value: snapshot.val()});
         console.log(snapshot.key, snapshot.val());
       });
    });

    

    /*this.feeds = <FirebaseListObservable<any[]>> afDB.list('/posts').map((feeds) => {
          return feeds.map((feeds) => {
              //feeds.images = afDB.list('/feed/'+feeds.$key+'/images')
              return feeds                      
          })
     
      })
    */

   
  }

  openPost() {
    let modal = this.modalCtrl.create('PostPageModal');
    modal.present();
  }
}