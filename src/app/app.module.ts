import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { environment } from '../environments/environment';
import { MyApp } from './app.component';

// angularfire
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';

// plugin
import { Camera } from '@ionic-native/camera';


// pages

import { SignModule }  from "../app/sign.module";


// auth components
import { IonicStorageModule } from '@ionic/storage';
import { SuperTabsModule } from 'ionic2-super-tabs';


// providers
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { UtilProvider } from '../providers/util/util';
import { CommunityProvider } from '../providers/community/community';

@NgModule({
  declarations: [
    MyApp,

    // pages
 
    // components
   
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SignModule,
   
    IonicStorageModule.forRoot(),
    SuperTabsModule.forRoot(),
    // auth/db modules
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    // pages
 
    //components
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    //{ provide: LOCALE_ID, useValue: "kr-KO" },
    // auth provider
    AuthProvider,
    UserProvider,
    UtilProvider,
    CommunityProvider


  ],

})
export class AppModule { }
