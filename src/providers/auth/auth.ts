import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {
  public fireAuth:firebase.auth.Auth;
  public userProfileRef:firebase.database.Reference;

  constructor(public afAuth: AngularFireAuth) {

    this.fireAuth = firebase.auth();
    this.userProfileRef = firebase.database().ref('/userProfile');
   }

  signInUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  signUpUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword)
    .then( newUser => {
     this.userProfileRef.child(newUser.uid).set({
        email: newEmail
        
      });
    });
  }

  resetPassword(email: string): firebase.Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  signOutUser(): firebase.Promise<any> {
    return this.afAuth.auth.signOut();
  }

}
