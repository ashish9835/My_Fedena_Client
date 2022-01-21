import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReadMore } from 'src/app/providers/readmoreService';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.page.html',
  styleUrls: ['./read-more.page.scss'],
})
export class ReadMorePage implements OnInit {

  title: string;
  date: string;
  content: string;
  totalComments: number;
  comments: string;
  
  
  constructor(private http: HttpClient , private readMoreService: ReadMore) { }


  ngOnInit() {
    console.log(window.localStorage.getItem('id'));
    this.readMoreService.getReadMoreData().subscribe((res: any) =>{
      console.log(res.news);
      let contents = res.news;
      this.title = contents.title;
      this.date = contents.created_at;
      this.content = contents.content;
      this.totalComments = contents.comments.length;
      this.comments =  contents.comments;
      // console.log(contents.comments.length);

    })
  }
 

}
