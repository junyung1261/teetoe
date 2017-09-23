import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from "./home";
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { KnobModule } from '../../../components/knob.module';

@NgModule({
  declarations: [
    HomePage,
   
  ],
  imports: [
    
    RoundProgressModule,
    IonicPageModule.forChild(HomePage),
    KnobModule
    
  ],
  exports: [
    HomePage,
    
  ]
})
export class Module {}
