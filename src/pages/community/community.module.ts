import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityPage } from "./community";
import { SharedModule }  from "../../app/shared.module";

@NgModule({
  declarations: [
    CommunityPage,
   
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(CommunityPage)
  ]
})
export class Module {}
