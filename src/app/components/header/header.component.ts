import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faUser = faUser;
  isLoggedIn: boolean | any;
  username: string | any;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.username = this.loginService.getUserName();
  }

  goToUserProfile() {
    this.router.navigateByUrl('/user-profile/' + this.username);
  }

  logout() {
    this.loginService.logout();
    this.router.navigateByUrl('').then(() => {
      window.location.reload();
    })
  }

}
