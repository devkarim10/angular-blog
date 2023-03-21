import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { LoginRequest } from 'src/app/model/login-request';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup | any;
  loginRequest: LoginRequest | any;
  isError: boolean | any;
  registerSuccessMessage: string | any;



  constructor(private loginService: LoginService,
    private toastrService: ToastrService,
    private router: Router,
    private activaterouter: ActivatedRoute) {
    this.loginRequest = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {

    this.loginFormGroup = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.activaterouter.queryParamMap.subscribe(params => {
      if (params.has('registered') && params.get('registered') === 'true') {
        this.toastrService.success("Signup Successful");
        this.registerSuccessMessage = 'Please Check your inbox for activation email '
          + 'activate your account before you Login!';
      }
    })

  }

  login() {
    this.loginRequest.username = this.loginFormGroup.get('username').value;
    this.loginRequest.password = this.loginFormGroup.get('password').value;

    this.loginService.login(this.loginRequest).subscribe(data => {
      if (data) {
        this.isError = false;
        this.router.navigateByUrl('/');
        this.toastrService.success("Login Successful.");

      } else {
          this.isError = true
      }

    })
  }

}
