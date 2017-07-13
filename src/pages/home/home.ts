import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';



@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

section: string = 'two';
 private _KnobOptions: {};
  private _KnobValue: number = null;

somethings: any = new Array(20);
  constructor(
    public navCtrl: NavController,
    public auth: AuthProvider, ) {

      this._KnobOptions = {
      /*skin: {
        type: 'tron',
        width: 4,
        color: 'yellow',
        spaceWidth: 2
      },*/
      readOnly: true,
      size: 200,
      animate: {
        enabled: true,
        duration: 2000,
        ease: 'exp'
      },
      unit: "%",
      //barColor: 'black',
      trackWidth: 8,
      barCap: 25,
      barWidth: 13,
      textColor: 'black',
      trackColor: 'rgba(255,0,0,.1)',
      prevBarColor: 'rgba(0,0,0,.2)',
      fontSize: 'auto',
      subText: {
        enabled: true,
        text: "성취도",
        color: 'black',
        font: "auto"
      },
      step: 1,
      displayPrevious: true,
      min: 0,
      max: 100,
      notifyOnDragEnd: true
    };
    this._KnobValue=50;
  }

  signOutClicked() {
    this.auth.signOutUser()
  }

}
