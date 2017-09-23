import { NgModule } from '@angular/core';
import { FriendPipe } from './friend';

@NgModule({
	declarations: [
        FriendPipe
    ],
	imports: [],
	exports: [
        FriendPipe
       ]
})
export class PipesModule {}