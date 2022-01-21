import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnnouncmentPage } from './announcment.page';

const routes: Routes = [
  {
    path: '',
    component: AnnouncmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnouncmentPageRoutingModule {}
