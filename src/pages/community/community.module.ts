import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityPage } from "./community";
import { SharedModule }  from "../../app/shared.module";
import { PostCmp } from '../../components/post/post';

import { PipesModule } from '../../app/pipes.module';
@NgModule({
  declarations: [
    CommunityPage,
    PostCmp
  ],
  imports: [
    SharedModule,
    PipesModule,
    IonicPageModule.forChild(CommunityPage)
  ]
})
export class Module {}
