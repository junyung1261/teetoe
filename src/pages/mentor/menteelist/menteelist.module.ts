import { NgModule } from '@angular/core';
import { MenteeListPage } from './menteelist';
import { IonicPageModule } from 'ionic-angular';
import { FriendPipe } from '../../../pipes/friend';
import { ShrinkHeaderModule } from '../../../components/shrink-header/shrink-header.module';

// Import Chart 
import {ChartsModule} from 'ng2-charts/charts/charts';



@NgModule({
  declarations: [
    MenteeListPage,
    FriendPipe
  ],
  imports: [
    IonicPageModule.forChild(MenteeListPage),
    ShrinkHeaderModule
    // Importing ChartsModule
    
  ],
  exports: [
    MenteeListPage,
    FriendPipe
  ]
})
export class MenteeListPageModule {}
