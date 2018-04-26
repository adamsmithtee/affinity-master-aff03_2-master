import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePicture } from './profile-picture';

@NgModule({
  declarations: [
    ProfilePicture,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePicture),
  ],
  exports: [
    ProfilePicture
  ]
})
export class ProfilePictureModule {}
