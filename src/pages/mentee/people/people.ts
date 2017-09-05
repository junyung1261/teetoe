import {Component} from '@angular/core';
import { NavController, NavParams, IonicPage, ModalController, App } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable } from 'angularfire2/database';
import { CommunityProvider } from '../../../providers/community/community';
import { UserProvider } from '../../../providers/user/user';
import { UtilProvider } from '../../../providers/util/util';
import { DataProvider } from '../../../providers/data';
import { LoadingProvider } from '../../../providers/loading';
import * as firebase from 'firebase';

@IonicPage()


@Component({
  selector: 'page-people',
  templateUrl: 'people.html'
})
export class PeoplePage {
  private friends: any;
  private mentors: any;
  private mentees: any;
  private friendRequests: any;
  private searchFriend: any;
  private nowUser: any;
  private peopleView: string;
  private status;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public app: App, 
              public dataProvider: DataProvider,
              public loadingProvider: LoadingProvider) {
   
    this.peopleView = 'friend';
   
   
    this.nowUser = this.dataProvider.getCurrentUser().subscribe((user) => {
        this.status = user.isMentee;
      
    });
      
    
  }


  ionViewDidLoad() {
    // Initialize
    this.searchFriend = '';
    //this.loadingProvider.show();

    // Get friendRequests to show friendRequests count.
    this.dataProvider.getRequests(firebase.auth().currentUser.uid).subscribe((requests) => {
      this.friendRequests = requests.friendRequests;
    });

    // Get user data on database and get list of friends.
    this.dataProvider.getCurrentUser().subscribe((user) => {
      if (user.friends) {
        for (var i = 0; i < user.friends.length; i++) {
          this.dataProvider.getUser(user.friends[i]).subscribe((friend) => {
            this.addOrUpdateFriend(friend);
          });
        }
      } else {
        this.friends = [];
      }

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
      } else{
         
         if (user.mentees) {
          for (var i = 0; i < user.mentees.length; i++) {
            this.dataProvider.getUser(user.mentees[i]).subscribe((mentees) => {
              this.addOrUpdateMentee(mentees);
            });
          }
        } else {
          this.mentees = [];
        }
      }
      //this.loadingProvider.hide();
    });

  }


addOrUpdateFriend(friend) {
    if (!this.friends) {
      this.friends = [friend];
    } else {
      var index = -1;
      for (var i = 0; i < this.friends.length; i++) {
        if (this.friends[i].$key == friend.$key) {
          index = i;
        }
      }
      if (index > -1) {
        this.friends[index] = friend;
      } else {
        this.friends.push(friend);
      }
    }
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

  addOrUpdateMentee(mentee) {
    if (!this.mentees) {
      this.mentees = [mentee];
    } else {
      var index = -1;
      for (var i = 0; i < this.mentees.length; i++) {
        if (this.mentees[i].$key == mentee.$key) {
          index = i;
        }
      }
      if (index > -1) {
        this.mentees[index] = mentee;
      } else {
        this.mentees.push(mentee);
      }
    }
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