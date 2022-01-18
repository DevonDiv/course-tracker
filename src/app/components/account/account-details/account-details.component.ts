import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  hide = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  updateEmail(form: NgForm) {

  }

  updatePassword(form: NgForm) {

  }

}
