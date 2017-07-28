import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityPage } from "./community";

import { PostCmp } from '../../components/post/post';
import { MomentModule } from 'angular2-moment';
import { ShrinkHeaderModule } from '../../components/shrink-header/shrink-header.module';

@NgModule({
  declarations: [
    CommunityPage,
    PostCmp
   
  ],
  imports: [
    ShrinkHeaderModule,
    MomentModule,
    IonicPageModule.forChild(CommunityPage)
  ],
  exports: [
    PostCmp,
    CommunityPage
  ]
})
export class CommunityPageModule {}
