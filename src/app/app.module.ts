import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { environment } from '../environments/environment';
import { MyApp } from './app.component';

// angularfire
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AuthProvider } from '../providers/auth/auth';

// pages


// auth components

// added module

import { SuperTabsModule } from 'ionic2-super-tabs';


@NgModule({
  declarations: [
    MyApp,

    // pages
 
    // components
    
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
    
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: LOCALE_ID, useValue: "kr-KO" },
    // auth provider
    AuthProvider
  ]
})
export class AppModule { }
