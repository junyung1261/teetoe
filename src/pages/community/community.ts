import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';


@IonicPage()

@Component({
  selector: 'page-community',
  templateUrl: 'community.html'
})
export class CommunityPage {

  rootNavCtrl: NavController;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }
 
}
