import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from "./home";
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import {Knob} from '../../../app/ng-knob2';

@NgModule({
  declarations: [
    HomePage,
    Knob
  ],
  imports: [
    
    RoundProgressModule,
    IonicPageModule.forChild(HomePage)
  ],
  exports: [
    HomePage,
    Knob
  ]
})
export class Module {}
