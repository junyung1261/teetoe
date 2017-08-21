import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { environment } from '../environments/environment';
import { MyApp } from './app.component';
import { Keyboard } from '@ionic-native/keyboard';
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
//import { SuperTabsModule } from 'ionic2-super-tabs';
import * as ionicGalleryModal from 'ionic-gallery-modal';
import { IonicImageViewerModule } from 'ionic-img-viewer';
// pipe


// providers
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { UtilProvider } from '../providers/util/util';
import { EventProvider } from '../providers/event/event'
import { CommunityProvider } from '../providers/community/community';
import { Preloader } from '../providers/preloader';
import { Database } from '../providers/database';
//import { LoginProvider } from '../providers/login';
import { LogoutProvider } from '../providers/logout';
import { LoadingProvider } from '../providers/loading';
import { AlertProvider } from '../providers/alert';
import { ImageProvider } from '../providers/image';
import { DataProvider } from '../providers/data';
import { FirebaseProvider } from '../providers/firebase';



import { SearchPipe } from '../pipes/search';
import { ConversationPipe } from '../pipes/conversation';
import { DateFormatPipe } from '../pipes/date';
import { GroupPipe } from '../pipes/group';

@NgModule({
  declarations: [
    MyApp,

    // pages
    ConversationPipe,
    SearchPipe,
    DateFormatPipe,
    GroupPipe
    // components
  
  ],
  imports: [
    BrowserModule,
    ionicGalleryModal.GalleryModalModule,
    IonicModule.forRoot(MyApp, {mode: 'ios', backButtonText: ''}),
    HttpModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
    
    IonicImageViewerModule,
    // auth/db modules
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    
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
    Keyboard,
    { provide: ErrorHandler, useClass: IonicErrorHandler  },
   
    //{ provide: LOCALE_ID, useValue: "kr-KO" },
    // auth provider
    AuthProvider,
    UserProvider,
    UtilProvider,
    EventProvider,
    CommunityProvider,
    Database,
    Preloader,
    //LoginProvider, 
    LogoutProvider, 
    LoadingProvider, 
    AlertProvider, 
    ImageProvider, 
    DataProvider, 
    FirebaseProvider

  ],

})
export class AppModule { }
