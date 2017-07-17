import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ModalController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable } from 'angularfire2/database';

import { CommunityProvider } from '../../providers/community/community';
import { UserProvider } from '../../providers/user/user';

import firebase from 'firebase/app';

@IonicPage()

@Component({
  selector: 'page-community',
  templateUrl: 'community.html',
  
})
export class CommunityPage {
  posts:any;
  userInput;
  feeds:any = [];
  constructor(private navController: NavController, private socialProvider: CommunityProvider, 
    private userProvider: UserProvider,private af: AngularFireAuth, private modalCtrl: ModalController) {
    this.userProvider.getUid()
    .then(uid => {
       firebase.database().ref(`/users/${uid}/feed`)
       .on('child_added', (snapshot) => {
         this.feeds.unshift({$key:snapshot.key, $value: snapshot.val()});
       });
    });
  }

  openPost() {
    let modal = this.modalCtrl.create('PostPageModal');
    modal.present();
  }
}