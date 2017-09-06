import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MentorHomePage } from "./home-mentor";



@NgModule({
  declarations: [
    MentorHomePage
  ],
  imports: [
    IonicPageModule.forChild(MentorHomePage),
    
  ],
  exports:[
    MentorHomePage
  ]
  
})
export class MentorHomePageModule {}
