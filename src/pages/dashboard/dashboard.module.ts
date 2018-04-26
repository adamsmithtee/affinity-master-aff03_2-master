import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Dashboard } from './dashboard';

@NgModule({
  declarations: [
    Dashboard,
  ],
  /**imports: [
    IonicModule.forChild(Dashboard),
  ],**/
  exports: [
    Dashboard
  ]
})
export class DashboardModule {}
