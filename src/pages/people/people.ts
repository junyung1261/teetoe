import {Component} from '@angular/core';
import { NavController, NavParams, IonicPage, ModalController, ViewController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable } from 'angularfire2/database';
import { CommunityProvider } from '../../providers/community/community';
import { UserProvider } from '../../providers/user/user';
import { UtilProvider } from '../../providers/util/util';


@IonicPage()


@Component({
  selector: 'page-people',
  templateUrl: 'people.html'
})
export class PeoplePage {
  users: FirebaseListObservable<any[]>;;
  uid;
  followersObservable:FirebaseListObservable<any>;
  followers;
  nowUser;
  userArray : any=[]; 
  userList : any=[]; // store firebase data to local array
  loadedUserList:  any=[]; 
  constructor(private navController: NavController,
              private viewController: ViewController,
              private userProvider:UserProvider,
              private communityProvider: CommunityProvider,
              private util: UtilProvider) {
    this.userProvider.getUid()
    .then(uid => {
      this.uid = uid;
      this.nowUser = this.userProvider.whoAmI(uid);
    });
    this.users = this.userProvider.getUser();
    this.users.subscribe(user => {
     
      this.userArray = user;
      this.userList = this.userArray; // for ngFor loop 
      this.loadedUserList = this.userArray; 
            
    });
    
    
  }


  initializeItems(){
    this.userList = this.loadedUserList;
  }

  getUsers(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
    this.userList = this.userList.filter((v) => {
      if(v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.userList.length);

  }

  

  followUser(user) {
    this.communityProvider.followUser(user)
    .then(()=> {
      let toast = this.util.getToast("You are now following " + user.name);
      toast.present();
    });
  }
  userProfile(user) {
    console.log(user);
    this.navController.push('UserProfilePage', {uid:user.$key});
  }
}