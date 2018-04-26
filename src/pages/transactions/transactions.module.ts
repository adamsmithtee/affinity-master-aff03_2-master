import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Transactions } from './transactions';

@NgModule({
  declarations: [
    Transactions,
  ],
  imports: [
    //IonicModule.forChild(Transactions),
  ],
  exports: [
    Transactions
  ]
})
export class TransactionsModule {}
