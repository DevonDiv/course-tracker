import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  error = false;
  hide = true;
  userIsAuthenticated = false;
  authListenerSubs: Subscription;
  loginStatus: any;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
    if(this.userIsAuthenticated) {
      this.router.navigate(['/']);
    }
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.error = false;
    this.authService.login(form.value.email, form.value.password);
    setTimeout(() => {
      if(!this.userIsAuthenticated) {
        this.isLoading = false;
        this.error = true;
      }
    }, 2000);
  }

}
