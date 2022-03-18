import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLoading = false;
  error = false;
  hide = true;
  userIsAuthenticated = false;
  authListenerSubs: Subscription;

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

  register(form: NgForm) {
    if(form.invalid) {
      return;
    }
    this.isLoading = true;
    this.error = false
    this.authService.createUser(form.value.email, form.value.password);
    setTimeout(() => {
      this.isLoading = false
      this.error = true
    }, 2000)
  }

}
