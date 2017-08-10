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

import { HttpModule } from '@angular/http';
// pages


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// module & sharedmodule
import { IonicStorageModule } from '@ionic/storage';
import { SuperTabsModule } from 'ionic2-super-tabs';


// providers
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { UtilProvider } from '../providers/util/util';
import { EventProvider } from '../providers/event/event'
import { CommunityProvider } from '../providers/community/community';
import { Image } from '../providers/image';
import { Preloader } from '../providers/preloader';
import { Database } from '../providers/database';

@NgModule({
  declarations: [
    MyApp

    // pages
 
    // components
   
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
    SuperTabsModule.forRoot(),
    // auth/db modules
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp

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
    EventProvider,
    CommunityProvider,
     Image,
    Database,
    Preloader


  ],

})
export class AppModule { }
