import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import  firebase from 'firebase';


import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';



@Injectable()
export class Database {

   constructor(public http: Http)
   {
   }



   renderMovies() : Observable<any>
   {
       try {
         return new Observable(observer =>
         {
            let films : any = [];
            firebase.database().ref('films').orderByKey().once('value', (items : any) =>
            {
               items.forEach((item) =>
               {
                  films.push(item.val());
               });

               observer.next(films);
               observer.complete();
            },
            (error) =>
            {
              console.log("Observer error: ", error);
              console.dir(error);
              observer.error(error)
            });

         });
      }
      catch(error)
      {
         console.log('Observable for retrieving films fails');
         console.dir(error);
      }
   }



   deleteMovie(id) : Promise<any>
   {
      return new Promise((resolve) =>
      {
         let ref = firebase.database().ref('films').child(id);
         ref.remove();
         resolve(true);
      });
   }



   addToDatabase(movieObj) : Promise<any>
   {
      return new Promise((resolve) =>
      {
         let addRef = firebase.database().ref('films');
         addRef.push(movieObj);
         resolve(true);
      });
   }



   updateDatabase(id, moviesObj) : Promise<any>
   {
      return new Promise((resolve) =>
      {
         var updateRef = firebase.database().ref('films').child(id);
	      updateRef.update(moviesObj);
         resolve(true);
      });
   }



   uploadImage(imageString) : Promise<any>
   {
      let image       : string  = 'movie-' + new Date().getTime() + '.jpg',
          storageRef  : any,
          parseUpload : any;

      return new Promise((resolve, reject) =>
      {
         storageRef       = firebase.storage().ref('profiles/' + image);
         parseUpload      = storageRef.put(imageString, 'data_url');

         parseUpload.on('state_changed', (_snapshot) =>
         {
            // We could log the progress here IF necessary
            // console.log('snapshot progess ' + _snapshot);
         },
         (_err) =>
         {
            reject(_err);
         },
         (success) =>
         {
            resolve(parseUpload.snapshot);
         });
      });
   }


}