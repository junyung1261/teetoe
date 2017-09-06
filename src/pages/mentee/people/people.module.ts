import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PeoplePage } from "./people";
import { FriendPipe } from '../../../pipes/friend';
import { ShrinkHeaderModule } from '../../../components/shrink-header/shrink-header.module';

@NgModule({
  declarations: [
    PeoplePage,
    FriendPipe
   
  ],
  imports: [
    
    ShrinkHeaderModule,
    IonicPageModule.forChild(PeoplePage)
  ],
  exports: [
    PeoplePage
    
  ],
})
export class PeoplePageModule {}
