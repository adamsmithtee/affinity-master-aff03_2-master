import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferDetails } from './offer-details';

@NgModule({
  declarations: [
    OfferDetails,
  ],
  imports: [
    IonicPageModule.forChild(OfferDetails),
  ],
  exports: [
    OfferDetails
  ]
})
export class OfferDetailsModule {}
