import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllGroup } from './all-group';

@NgModule({
  declarations: [
    AllGroup,
  ],
  imports: [
    IonicPageModule.forChild(AllGroup),
  ],
  exports: [
    AllGroup
  ]
})
export class AllGroupModule {}
