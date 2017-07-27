import {Component} from '@angular/core';
import { NavController, NavParams, IonicPage, ModalController } from 'ionic-angular';
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
  users;
  uid;
  followersObservable:FirebaseListObservable<any>;
  followers;
  constructor(private navController: NavController, 
              private userProvider:UserProvider,
              private communityProvider: CommunityProvider,
              private util: UtilProvider) {
    this.userProvider.getUid()
    .then(uid => {
      this.uid = uid;
    });
    this.users = this.userProvider.searchUser("");
  }

  getUser(ev) {
    let username = ev.target.value;
    this.users = this.userProvider.searchUser(username);
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