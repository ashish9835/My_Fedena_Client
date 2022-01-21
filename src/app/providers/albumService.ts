import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AppSettings } from '../models/app-setting';

@Injectable({
    providedIn: 'root',
})

export class Album{

    constructor(public http: HttpClient) {}

    ngOnInit() {}

    getAlbum(page=0){
        const apiUrl = AppSettings.APP_API_URL + "galleries/" +  window.localStorage.getItem('album_id') +"/show_album?page=" + page;
        return this.http.get(`${apiUrl}`);
    }
}