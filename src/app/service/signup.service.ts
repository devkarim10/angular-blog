import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignupRequest } from '../model/signup-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
 

  constructor(private http : HttpClient) { }

  signup(signupRequest:SignupRequest):Observable<any>{
    return this.http.post('http://localhost:8080/api/auth/signup',signupRequest,{responseType:'text'});
  }

}
