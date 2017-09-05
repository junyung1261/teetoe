import { Injectable } from '@angular/core';
import { LoadingProvider } from '../loading';

import { DataProvider } from '../data';


import firebase from 'firebase/app';

@Injectable()
export class EventProvider {
  public userProfileRef:firebase.database.Reference;
  public scheduleRef:firebase.database.Reference;
  private uid;
  constructor(public loadingProvider: LoadingProvider, public dataProvider: DataProvider) {
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        this.userProfileRef = firebase.database().ref(`users/${user.uid}`);
        this.scheduleRef = firebase.database().ref(`schedule/${user.uid}`);
        this.uid = user.uid;
      }
    });
  }

  getEventList() : firebase.database.Reference{
    
    return this.scheduleRef;
      
  }

  

  getEventDetail(eventId:string): firebase.database.Reference {
    return this.userProfileRef.child('/eventList').child(eventId);
  }

  createEvent(eventData): firebase.Promise<any> {
    let ref;
    
      eventData.startAt=eventData.start.toJSON();
      eventData.endAt=eventData.end.toJSON();
      ref= this.scheduleRef.push(eventData);
      console.log(eventData);
      let userSchedule = this.userProfileRef.child('schedule');
      userSchedule.update({[ref.key]:true});
      eventData.id = ref.key;
      return Promise.resolve(ref);
  }

  deleteEvent(eventData) {
    let rootRef = firebase.database().ref();
    let updateObj = {};
    updateObj[`schedule/${this.uid}/${eventData}`] = null;
    updateObj[`users/${this.uid}/schedule/${eventData}`] = null;
    return rootRef.update(updateObj);
  }

  updateEvent(eventData){
    
    
    this.scheduleRef.child(eventData.id).update({
      startAt: eventData.start, 
      endAt: eventData.end,
      title: eventData.title,
      tracks: eventData.tracks,
      color: eventData.color,
      isDone: eventData.isDone
    });
  }

  selectMentor(eventData){

    
   if(eventData.mentor!=null){
      this.scheduleRef.child(eventData.id ).child('mentor').update({
     mentorID: eventData.mentor.mentorID,
     avatar: eventData.mentor.avatar
    });
   }
  else{
    this.scheduleRef.child(eventData.id).child('mentor').remove();
  }
    
    


  }
  
  addGuest(guestName, eventId, eventPrice, guestPicture = null): firebase.Promise<any> {
    return this.userProfileRef.child('/eventList').child(eventId)
    .child('guestList').push({
      guestName: guestName
    })
    .then((newGuest) => {
      this.userProfileRef.child('/eventList').child(eventId).transaction( event => {
        event.revenue += eventPrice;
        return event;
      });
      if (guestPicture != null) {
        firebase.storage().ref('/guestProfile/').child(newGuest.key)
        .child('profilePicture.png').putString(guestPicture, 'base64', {contentType: 'image/png'})
        .then((savedPicture) => {
          this.userProfileRef.child('/eventList').child(eventId).child('guestList')
          .child(newGuest.key).child('profilePicture').set(savedPicture.downloadURL);
        });        
      }
    });
  }

}
