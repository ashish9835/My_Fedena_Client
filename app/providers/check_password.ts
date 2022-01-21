import { HttpClient } from '@angular/common/http';
import {  Injectable} from '@angular/core';
import { AppSettings } from '../models/app-setting';


@Injectable({
    providedIn: 'root'
  })

  export class Password {
    constructor(public http: HttpClient) {
    }

  resetPassword(password){
    const body = {
        old_password:  password.old_password,
        new_password: password.new_password
    }
    let header = {
        Authorization: 'Bearer token='+ window.localStorage.getItem("access_token")+';',
        'X-Client': 'identity=CeDwAKo49aSr9tYu87HMurJL;',
        'Accept' : 'application/json; version=1;',
      }
    const apiUrl = AppSettings.APP_API_URL + "app_tokens/reset_password" ;
    return this.http.post(apiUrl , body , { headers: header});
  }

}