import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, IonicPage } from 'ionic-angular';
import { DataProvider } from '../../../providers/data';
import { FirebaseProvider } from '../../../providers/firebase';
import { AlertProvider } from '../../../providers/alert';
import { LoadingProvider } from '../../../providers/loading';
//import { UserInfoPage } from '../user-info/user-info';

@IonicPage()

@Component({
  selector: 'page-notice',
  templateUrl: 'notice-push.html'
})
export class PushNoticePage {
  private socialRequests: any;
  private friendRequests: any;
  private mentorRequests: any;
  private requestsSent: any;
  private alert: any;
  private account: any;
  // RequestsPage
  // This is the page where the user can see their friend requests sent and received.
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider, public alertCtrl: AlertController,
    public loadingProvider: LoadingProvider, public alertProvider: AlertProvider, public firebaseProvider: FirebaseProvider) { }

  ionViewDidLoad() {
    this.loadingProvider.show();
    // Get user info
    this.dataProvider.getCurrentUser().subscribe((account) => {
      this.account = account;
      // Get friendRequests and requestsSent of the user.
      this.dataProvider.getRequests(this.account.$key).subscribe((requests) => {
        // friendRequests.
        if (requests.socialRequests) {
          this.socialRequests = [];
          requests.socialRequests.forEach((user) => {
            this.dataProvider.getUser(user.from).subscribe((sender) => {
              this.addOrUpdateSocialRequest(sender, user.meta);
             
            });
          });
        } else {
          this.socialRequests = [];
        }
        // requestsSent.
        /*if (requests.requestsSent) {
          this.requestsSent = [];
          requests.requestsSent.forEach((userId) => {
            this.dataProvider.getUser(userId).subscribe((receiver) => {
              this.addOrUpdateRequestSent(receiver);
            });
          });
        } else {
          this.requestsSent = [];
        } */
        
        this.loadingProvider.hide();
        
      });
    });
    
  }

  // Add or update friend request only if not yet friends.
  addOrUpdateSocialRequest(sender, meta) {
    
    if (!this.socialRequests) {
      this.socialRequests = [sender];
      this.socialRequests.meta = meta;
    } else {
      var index = -1;
      for (var i = 0; i < this.socialRequests.length; i++) {
        if (this.socialRequests[i].$key == sender.$key) {
          index = i;
        }
      }
      if (index > -1) {
        if (!this.isFriends(sender.$key) && !this.isMatched(sender.$key))
          this.socialRequests[index] = sender;
           this.socialRequests[index].meta = meta;
      } else {
        if (!this.isFriends(sender.$key) && !this.isMatched(sender.$key))
         
          var data = sender;
          data.meta = meta;
          this.socialRequests.push(data);
      }
    }
  }


  // Add or update requests sent only if the user is not yet a friend.
  addOrUpdateRequestSent(receiver) {
    if (!this.requestsSent) {
      this.requestsSent = [receiver];
    } else {
      var index = -1;
      for (var i = 0; i < this.requestsSent.length; i++) {
        if (this.requestsSent[i].$key == receiver.$key) {
          //console.log(this.requestsSent[i].$key);
          index = i;
        }
      }
      if (index > -1) {
        if (!this.isFriends(receiver.$key) && !this.isMatched(receiver.$key))
          this.requestsSent[index] = receiver;
      } else {
        if (!this.isFriends(receiver.$key) && !this.isMatched(receiver.$key))
          this.requestsSent.push(receiver);
      }
    }
  }

  // Back
  back() {
    this.navCtrl.pop();
  }

  // Accept Friend Request.
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
            if(user.meta === 'friend') this.firebaseProvider.deleteFriendRequest(user.$key);
            else this.firebaseProvider.deleteMentorRequest(user.$key);
          }
        },
        {
          text: 'Accept Request',
          handler: () => {
             if(user.meta === 'friend') this.firebaseProvider.acceptFriendRequest(user.$key);
             else this.firebaseProvider.acceptMentorRequest(user.$key);
           
          }
        }
      ]
    }).present();
  }

  // Cancel Friend Request sent.
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
            if(user.meta === 'friend') this.firebaseProvider.cancelFriendRequest(user.$key);
            else this.firebaseProvider.cancelMentorRequest(user.$key);
            
          }
        }
      ]
    }).present();
  }

  // Checks if user is already friends with this user.
  isFriends(userId) {
    if (this.account.friends) {
      if (this.account.friends.indexOf(userId) == -1) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  isMatched(userId) {
    if (this.account.mentees) {
      if (this.account.mentees.indexOf(userId) == -1) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  // View user.
  viewUser(userId) {
    //this.navCtrl.push(UserInfoPage, { userId: userId });
  }

}
