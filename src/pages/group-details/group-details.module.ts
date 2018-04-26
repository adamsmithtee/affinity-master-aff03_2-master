import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupDetails } from './group-details';

@NgModule({
  declarations: [
    GroupDetails,
  ],
  imports: [
    IonicPageModule.forChild(GroupDetails),
  ],
  exports: [
    GroupDetails
  ]
})
export class GroupDetailsModule {}
