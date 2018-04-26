import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllExperience } from './all-experience';

@NgModule({
  declarations: [
    AllExperience,
  ],
  imports: [
    IonicPageModule.forChild(AllExperience),
  ],
  exports: [
    AllExperience
  ]
})
export class AllExperienceModule {}
