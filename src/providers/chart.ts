import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { LoadingProvider } from './loading';
import { AlertProvider } from './alert';
import { DataProvider } from './data';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/take';

@Injectable()
export class ChartProvider {


    constructor(public angularfireDatabase: AngularFireDatabase, public loadingProvider: LoadingProvider, public alertProvider: AlertProvider, public dataProvider: DataProvider) {
        console.log("Initializing Chart Provider");
      }


    updateScore(data){
        let user = firebase.auth().currentUser.uid;
        let uploadData = JSON.parse(JSON.stringify(data)); 
        uploadData.splice(uploadData.length,1);
        this.loadingProvider.show();
        if(data.meta.name != 'mock'){
        this.angularfireDatabase.object('/chart/' + user + '/academic/' + data.meta.grade + '/' + data.meta.semester + '/' + data.meta.name).set(uploadData         
          ).then((success) => {
            this.loadingProvider.hide();
          }).catch((error) => {
            this.loadingProvider.hide();
          });
        }
        else{

        }
    }
}