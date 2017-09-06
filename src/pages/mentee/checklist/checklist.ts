import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';



@IonicPage()

@Component({
  selector: 'page-checklist',
  templateUrl: 'checklist.html'
})
export class ChecklistPage {

  rootNavCtrl: NavController;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
  }
 
}
