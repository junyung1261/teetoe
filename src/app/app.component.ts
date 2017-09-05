import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { MenuController } from 'ionic-angular/index';
import { DataProvider } from '../providers/data'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
 
  private user;
  rootPage: any
  pages: Array<{title: string, component: any}>;
@ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private afAuth: AngularFireAuth, 
  private menu: MenuController, private auth: AuthProvider, private dataProvider: DataProvider) {

    // here we determine, if user is aunthenticated/have data in our db
    // thats we make before platform ready
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        // you can modify here the page for non. auth users
        this.rootPage ='AuthPage';
        return;
      }
      // page for auth. users
      else {
        this.dataProvider.getCurrentUser().subscribe((user) => {
          
          this.user = user;
          if(user.isMentee === 'mentee') this.rootPage='TabsPage';
          else if(user.isMentee ==='mentor') this.rootPage = 'MentorHomePage';
          else this.rootPage = '';
        });
      }
      
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
    else this.rootPage = page.component;
  }
}

