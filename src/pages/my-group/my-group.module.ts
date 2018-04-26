import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyGroup } from './my-group';

@NgModule({
  declarations: [
    MyGroup,
  ],
  imports: [
    IonicPageModule.forChild(MyGroup),
  ],
  exports: [
    MyGroup
  ]
})
export class MyGroupModule {}
