import { Injectable } from '@angular/core';

import { LoadingProvider } from './loading';
import { AngularFireAuth } from 'angularfire2/auth';
import { DataProvider } from './data';
import * as firebase from 'firebase';

@Injectable()
export class LogoutProvider {
  // Logout Provider
  // This is the provider class for logging out.
  // Before logout function can be used it's important to set the app to the Provider
  // by calling setApp(app) in the constructor of the controller that needs the logout functionality.
  constructor(public afAuth: AngularFireAuth, public loadingProvider: LoadingProvider, public dataProvider: DataProvider) {
    console.log("Initializing Logout Provider");
  }

  // Hooks the app to this provider, this is needed to clear the navigation views when logging out.
  

  // Logs the user out on Firebase, and clear navigation stacks.
  // It's important to call setApp(app) on the constructor of the controller that calls this function.
  logout() {
    this.loadingProvider.show();
    // Sign the user out on Firebase
    this.afAuth.auth.signOut().then((success) => {
      // Clear navigation stacks
     
        this.loadingProvider.hide();
        // Restart the entire app
        //document.location.href = 'index.html';
      });
   
  }

}
