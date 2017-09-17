import { NgModule } from '@angular/core';
import { ChartInputPage } from './chart-input';
import { IonicPageModule } from 'ionic-angular';


// Import Chart 



@NgModule({
  declarations: [
    ChartInputPage,
  ],
  imports: [
    IonicPageModule.forChild(ChartInputPage),
    // Importing ChartsModule
    
  ],
  exports: [
    ChartInputPage
  ],
 
})
export class ChartPageModule {}
