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
            orderbyChild: 'username'
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
