import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ModalController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

import { CommunityProvider } from '../../../providers/community/community';
import { UserProvider } from '../../../providers/user/user';

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
  limit:number;
  communityView: string = "free";
  constructor(private navCtrl: NavController, private socialProvider: CommunityProvider, 
              private userProvider: UserProvider,private af: AngularFireAuth, 
              private modalCtrl: ModalController, private afDB: AngularFireDatabase) {
    
    this.onIntialize();
   
       
 

    /* this.itemRef = firebase.database().ref('/posts'); // or however you mark time
        this.itemRef.on('value', itemList => {
          let items = [];
          itemList.forEach( item => {
            items.unshift({$key:item.key, $value: item.val()});
            return false;
          });

          this.feeds = items;
          

        });*/



    /*this.feeds = <FirebaseListObservable<any[]>> afDB.list('/posts').map((feeds) => {
          return feeds.map((feeds) => {
              //feeds.images = afDB.list('/feed/'+feeds.$key+'/images')
              return feeds                      
          })
     
      })
    */

   
  }

  onIntialize(){
     this.limit=5;
     firebase.database().ref(`/posts`).limitToLast(this.limit)
       .once('value', (snapshot) => {
        let items = [];
         snapshot.forEach( feed => {
          items.unshift({$key:feed.key, $value: feed.val()});
          return false;
         });
          this.feeds = items;
       });
  }

  onInfiniteScroll(infiniteScroll) {

    
        this.limit += 5; // or however many more you want to load
        firebase.database().ref(`/posts`).limitToLast(this.limit)
       .once('value', (snapshot) => {
         let items = [];
         snapshot.forEach( feed => {
          items.unshift({$key:feed.key, $value: feed.val()});
          return false;
         });
          this.feeds = items;
          
          setTimeout(() => {
          console.log('Async operation has ended');
          infiniteScroll.complete();
          }, 500);

       });
    }

  doRefresh(refresher, segmentView){
    this.limit = 5;
    firebase.database().ref(`/posts`).limitToLast(this.limit)
       .once('value', (snapshot) => {
         snapshot.forEach( feed => {
          this.feeds.unshift({$key:feed.key, $value: feed.val()});
          console.log(feed.key, feed.val());
          return false;
         });
       });
       
      
     setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }


  openPost() {
    let modal = this.modalCtrl.create('PostPageModal');
    modal.onDidDismiss(data =>{
        
        if(data.value) this.onIntialize();
    });
    modal.present()
    
  }
}