import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyExperience } from './my-experience';

@NgModule({
  declarations: [
    MyExperience,
  ],
  imports: [
    IonicPageModule.forChild(MyExperience),
  ],
  exports: [
    MyExperience
  ]
})
export class MyExperienceModule {}
