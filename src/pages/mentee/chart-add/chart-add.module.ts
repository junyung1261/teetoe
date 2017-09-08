import { NgModule } from '@angular/core';
import { ChartAddPage } from './chart-add';
import { IonicPageModule } from 'ionic-angular';

// Import Chart 



@NgModule({
  declarations: [
    ChartAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ChartAddPage),
    // Importing ChartsModule
    
  ],
  exports: [
    ChartAddPage
  ]
})
export class ChartPageModule {}
