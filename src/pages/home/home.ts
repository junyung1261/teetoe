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


 private semicircle: boolean = false;
 private radius: number = 125;
 name: String;
 color: String;
 current: number;
 max: number;
 delay: number;
 i:number =0;
 
menuItems: any[] = [
    {
      name: '오늘의 달성',
      current: 60,
      max: 100,
      color: '#45ccce',
      delay: 0
    },
   {
      name: '이번 주 달성',
      current:  25,
      max: 100,
      color: '#6666ff',
      delay: 0
    },
    {
      name: '이번 달 달성',
      current: 80 ,
      max: 100,
      color: '#ff4c4c',
      delay: 0
    }
];



somethings: any = new Array(20);
  constructor(
    public navCtrl: NavController,public navParams: NavParams,
     private _config: RoundProgressConfig ) {

      
      this.max = this.menuItems[0].max;
      this.current = this.menuItems[0].current;
      this.name = this.menuItems[0].name;
      this.color = this.menuItems[0].color;
      this.delay = 1500;
    
      _config.setDefaults({
      
      
    });

    }

 
  changeRange(){

      this.max=0;
      this.current=0;

      this.i++;
      this.max = this.menuItems[this.i%3].max;
      this.current = this.menuItems[this.i%3].current;
      this.name = this.menuItems[this.i%3].name;
      this.color = this.menuItems[this.i%3].color;
      this.delay = this.menuItems[this.i%3].delay;

      

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
