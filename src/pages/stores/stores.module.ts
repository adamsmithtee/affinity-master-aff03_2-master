import { NgModule } from '@angular/core';
import { Stores } from './stores';

@NgModule({
  declarations: [
    Stores,
  ],
  imports: [
    //IonicModule.forChild(Stores),
  ],
  exports: [
    Stores
  ]
})
export class StoresModule {}
