import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AppSettings } from '../models/app-setting';

@Injectable({
    providedIn: 'root',
})

export class ReadMore{

    constructor(public http: HttpClient) {}

    ngOnInit() {}

    getReadMoreData(){
        const apiUrl = AppSettings.APP_API_URL + "news/" +  window.localStorage.getItem('id') +".json";
        return this.http.get(`${apiUrl}`);
    }
}