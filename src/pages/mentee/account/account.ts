import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth/auth';
import { UtilProvider } from '../../../providers/util/util';
import { UserProvider } from '../../../providers/user/user';
import { CommunityProvider } from '../../../providers/community/community';
import { AlertProvider } from '../../../providers/alert';
import { ImageProvider } from '../../../providers/image';
import { DataProvider } from '../../../providers/data';
import { LoadingProvider } from '../../../providers/loading';
import { LogoutProvider } from '../../../providers/logout';
import { Validator } from '../../../validator';
import { AngularFireDatabase } from 'angularfire2/database';
import { Keyboard } from '@ionic-native/keyboard';

import * as firebase from 'firebase';
import { Camera } from '@ionic-native/camera';
import { IonicImageViewerModule } from 'ionic-img-viewer';


@IonicPage()

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  
  private user: any;
  private alert;
  
  constructor(  public navCtrl: NavController, public alertCtrl: AlertController,
                public logoutProvider: LogoutProvider, public loadingProvider: LoadingProvider, 
                public imageProvider: ImageProvider, public angularfireDatabase: AngularFireDatabase, 
                public alertProvider: AlertProvider, public dataProvider: DataProvider, public camera: Camera,
                public userProvider: UserProvider, public keyboard: Keyboard) {
    
     
  }


  ionViewDidLoad() {
    // Observe the userData on database to be used by our markup html.
    // Whenever the userData on the database is updated, it will automatically reflect on our user variable.
    this.loadingProvider.show();
    this.dataProvider.getCurrentUser().subscribe((user) => {
      this.loadingProvider.hide();
      this.user = user;
      console.log(this.user);
    });
  }

  logout() {
    this.alert = this.alertCtrl.create({
      title: 'Confirm Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Logout',
          handler: data => { this.logoutProvider.logout(); }
        }
      ]
    }).present();
  }

  setPhoto() {
    // Ask if the user wants to take a photo or choose from photo gallery.
    this.alert = this.alertCtrl.create({
      title: 'Set Profile Photo',
      message: 'Do you want to take a photo or choose from your photo gallery?',
      buttons: [
        {
          text: 'Cancel',
          handler: data => { }
        },
        {
          text: 'Choose from Gallery',
          handler: () => {
            // Call imageProvider to process, upload, and update user photo.
            this.imageProvider.setProfilePhoto(this.user, this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Take Photo',
          handler: () => {
            // Call imageProvider to process, upload, and update user photo.
            this.imageProvider.setProfilePhoto(this.user, this.camera.PictureSourceType.CAMERA);
          }
        }
      ]
    }).present();
  }


  setUserId() {
    
    let alert = this.alertCtrl.create({
      
      title: 'Change Userid',
      message: "Please enter a new userid.",
      inputs: [
        {
          name: 'userid',
          placeholder: 'Your UserId'          
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => { }
        },
        {
          text: 'Save',
          handler: data => {
            let userid = data["userid"];
            
            // Check if entered username is different from the current username
            if (this.user.id != userid) {
              if (userid.length >= Validator.userIdValidator.minLength) {
                // Check if name contains characters and numbers only.
                if (Validator.userIdValidator.pattern.test(userid)) {
                  
                  this.dataProvider.getUserWithUserId(userid).take(1).subscribe((userList) => {
                    if (userList.length > 0) {
                      this.alertProvider.showErrorMessage('profile/error-same-userid');
                    } else {
                      this.angularfireDatabase.object('/users/' + this.user.$key).update({
                        id: userid
                      }).then((success) => {
                        this.alertProvider.showProfileUpdatedMessage();
                      }).catch((error) => {
                        this.alertProvider.showErrorMessage('profile/error-update-profile');
                      });
                    }
                  });
                }else {
                  this.alertProvider.showErrorMessage('profile/invalid-chars-name');
                }
              }else {
                this.alertProvider.showErrorMessage('profile/name-too-short');
              }
            }
          }
        }
      ]
    });
    alert.present({keyboardClose: false});
    
  }

  setName() {
    
    let alert = this.alertCtrl.create({
      title: 'Change Profile Name',
      message: "Please enter a new profile name.",
      inputs: [
        {
          name: 'name',
          placeholder: 'Your Name',
          value: this.user.name
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => { }
        },
        {
          text: 'Save',
          handler: data => {
            let name = data["name"];
            // Check if entered name is different from the current name
            if (this.user.name != name) {
              // Check if name's length is more than five characters
              if (name.length <= Validator.profileNameValidator.maxLength) {
                // Check if name contains characters and numbers only.
                if (Validator.profileNameValidator.pattern.test(name)) {
                  this.loadingProvider.show();
                  let profile = {
                    displayName: name,
                    photoURL: this.user.photoURL
                  };
                  // Update profile on Firebase
                  firebase.auth().currentUser.updateProfile(profile)
                    .then((success) => {
                      // Update userData on Database.
                      this.angularfireDatabase.object('/users/' + this.user.$key).update({
                        name: name
                      }).then((success) => {
                        Validator.profileNameValidator.pattern.test(name); //Refresh validator
                        this.alertProvider.showProfileUpdatedMessage();
                      }).catch((error) => {
                        this.alertProvider.showErrorMessage('profile/error-update-profile');
                      });
                    })
                    .catch((error) => {
                      // Show error
                      this.loadingProvider.hide();
                      let code = error["code"];
                      this.alertProvider.showErrorMessage(code);
                      if (code == 'auth/requires-recent-login') {
                        this.logoutProvider.logout();
                      }
                    });
                } else {
                  this.alertProvider.showErrorMessage('profile/invalid-chars-name');
                }
              } else {
                this.alertProvider.showErrorMessage('profile/name-too-short');
              }
            }
          }
        }
      ]
    });
    alert.present({keyboardClose: false});
  }
  /*updateProfile() {
    let toast = this.util.getToast("Your Profile is updated");
    this.userProvider.updateProfile({name: this.user['name'], about: this.user['about']})
    .then(()=> {
      toast.present();
    });
  }
*/
  createUserId(id: string){
    this.userProvider.claimUsername(id);
  }
}