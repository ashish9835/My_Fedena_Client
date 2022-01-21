import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selected-photo',
  templateUrl: './selected-photo.page.html',
  styleUrls: ['./selected-photo.page.scss'],
})
export class SelectedPhotoPage implements OnInit {

  total_images = [];
  constructor( private router: Router) {
    this.total_images = this.router.getCurrentNavigation().extras.state.images;
       console.log(this.total_images);
   }

  ngOnInit() {
  }

}
