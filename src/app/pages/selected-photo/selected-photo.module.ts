import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectedPhotoPageRoutingModule } from './selected-photo-routing.module';

import { SelectedPhotoPage } from './selected-photo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectedPhotoPageRoutingModule
  ],
  declarations: [SelectedPhotoPage]
})
export class SelectedPhotoPageModule {}
