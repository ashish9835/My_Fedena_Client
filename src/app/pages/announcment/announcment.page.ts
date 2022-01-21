import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
import { Announcements } from 'src/app/providers/announcmentService';
import { AnnouncementModel } from 'src/app/models/announcementModel';

@Component({
  selector: 'app-announcment',
  templateUrl: './announcment.page.html',
  styleUrls: ['./announcment.page.scss'],
})
export class AnnouncmentPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  show_detail = [];
  page_number = 0;
  announcementData: any;

  constructor(private http: HttpClient, private router: Router, private announcmentService: Announcements ) {}
  clickedRow(announcement) {
    announcement['isHighlighted'] = true;
    console.log('clicked');
    console.log(announcement.id);
    window.localStorage.setItem("id",announcement.id);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
  ngOnInit() {
    this.getData(null);
  }

  readMore(){
    this.router.navigate(['/read-more']);
  }
  getData( event) {
    console.log(this.page_number);
    this.announcmentService.loadAnnouncements(this.page_number)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.announcementData = new AnnouncementModel(res);
          console.log(this.announcementData);
          console.log(res.news[0]);
          if (res.news && res.news != null) {
            // console.log(this.show_detail);
            for (let news of res.news) {
              news['isHighlighted'] = false;
              // console.log(news);
              this.show_detail.push(news);
            }
            this.page_number++;
             if (event){
            event.target.complete();
            }
          } else {
            event.target.disabled = true;
          }
          
        },
        (error) => {
          console.log(error);
        }
      );
  }

  loadData(event) {
    this.getData(event);
  }

  strip(html: string) {
    return html.replace(/<[^>]+>/gi, '').substring(0, 145);
  }

}
