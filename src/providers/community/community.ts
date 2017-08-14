import { Injectable, Inject } from '@angular/core';
import { UserProvider } from '../user/user'
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth  } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';


@Injectable()
export class CommunityProvider {

    
    constructor(private userProvider: UserProvider, private afdb: AngularFireDatabase){

    }

    followUser(userData){
        return this.userProvider.getUid()
        .then((uid:string) => {
            let otherUserID = userData.$key;
            let followingList = this.afdb.object(`/user_follow/${uid}/following`);
            followingList.update({[otherUserID]: true});
            let follwerList = this.afdb.object(`/user_follow/${otherUserID}/followers`);
            return follwerList.update({[uid]: true});
        });
    }
    getPost(postID){
        return this.afdb.object(`/posts/${postID}`);
    }

    postImage(postID, imageData){
        let promise = new Promise((res,rej) => {
            let fileName = postID + "jpg";
            let uploadTask = firebase.storage().ref(`/posts/${fileName}`).put(imageData);
            uploadTask.on('state_changed', function(snapshot){}
            , function(error) {
                rej(error);
            }, function(){
               var downloadURL = uploadTask.snapshot.downloadURL;
               res(downloadURL);   
            });
        });
        return promise;
    }

      updatePost(postID, obj) {
        return this.afdb.object(`/posts/${postID}`).update(obj);
    }

    createPost(postData) {
        let uid;
        let posts = this.afdb.list('/posts');
        return this.userProvider.getUid()
        .then(userid => {
            uid = userid;
            postData.from = uid;
            postData.timestamp = firebase.database['ServerValue'].TIMESTAMP;
            return posts.push(postData).key;
        })
        .then(postKey => {
            let userFeed = this.afdb.object(`/users/${uid}/feed`);
            userFeed.update({[postKey]: true});

            this.afdb.list(`/users/${uid}/followers`)
            .subscribe(followers => {
               followers.forEach(follower => {
                   this.afdb.object(`/users/${follower.$key}/feed`).update({[postKey]: true});
               });
            });

            return Promise.resolve(postKey);
        });
    }

    getUser(uid) {
        return this.afdb.object(`/users/${uid}`);
    }  


}
   