import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_URL } from './../app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string = undefined;
  constructor(private http: HttpClient) { }

  logout() {
    this.token = undefined;
  }

  isAuthenticated() {
    if (this.token == undefined) {
      return false;
    } else {
      return true;
    }
  }
  getToken() {
    return this.token;
  }

  authenticate(email: string, password: string) {
    let jsonObj = {
      "userName": email,
      "password": password
    }
    return this.http.post<{ 'jwt': '' }>(`${API_URL}/authenticate`, jsonObj)
  }

}
