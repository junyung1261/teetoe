import { Component  } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,LoadingController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map'; // you might need to import this, or not depends on your setup



@IonicPage()
@Component({
  selector: 'page-notice',
  templateUrl: 'notice.html'
})
export class NoticePage {
  notices: FirebaseListObservable<any[]>;
  feedView: string = "activity";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController ,
              public modalCtrl: ModalController, 
              public afDB: AngularFireDatabase) {
                              
     
  }

  ionViewWillEnter() {
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent',
      content: ''
    });
    loadingPopup.present();
    this.notices = <FirebaseListObservable<any[]>> this.afDB.list('/notice').map((notices) => {
        return notices.map((notice) => {
          notice.lists = this.afDB.list('/notice/'+notice.$key+'/lists')  
            loadingPopup.dismiss().catch(() => console.log('ERROR CATCH: LoadingController dismiss'));
            return notice            
        })        
    })
  }


}
