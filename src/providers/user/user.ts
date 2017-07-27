import { Injectable, Inject } from '@angular/core';
import { Storage } from '@ionic/storage';

import { AngularFireAuth  } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase/app';

@Injectable()
export class UserProvider {
   
  constructor(public afAuth: AngularFireAuth, public storage: Storage, public afDB: AngularFireDatabase) { }


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


    searchUser(username){
        let query = {
            orderbyChild: 'name'
        };
        if(username){
            query['equalTo'] = username;
        }
        let users = this.afDB.list('/users',{
            query: query
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
