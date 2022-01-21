import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AppSettings } from '../models/app-setting';

@Injectable({
    providedIn: 'root',
})

export class Gallery{

    constructor(public http: HttpClient) {}

    ngOnInit() {}

    getGallery(page=0){
        const apiUrl = AppSettings.APP_API_URL + "galleries?page=" + page;
        return this.http.get(`${apiUrl}`);
    }
}