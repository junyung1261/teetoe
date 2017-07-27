import {Component} from '@angular/core';
import {NavController, ActionSheet, NavParams, IonicPage} from 'ionic-angular';
import { CommunityProvider } from '../../providers/community/community';
import { UserProvider } from '../../providers/user/user';
import { UtilProvider } from '../../providers/util/util';



@IonicPage()

@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html'
})
export class UserProfilePage {
  user = {};
  profile = {};
  uid:String;
  constructor(private navController: NavController,  private util: UtilProvider, private params: NavParams, private communityProvider: CommunityProvider) {
      this.uid = params.get('uid');
      console.log(this.uid);
      this.communityProvider.getUser(this.uid)
      .subscribe(user => {
        this.user = user;
      });
  }

  followUser(user) {
       this.communityProvider.followUser(user);
  }

}