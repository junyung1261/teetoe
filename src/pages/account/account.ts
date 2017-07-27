import { Component } from '@angular/core';
import { IonicPage, NavController, ActionSheetController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { UtilProvider } from '../../providers/util/util';
import { UserProvider } from '../../providers/user/user';
import { CommunityProvider } from '../../providers/community/community';



@IonicPage()

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  user = {};
  profile:Object = {};
  constructor(  private navController: NavController, 
                private Auth:AuthProvider, 
                private util: UtilProvider, 
                private userProvider: UserProvider,
                private communityProvider: CommunityProvider,
                private actionSheetCtrl: ActionSheetController) {
    this.userProvider.getUid()
    .then(uid => {
      this.communityProvider.getUser(uid)
      .subscribe(user => {
        this.user = user;
      });
    });
  }

  logout() {
    this.Auth.signOutUser();
  }

  updatePicture() {
    this.presentPictureSource()
    .then(source => {
      let sourceType:number = Number(source);
      return this.util.getPicture(sourceType);
    })
    .then(imageData => {
      var blobImage = this.util.dataURItoBlob(imageData);
      return this.userProvider.uploadImage(blobImage);
    })
    .then(imageURL => {
      return this.userProvider.updateProfile({avatar: imageURL});
    })
    .then(()=> {
      let toast = this.util.getToast('Your Picture is updated');
      toast.present();
    });
  }

  presentPictureSource() {
    let promise = new Promise((res, rej) => {
        let actionSheet = this.actionSheetCtrl.create({
          title: 'Select Picture Source',
          buttons: [
            { text: 'Camera', handler: () => { res(1); } },
            { text: 'Gallery', handler: () => { res(0); } },
            { text: 'Cancel', role: 'cancel', handler: () => { rej('cancel'); } }
          ]
        });
        actionSheet.present();
    });
    return promise;
  }

  updateProfile() {
    let toast = this.util.getToast("Your Profile is updated");
    this.userProvider.updateProfile({name: this.user['name'], about: this.user['about']})
    .then(()=> {
      toast.present();
    });
  }
}