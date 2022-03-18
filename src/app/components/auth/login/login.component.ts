import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  hide = true;
  userIsAuthenticated = false;
  authListenerSubs: Subscription;
  loginStatus: any;

  constructor(public authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

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
    this.authService.login(form.value.email, form.value.password);
    setTimeout(() => {
      if(!this.userIsAuthenticated) {
        this.isLoading = false;
        this.openSnackBar();
      }
    }, 2000);
  }

  openSnackBar() {
    this.snackBar.open('Email/Password is Incorrect', 'Close', {
      duration: 5000,
    });
  }

}
