import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Card } from './card';

@NgModule({
  declarations: [
    Card,
  ],
  imports: [
    //IonicModule.forChild(Card),
  ],
  exports: [
    Card
  ]
})
export class CardModule {}
