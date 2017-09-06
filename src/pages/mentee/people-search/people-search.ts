import {Component} from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable } from 'angularfire2/database';
import { CommunityProvider } from '../../../providers/community/community';
import { UserProvider } from '../../../providers/user/user';
import { UtilProvider } from '../../../providers/util/util';
import { DataProvider } from '../../../providers/data';
import { LoadingProvider } from '../../../providers/loading';
import { AlertProvider } from '../../../providers/alert';
import { FirebaseProvider } from '../../../providers/firebase';
import * as firebase from 'firebase';

@IonicPage()


@Component({
  selector: 'page-people-search',
  templateUrl: 'people-search.html'
})
export class PeopleSearchPage {
  private accounts: any;
  private alert: any;
  private account: any;
  private excludedIds: any;
  private requestsSent: any;
  private socialRequests: any;
  private searchUser: any;

  uid;
  peopleView: string;
  followersObservable:FirebaseListObservable<any>;
  followers;
  nowUser;
  myFriends
  userArray : any=[]; 
  userList : any=[]; // store firebase data to local array
  loadedUserList:  any=[]; 
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public dataProvider: DataProvider, 
              public loadingProvider: LoadingProvider,
              public alertCtrl: AlertController, 
              public alertProvider: AlertProvider, 
              public firebaseProvider: FirebaseProvider) {
    
    
    /*this.users = this.userProvider.getUser();
    this.users.subscribe(user => {
     
      this.userArray = user;
      this.userList = this.userArray; // for ngFor loop 
      this.loadedUserList = this.userArray; 
            
    });*/
    
    
  }

ionViewDidLoad() {
    // Initialize
    this.loadingProvider.show();
    this.searchUser = '';
    // Get all users.
    this.dataProvider.getUsers().subscribe((accounts) => {
      this.loadingProvider.hide();
      this.accounts = accounts;
      this.dataProvider.getCurrentUser().subscribe((account) => {
        // Add own userId as exludedIds.
        this.excludedIds = [];
        this.account = account;
        if (this.excludedIds.indexOf(account.$key) == -1) {
          this.excludedIds.push(account.$key);
        }
        // Get friends which will be filtered out from the list using searchFilter pipe pipes/search.ts.
        if (account.friends) {
          account.friends.forEach(friend => {
            if (this.excludedIds.indexOf(friend) == -1) {
              this.excludedIds.push(friend);
            }
          });
        }
        if (account.mentors){
          account.mentors.forEach(mentor => {
            if (this.excludedIds.indexOf(mentor) == -1) {
              this.excludedIds.push(mentor);
            }
          });
        }
        // Get requests of the currentUser.
        this.dataProvider.getRequests(account.$key).subscribe((requests) => {
          this.requestsSent = requests.requestsSent;
          this.socialRequests = requests.socialRequests;
        });
      });
    });
  }



  getUsers(searchbar) {
    
    // Reset items back to all of the items
    
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
    // if the value is an empty string don't filter the items
    this.searchUser = this.dataProvider.getUserWithUserId(q);
    this.searchUser.subscribe(user => {
      this.userArray = user;
      this.userList = this.userArray;
    });

     
    

  }

  

  
  userProfile(user) {
    console.log(user);
    this.navCtrl.push('UserProfilePage', {uid:user.$key});
  }

  getStatus(user) {
    // Returns:
    // 0 when user can be requested as friend.
    // 1 when a friend request was already sent to this user.
    // 2 when this user has a pending friend request.
    if (this.requestsSent) {
      for (var i = 0; i < this.requestsSent.length; i++) {
        if (this.requestsSent[i] == user.$key) {
          return 1;
        }
      }
    }
    if (this.socialRequests) {
      for (var i = 0; i < this.socialRequests.length; i++) {
        if (this.socialRequests[i].from == user.$key) {
          return 2;
        }
      }
    }
    return 0;
  }

  // Send friend request.
  sendFriendRequest(user) {
    this.alert = this.alertCtrl.create({
      title: 'Send Friend Request',
      message: 'Do you want to send friend request to <b>' + user.name + '</b>?',
      buttons: [
        {
          text: 'Cancel',
          handler: data => { }
        },
        {
          text: 'Send',
          handler: () => {
            this.firebaseProvider.sendFriendRequest(user.$key);
          }
        }
      ]
    }).present();
  }

  // Cancel friend request sent.
  cancelFriendRequest(user) {
    this.alert = this.alertCtrl.create({
      title: 'Friend Request Pending',
      message: 'Do you want to delete your friend request to <b>' + user.name + '</b>?',
      buttons: [
        {
          text: 'Cancel',
          handler: data => { }
        },
        {
          text: 'Delete',
          handler: () => {
            this.firebaseProvider.cancelFriendRequest(user.$key);
          }
        }
      ]
    }).present();
  }

  // Accept friend request.
  acceptFriendRequest(user) {
    this.alert = this.alertCtrl.create({
      title: 'Confirm Friend Request',
      message: 'Do you want to accept <b>' + user.name + '</b> as your friend?',
      buttons: [
        {
          text: 'Cancel',
          handler: data => { }
        },
        {
          text: 'Reject Request',
          handler: () => {
            this.firebaseProvider.deleteFriendRequest(user.$key);
          }
        },
        {
          text: 'Accept Request',
          handler: () => {
            this.firebaseProvider.acceptFriendRequest(user.$key);
          }
        }
      ]
    }).present();
  }

  sendMentorRequest(user) {
    this.alert = this.alertCtrl.create({
      title: 'Send Mentor Request',
      message: 'Do you want to send Mentor request to <b>' + user.name + '</b>?',
      buttons: [
        {
          text: 'Cancel',
          handler: data => { }
        },
        {
          text: 'Send',
          handler: () => {
            this.firebaseProvider.sendMentorRequest(user.$key);
          }
        }
      ]
    }).present();
  }

  // Cancel friend request sent.
  cancelMentorRequest(user) {
    this.alert = this.alertCtrl.create({
      title: 'Mentor Request Pending',
      message: 'Do you want to delete your Mentor request to <b>' + user.name + '</b>?',
      buttons: [
        {
          text: 'Cancel',
          handler: data => { }
        },
        {
          text: 'Delete',
          handler: () => {
            this.firebaseProvider.cancelMentorRequest(user.$key);
          }
        }
      ]
    }).present();
  }

  // Accept friend request.
  acceptMentorRequest(user) {
    this.alert = this.alertCtrl.create({
      title: 'Confirm Mentor Request',
      message: 'Do you want to accept <b>' + user.name + '</b> as your Mentee?',
      buttons: [
        {
          text: 'Cancel',
          handler: data => { }
        },
        {
          text: 'Reject Request',
          handler: () => {
            this.firebaseProvider.deleteMentorRequest(user.$key);
          }
        },
        {
          text: 'Accept Request',
          handler: () => {
            this.firebaseProvider.acceptMentorRequest(user.$key);
          }
        }
      ]
    }).present();
  }
}