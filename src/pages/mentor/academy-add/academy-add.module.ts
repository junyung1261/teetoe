import { NgModule } from '@angular/core';
import { AcademyAddPage } from './academy-add';
import { IonicPageModule } from 'ionic-angular';

// Import Chart 


@NgModule({
  declarations: [
    AcademyAddPage,
    
  ],
  imports: [
    IonicPageModule.forChild(AcademyAddPage),
    
    // Importing ChartsModule
    
  ],
  exports: [
    AcademyAddPage,
    
  ]
})
export class AcademyAddPageModule {}
