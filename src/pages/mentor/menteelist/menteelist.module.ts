import { NgModule } from '@angular/core';
import { MenteeListPage } from './menteelist';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../../../pipes/pipes.module';
import { ShrinkHeaderModule } from '../../../components/shrink-header/shrink-header.module';

// Import Chart 
import {ChartsModule} from 'ng2-charts/charts/charts';



@NgModule({
  declarations: [
    MenteeListPage,
    
  ],
  imports: [
    IonicPageModule.forChild(MenteeListPage),
    ShrinkHeaderModule,
    PipesModule

    // Importing ChartsModule
    
  ],
  exports: [
    MenteeListPage,
   
  ]
})
export class MenteeListPageModule {}
