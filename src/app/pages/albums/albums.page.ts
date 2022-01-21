import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { AlbumModel } from 'src/app/models/gallery/album';
import { Album } from 'src/app/providers/albumService';


@Component({
  selector: 'app-albums',
  templateUrl: './albums.page.html',
  styleUrls: ['./albums.page.scss'],
})
export class AlbumsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  all_images = [];
  page_number = 1;
  userId: number;
  router: any;
  albumData: any;

  constructor(
    private http: HttpClient,
    public loadingController: LoadingController,
    private route: Router,
    private albumService: Album
  ) {}

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Loading Images',
      duration: 1000,
    });
    await loading.present();

    this.getData(null);
  }

  getData(event) {
    this.albumService.getAlbum(this.page_number)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.albumData = new AlbumModel(res);
          console.log(this.albumData);
          if (res.photos && res.photos != null) {
            console.log(res);
            for (let photos of res.photos) {
              console.log(photos);
              console.log(photos.id);

              this.all_images.push(photos);
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  openPhoto(index) {
    this.route.navigateByUrl('/selected-photo', {
      state: { photo_index: index, images: this.all_images },
    });
  }
  clickedRow(album, i) {
    album['isHighlighted'] = true;
    window.localStorage.setItem('id', album.id);
  }
}
