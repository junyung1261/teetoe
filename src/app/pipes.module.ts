import { NgModule } from '@angular/core';
import { TimeAgoPipe, FromUnixPipe } from 'angular2-moment';

@NgModule({
  declarations: [
    TimeAgoPipe,
    FromUnixPipe
  ],
  imports: [

  ],
  
  exports: [
    TimeAgoPipe,
    FromUnixPipe
  ]
})
export class PipesModule { 
  
}