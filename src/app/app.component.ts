import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { MenuController } from 'ionic-angular/index';


import { AuthPage } from '../pages/auth/auth';
import { TabsPage } from '../pages/tabs/tabs';
import { AccountPage } from '../pages/account/account';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;
  
  rootPage: any
  pages: Array<{title: string, component: any}>;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private afAuth: AngularFireAuth, 
  private menu: MenuController, private auth: AuthProvider) {

    // here we determine, if user is aunthenticated/have data in our db
    // thats we make before platform ready
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        // you can modify here the page for non. auth users
        this.nav.setRoot('AuthPage');
        return;
      }
      // page for auth. users
      this.nav.setRoot('TabsPage');
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.menu.swipeEnable(false, 'menu1');
    });


     this.pages = [
      { title: 'Home', component: 'TabsPage' },
      { title: 'MyInfo', component: 'AccountPage' },
      { title: 'Logout', component: null }
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    
    if(page.component == null) {this.auth.signOutUser()}
    else if(page.component == 'AccountPage') {this.nav.push('AccountPage')}
    else this.nav.setRoot(page.component);
  }
}

