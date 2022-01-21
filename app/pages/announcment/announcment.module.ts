import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnnouncmentPageRoutingModule } from './announcment-routing.module';

import { AnnouncmentPage } from './announcment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnnouncmentPageRoutingModule
  ],
  declarations: [AnnouncmentPage]
})
export class AnnouncmentPageModule {}
