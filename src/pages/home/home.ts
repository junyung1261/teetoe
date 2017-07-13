import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { RoundProgressModule, RoundProgressConfig } from 'angular-svg-round-progressbar';



@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 private current: number;
 private max: number;
 private semicircle: boolean = false;
 private radius: number = 125;

somethings: any = new Array(20);
  constructor(
    public navCtrl: NavController,public navParams: NavParams,
     private _config: RoundProgressConfig ) {

      this.max=100;
      this.current=20;

    _config.setDefaults({
      
      
    });

    }

 

  getOverlayStyle() {
    let isSemi = this.semicircle;
    let transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      'top': isSemi ? 'auto' : '50%',
      'bottom': isSemi ? '5%' : 'auto',
      'left': '50%',
      'transform': transform,
      '-moz-transform': transform,
      '-webkit-transform': transform,
      'font-size': this.radius / 5+ 'px'
    };
  }
}
