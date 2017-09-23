import { NgModule } from '@angular/core';
import { ChartPage } from './chart';
import { IonicPageModule } from 'ionic-angular';

// Import Chart 
import {ChartsModule} from 'ng2-charts/charts/charts';
import { KnobModule } from '../../../components/knob.module';


@NgModule({
  declarations: [
    ChartPage,
    
  ],
  imports: [
    IonicPageModule.forChild(ChartPage),
    // Importing ChartsModule
    ChartsModule,
    KnobModule
  ],
  exports: [
    ChartPage,
    
  ]
})
export class ChartPageModule {}
