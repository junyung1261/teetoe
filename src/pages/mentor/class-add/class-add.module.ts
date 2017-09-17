import { NgModule } from '@angular/core';
import { ClassAddPage } from './class-add';
import { IonicPageModule } from 'ionic-angular';

// Import Chart 


@NgModule({
  declarations: [
    ClassAddPage,
    
  ],
  imports: [
    IonicPageModule.forChild(ClassAddPage),
    
    // Importing ChartsModule
    
  ],
  exports: [
    ClassAddPage,
    
  ]
})
export class ClassADDPageModule {}
