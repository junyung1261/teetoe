import {Component, OnInit, AfterViewInit} from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';


@IonicPage()

@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html'
})
export class ChartPage {

   rootNavCtrl: NavController;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }
 
}


