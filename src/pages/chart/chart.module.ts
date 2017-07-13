import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChartPage } from "./chart";
import { SharedModule } from "../../app/shared.module"


@NgModule({
  declarations: [
    ChartPage,
    
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(ChartPage),
    
  ],
  
})
export class Module {}
