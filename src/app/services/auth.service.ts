import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from '../services/cache-service';
import jwt_decode from 'jwt-decode';
import { map, tap } from 'rxjs/operators'
import { LoginResponse, Message, NewEmployeeResponse } from '../models/utilities/Login';
import { Team } from '../models/team/team';
import { Site } from '../models/site/site';
import { Employee } from '../models/employee/employee';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends CacheService {
  isAuthenticated = false;
  mustChange = false;
  showProgress = false;
  statusMessage = "Welcome";
  currentEmail = '';

  constructor(private http: HttpClient, private router: Router) {
    super();
    this.getToken();
  }

  getToken(): string | null {
    var token = this.getItem('jwt');
    this.isAuthenticated = (token) ? true : false;
    return this.getItem('jwt');
  }

  clearToken() {
    this.removeItem('jwt');
    this.removeItem('team');
    this.removeItem('site');
    this.removeItem('user');
  }

  getTeam(): Team | null {
    return this.getItem('team');
  }

  getSite(): Site | null {
    return this.getItem('site');
  }

  getUser(): Employee | null {
    return this.getItem('user');
  }
  
  getDecodedToken(): IAuthStatus {
    var sToken = this.getItem<string|null>('jwt');
    if (sToken) {
        let token: IAuthStatus = jwt_decode(sToken);
        if (token.userid && token.userid.substring(0,4) === '<nil') {
          return defaultAuthStatus;
        }
        return token;
    }
    return defaultAuthStatus;
  }

  login(email: string, password: string) {
    var address = '/api/v2/Employees/authenticate';
    return this.http.post<LoginResponse>(address, 
      {"email": email, "password":password})
      .pipe(map(resp => {
        this.setItem('jwt', resp.token);
        this.isAuthenticated = true;
        this.setItem('team', resp.team);
        this.setItem('site', resp.site);
        this.setItem('user', resp.user);
        this.mustChange = resp.user.creds.must_change;
        this.showProgress = false;
      }));
  }

  logout() {
    this.clearToken();
    this.isAuthenticated = false;
    this.mustChange = false;
  }

  verify(email: string, passcode: string) {
    var address = '/api/v2/Employees/verify';
    return this.http.put<Message>(address, 
      {"email": email, "verifytoken":passcode});
  }

  sendForgot(email: string) {
    var address = '/api/v2/Employees/forgot/' + email;
    return this.http.get<Message>(address);
  }

  forgot(email: string, newpassword: string, resetToken: string) {
    var address = '/api/v2/Employees/forgot';
    return this.http.post<LoginResponse>(address, 
      {"email": email, "password":newpassword, "token": resetToken})
      .pipe(map(resp => {
        this.setItem('jwt', resp.token);
        this.isAuthenticated = true;
        this.setItem('team', resp.team);
        this.setItem('site', resp.site);
        this.setItem('user', resp.user);
        this.mustChange = resp.user.creds.must_change;
        this.showProgress = false;
      }));
  }

  changePassword(password: string) {
    var address = '/api/v2/Employees';
    var user = this.getItem<Employee>('user');
    if (user) {
      return this.http.put<NewEmployeeResponse>(address, 
        {"id": user.id, "field": "password", "subfield": "", "value": password})
        .pipe(map(resp => {
          this.setItem('user', resp.employee);
          this.mustChange = resp.employee.creds.must_change;
          this.currentEmail = resp.employee.email;
        }));
    }
    return null;
  }
}

export interface IAuthStatus {
  userid: string
  email: string
  uuid: string
}

const defaultAuthStatus = { userid: "",email: "", uuid: "" }
