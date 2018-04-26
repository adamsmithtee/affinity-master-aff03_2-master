import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { EventPage } from './event-page';

@NgModule({
  declarations: [
    EventPage,
  ],
  imports: [
    //IonicModule.forChild(EventPage),
  ],
  exports: [
    EventPage
  ]
})
export class EventPageModule {}
