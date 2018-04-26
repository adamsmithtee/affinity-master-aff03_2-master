import { NgModule } from '@angular/core';
import { Groups } from './groups';

@NgModule({
  declarations: [
    Groups,
  ],
  imports: [
    //IonicModule.forChild(Groups),
  ],
  exports: [
    Groups
  ]
})
export class GroupsModule {}
