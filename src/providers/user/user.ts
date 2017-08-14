import { Injectable, Inject } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { AngularFireAuth  } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase/app';

@Injectable()
export class UserProvider {
  public userProfileRef:firebase.database.Reference;
  public userIdLookUpRef:firebase.database.Reference;
  public rootRef:firebase.database.Reference;
  public nowUser;
  constructor(public afAuth: AngularFireAuth, 
            public storage: Storage, 
            public afDB: AngularFireDatabase, 
            public toastCtrl: ToastController) { 

    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        this.rootRef = firebase.database().ref();
        this.userProfileRef = firebase.database().ref(`users/${user.uid}`);
        this.userIdLookUpRef = firebase.database().ref(`userid_lookeup`);
        this.nowUser = user;
      }
    });

  }


  
createToast(message: string) {
    return this.toastCtrl.create({
      message,
      duration: 3000
    })
  }



  saveUser(userData){
      this.storage.set('userInfo',JSON.stringify(userData));
  }


  getUid(){
      let promise = new Promise((res,rej)=>{
          this.storage.get('usesrInfo')
          .then(value => {
              let uid = this.afAuth.auth.currentUser.uid;
              console.log(uid);
              res(uid);
          });
      })
        return promise;

  }

  createUser(userData){
      return this.getUid()
      .then(uid => {
          let url = `/users/${uid}`;
          let user = this.afDB.object(url);
          return user.set(userData);
      });
  }

  updateProfile(obj){
      return this.getUid()
      .then(uid => {
          return this.afDB.object(`users/${uid}/`).update(obj);
      });
  }
  
  

claimUsername(userId) {
    let toast1 = this.createToast("이미 존재하는 ID입니다.");
    let toast2 = this.createToast("ID가 생성되었습니다!");
    let uid = this.nowUser.uid;
    this.userProfileRef.update({id: userId}, function(err) {
        if( err ) { 
            console.log(err);
            toast1.present();
            return
        }
        else{
            toast2.present();
            firebase.database().ref('userid_lookup').update({[userId]:uid}, function(err) {
                if( err ) { 
                    throw new Error('username already taken'); }
            });
        }
    });

    
      

   
}


uploadImage(imageString) : Promise<any>
   {
      let image       : string  = 'profile-' + new Date().getTime() + '.jpg',
          storageRef  : any,
          parseUpload : any;
         

      return new Promise((resolve, reject) =>
      {
         storageRef       = firebase.storage().ref(`profile/${image}`);
         parseUpload      = storageRef.put(imageString, 'data_url');

         parseUpload.on('state_changed', (_snapshot) =>
         {
            // We could log the progress here IF necessary
            // console.log('snapshot progess ' + _snapshot);
         },
         (_err) =>
         {
            reject(_err);
         },
         (success) =>
         {
            resolve(parseUpload.snapshot);
         });
      });
   }








  
    uploadPicture(file){
        return this.getUid()
        .then(uid => {
            let promise = new Promise((res,rej) => {
            let fileName = uid + '.jpg';
            let pictureRef = firebase.storage().ref(`profile/${fileName}`);
            let uploadTask = pictureRef.put(file);
            uploadTask.on('state_changed', function(snapshot){}
            , function(error){
                rej(error);
            }, function(){
                var downloadURL = uploadTask.snapshot.downloadURL;
                res(downloadURL);
            });
        });
        return promise;
        });
    }

    whoAmI(uid){
        return this.afDB.object(`/users/${uid}`);
    }

    getUser(){
        
       
        let users = this.afDB.list('/users',{
            query: {
                orderByChild: 'name',
                
            }
        });
        
        return users;
    }

    searchUser(userId){
        
       
        let users = this.afDB.list('/users',{
            query: {
                orderByChild: 'id',
                equalTo: userId
            }
        });
        
        return users;
    }



    getFollwers(){
        return this.getUid()
        .then(uid => {
            return this.afDB.list(`/users/${uid}/followers`);
        });
    }


}
