import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectedPhotoPage } from './selected-photo.page';

const routes: Routes = [
  {
    path: '',
    component: SelectedPhotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectedPhotoPageRoutingModule {}
