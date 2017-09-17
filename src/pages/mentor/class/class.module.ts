import { NgModule } from '@angular/core';
import { ClassPage } from './class';
import { IonicPageModule } from 'ionic-angular';

// Import Chart 


@NgModule({
  declarations: [
    ClassPage,
    
  ],
  imports: [
    IonicPageModule.forChild(ClassPage),
    
    // Importing ChartsModule
    
  ],
  exports: [
    ClassPage,
    
  ]
})
export class ClassPageModule {}
