import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExperienceDetails } from './experience-details';

@NgModule({
  declarations: [
    ExperienceDetails,
  ],
  imports: [
    IonicPageModule.forChild(ExperienceDetails),
  ],
  exports: [
    ExperienceDetails
  ]
})
export class ExperienceDetailsModule {}
