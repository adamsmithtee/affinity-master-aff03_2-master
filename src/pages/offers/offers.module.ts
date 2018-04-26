import { NgModule } from '@angular/core';
import { Offers } from './offers';

@NgModule({
  declarations: [
    Offers,
  ],
  imports: [
    //IonicModule.forChild(Offers),
  ],
  exports: [
    Offers
  ]
})
export class OffersModule {}
