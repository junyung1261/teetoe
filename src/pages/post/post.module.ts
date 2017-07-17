import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostPageModal } from './post';

// auth components



@NgModule({
  declarations: [
    PostPageModal
  ],
  imports: [
    IonicPageModule.forChild(PostPageModal),
  ],

  exports: [
    PostPageModal
    

  ]
})
export class PostModule {}
