import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { LoginRequest } from '../model/login-request';
import { LoginResponse } from '../model/login-response';
import { Observable, map, throwError } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { SignupRequest } from '../model/signup-request';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }


  constructor(private http: HttpClient, private localStroge: LocalStorageService) { }

  login(loginRequest: LoginRequest): Observable<boolean> {
    return this.http.post<LoginResponse>('http://localhost:8080/api/auth/login', loginRequest).pipe(map(data => {
      this.localStroge.store('authenticationToken', data.authenticationToken);
      this.localStroge.store('username', data.username);
      this.localStroge.store('refreshToken', data.refreshToken);
      this.localStroge.store('expiresAt', data.expiresAt);

      return true;
    }));
  }

  signup(signupRequestPayload: SignupRequest): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/signup', signupRequestPayload, { responseType: 'text' });
  }

  logout() {
    this.http.post('http://localhost:8080/api/auth/logout', this.refreshTokenPayload,
      { responseType: 'text' })
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      })
    this.localStroge.clear('authenticationToken');
    this.localStroge.clear('username');
    this.localStroge.clear('refreshToken');
    this.localStroge.clear('expiresAt');
  }

  getJwtToken() {
    return this.localStroge.retrieve("authenticationToken");
  }

  refreshToken() {
    return this.http.post<LoginResponse>('http://localhost:8080/api/auth/refresh/token',
      this.refreshTokenPayload)
      .pipe(map(response => {
        this.localStroge.clear('authenticationToken');
        this.localStroge.clear('expiresAt');

        this.localStroge.store('authenticationToken',
          response.authenticationToken);
        this.localStroge.store('expiresAt', response.expiresAt);
      }));
  }

  getUserName() {
    return this.localStroge.retrieve('username');
  }
  getRefreshToken() {
    return this.localStroge.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
