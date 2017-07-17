import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityPage } from "./community";

import { PostCmp } from '../../components/post/post';

import { MomentModule } from 'angular2-moment';
@NgModule({
  declarations: [
    CommunityPage,
    PostCmp
   
  ],
  imports: [
    
    MomentModule,
    IonicPageModule.forChild(CommunityPage)
  ],
  exports: [
    PostCmp
    
  ]
})
export class Module {}
