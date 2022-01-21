import { Injectable } from '@angular/core';
import { AppSettings } from '../models/app-setting';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class Announcements {

    constructor(public http: HttpClient) {
    }

    loadAnnouncements(page = 0) {
        const apiUrl = AppSettings.APP_API_URL + 'api/news.json?page=' + page;
        return this.http.get(`${apiUrl}`);
      }
}