import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth/auth';
import { RoundProgressModule, RoundProgressConfig } from 'angular-svg-round-progressbar';
import * as d3 from 'd3';
import {Platform} from 'ionic-angular';

@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  
})
export class HomePage {
 private _DHT22KnobHumidityOptions: [{}];
  private _DHT22KnobHumidityValue: number[] = null;

 private semicircle: boolean = false;
 private radius: number = 125;
 name: String;
 color: String;
 current: number;
 max: number;
 delay: number;
 i:number =0;
 


somethings: any = new Array(20);
  constructor(
    public navCtrl: NavController,public navParams: NavParams,
     private _config: RoundProgressConfig, public platform: Platform ) {


      platform.ready().then((readySource) => {
      console.log('Width: ' + platform.width());
      console.log('Height: ' + platform.height());
    });
  
      
     this._DHT22KnobHumidityValue=[90, 50, 80, 60, 70];
      
    
    this._DHT22KnobHumidityOptions = [
      {
      
      readOnly: true,
      size: platform.width()/2,
      animate: {
        enabled: true,
        duration: 1500,
        ease: d3.easeExpIn
      },
      unit: "%",
      barColor: 'white',
      trackWidth: 0,
      barWidth: 5,
      barCap: 25,
      textColor:'white',
      //prevBarColor: 'rgba(0,156,255,.2)',
      trackColor: 'rgba(255,255,255,1)',
      fontSize: 'auto',
      subText: {
        enabled: true,
        text: "Total",
        color: 'white',
        font: "auto"
      },
      step: 1,
      displayPrevious: true,
      min: 0,
      max: 100,
      notifyOnDragEnd: true
    },
    {
      
      readOnly: true,
      size: platform.width()/5.5,
      animate: {
        enabled: true,
        duration: 1000,
        ease: d3.easeExpIn
      },
      unit: "%",
      barColor: 'white',
      trackWidth: 0,
      barWidth: 3,
      barCap: 25,
      textColor:'white',
      //prevBarColor: 'rgba(0,156,255,.2)',
      trackColor: 'rgba(255,255,255,1)',
      fontSize: 'auto',
      subText: {
        enabled: true,
        text: "언어",
        color: 'white',
        font: 13
      },
      step: 1,
      displayPrevious: true,
      min: 0,
      max: 100,
      notifyOnDragEnd: true
    },
    {
      
      readOnly: true,
      size: platform.width()/5.5,
      animate: {
        enabled: true,
        duration: 1000,
        ease: d3.easeExpIn
      },
      unit: "%",
      barColor: 'white',
      trackWidth: 0,
      barWidth: 3,
      barCap: 25,
      textColor:'white',
      //prevBarColor: 'rgba(0,156,255,.2)',
      trackColor: 'rgba(255,255,255,1)',
      fontSize: 'auto',
      subText: {
        enabled: true,
        text: "수학",
        color: 'white',
        font: 13
      },
      step: 1,
      displayPrevious: true,
      min: 0,
      max: 100,
      notifyOnDragEnd: true
    },
    {
      
      readOnly: true,
      size: platform.width()/5.5,
      animate: {
        enabled: true,
        duration: 1000,
        ease: d3.easeExpIn
      },
      unit: "%",
      barColor: 'white',
      trackWidth: 0,
      barWidth: 3,
      barCap: 25,
      textColor:'white',
      //prevBarColor: 'rgba(0,156,255,.2)',
      trackColor: 'rgba(255,255,255,1)',
      fontSize: 'auto',
      subText: {
        enabled: true,
        text: "외국어",
        color: 'white',
        font: 13
      },
      step: 1,
      displayPrevious: true,
      min: 0,
      max: 100,
      notifyOnDragEnd: true
    },
  {
      
      readOnly: true,
      size: platform.width()/5.5,
      animate: {
        enabled: true,
        duration: 1000,
        ease: d3.easeExpIn
      },
      unit: "%",
      barColor: 'white',
      trackWidth: 0,
      barWidth: 3,
      barCap: 25,
      textColor:'white',
      //prevBarColor: 'rgba(0,156,255,.2)',
      trackColor: 'rgba(255,255,255,1)',
      fontSize: 'auto',
      subText: {
        enabled: true,
        text: "탐구",
        color: 'white',
        font: 13
      },
      step: 1,
      displayPrevious: true,
      min: 0,
      max: 100,
      notifyOnDragEnd: true
    }];
    
    }

 
  changeRange(){

 
     
      
  }



   /*this.max = this.menuItems[0].max;
      this.current = this.menuItems[0].current;
      this.name = this.menuItems[0].name;
      this.color = this.menuItems[0].color;
      this.delay = 1500;
    
      _config.setDefaults({});


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
  }*/
}
