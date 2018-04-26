import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllEvents } from './all-events';

@NgModule({
  declarations: [
    AllEvents,
  ],
  imports: [
    IonicPageModule.forChild(AllEvents),
  ],
  exports: [
    AllEvents
  ]
})
export class AllEventsModule {}
