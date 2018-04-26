import { NgModule } from '@angular/core';
import { Subscription } from './subscription';

@NgModule({
  declarations: [
    Subscription,
  ],
  imports: [
    //IonicModule.forChild(Offers),
  ],
  exports: [
    Subscription
  ]
})
export class SubscriptionModule {}
