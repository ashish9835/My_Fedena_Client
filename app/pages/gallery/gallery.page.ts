import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { GalleryModel } from 'src/app/models/gallery/gallery';
import { Gallery } from 'src/app/providers/galleryService';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  show_albums = [];
  page_number = 0;
  userId: number;
  router: any;
  galaryData: any;

  constructor(private http: HttpClient, public loadingController: LoadingController,private route: Router, private galleryService: Gallery ) {
  }
  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Loading Images',
      duration: 1000
    });
    await loading.present();
    this.getData(null);

  }

  getData(event) {
  
    this.galleryService.getGallery(this.page_number).subscribe(
      (res: any) => {
        console.log(res);
        this.galaryData = new GalleryModel(res);
        console.log(this.galaryData);
        if (res.albums && res.albums != null) {
          for (let albums of res.albums) {
            // console.log(albums);
            this.show_albums.push(albums);
          }
          this.page_number++;
          if (event)
            event.target.complete();
        }
        else {
          event.target.disabled = true;
        }
      }, error => {
        // console.log(error);
      })
  }


  loadData(event) {
    this.getData(event);
  }

  clickedRow(album, i) {
    album["isHighlighted"] = true;
    console.log(album.id);
    window.localStorage.setItem("album_id", album.id);
    this.route.navigate(['/albums']);
  }
}


