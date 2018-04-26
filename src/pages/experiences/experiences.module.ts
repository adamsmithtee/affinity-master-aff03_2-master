import { NgModule } from '@angular/core';
import { Experiences } from './experiences';

@NgModule({
  declarations: [
    Experiences,
  ],
  imports: [
    //IonicModule.forChild(Experiences),
  ],
  exports: [
    Experiences
  ]
})
export class ExperiencesModule {}
