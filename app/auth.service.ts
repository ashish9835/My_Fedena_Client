import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from './models/app-setting';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private _loginUrl ="http://fconnect.t.foradian.org/api/app_tokens?type=password";
  private _loginUrl = AppSettings.APP_API_URL +  "app_tokens?type=password";
    //  private _loginUrl ='https://fconnect.fedena.org/api/app_tokens?type=password';

  constructor(private http: HttpClient) {}
  loginUser(user) {
    const dp = "&username=" + user.username + "&password=" + user.password;

    let header = {
      'Authorization' : 'Bearer token=joKaxuoX3B57QntfYeW2Kss8;student_id=809',
      'Content-Type': 'application/json',
      'X-Client': 'identity=CeDwAKo49aSr9tYu87HMurJL;',
      'Accept': 'application/json; version=1;'
    };

    return this.http.post<any>(this._loginUrl + dp, {}, { headers: header });
  }
}
