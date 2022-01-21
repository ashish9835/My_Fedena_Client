import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AppSettings } from '../models/app-setting';

@Injectable({
  providedIn: 'root',
})
export class Attendance {
  public static api_url = AppSettings.APP_API_URL;
  constructor(public http: HttpClient) {}

  ngOnInit() {}
  getCourse() {
    const apiUrl = Attendance.api_url + 'courses';
    return this.http.get(`${apiUrl}`);
  }

  getBatches() {
    const batch_api = window.localStorage.getItem('course_id');
    const apiUrl = Attendance.api_url + 'batches/?scope=all&course_id=' + batch_api;
    return this.http.get(`${apiUrl}`);
  }

  getSubjects() {
    const subject_api = window.localStorage.getItem('batch_id');
    const apiUrl = Attendance.api_url + 'batches/' + subject_api + '/subjects';
    return this.http.get(`${apiUrl}`);
  }
}
