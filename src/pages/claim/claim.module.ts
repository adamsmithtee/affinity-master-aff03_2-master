import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Claim } from './claim';

@NgModule({
  declarations: [
    Claim,
  ],
  imports: [
    //IonicModule.forChild(Claim),
  ],
  exports: [
    Claim
  ]
})
export class ClaimModule {}
