import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyEvents } from './my-events';

@NgModule({
  declarations: [
    MyEvents,
  ],
  imports: [
    IonicPageModule.forChild(MyEvents),
  ],
  exports: [
    MyEvents
  ]
})
export class MyEventsModule {}
