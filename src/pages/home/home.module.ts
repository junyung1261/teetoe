import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from "./home";
import { Knob } from '../../app/knob';



@NgModule({
  declarations: [
    HomePage,
    Knob
    
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    
  ],
  
})
export class Module {}


