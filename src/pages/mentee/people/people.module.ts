import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PeoplePage } from "./people";
import { PipesModule } from '../../../pipes/pipes.module';
import { ShrinkHeaderModule } from '../../../components/shrink-header/shrink-header.module';

@NgModule({
  declarations: [
    PeoplePage,
   
   
  ],
  imports: [
    
    ShrinkHeaderModule,
    IonicPageModule.forChild(PeoplePage),
    PipesModule
  ],
  exports: [
    PeoplePage,
   
    
  ],
})
export class PeoplePageModule {}
