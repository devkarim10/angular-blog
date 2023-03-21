import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { SignupRequest } from 'src/app/model/signup-request';
import { SignupService } from 'src/app/service/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupFromGroup: FormGroup | any;
  signupRequest: SignupRequest | any;


  constructor(private signupService: SignupService,
    private toastrService: ToastrService,
    private router: Router) {
    this.signupRequest = {
      username: '',
      email: '',
      password: ''
    };
  }
  ngOnInit(): void {

    this.signupFromGroup = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    })
  }


  signup() {
    this.signupRequest.email = this.signupFromGroup.get('email').value;
    this.signupRequest.username = this.signupFromGroup.get('username').value;
    this.signupRequest.password = this.signupFromGroup.get('password').value;

    this.signupService.signup(this.signupRequest).subscribe(() => {

      this.router.navigate(['/login'],
        { queryParams: { registered: 'true' } });
    }, error => {
      console.log(error);
      this.toastrService.error('Registration Failed! Please try again');
    });

  }

}
