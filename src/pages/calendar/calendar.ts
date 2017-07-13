import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';


@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {

   rootNavCtrl: NavController;

  constructor(public navCtrl: NavController, public navParams: NavParams, private calendar: Calendar) {
    this.calendar.createCalendar('MyCalendar').then(
  (msg) => { console.log(msg); },
  (err) => { console.log(err); }
  );
  }

  
}
