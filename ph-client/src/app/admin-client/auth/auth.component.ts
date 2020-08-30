import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  error: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(authForm: NgForm) {
    this.authService.login(authForm.value.email, authForm.value.password)
      .pipe(take(1))
      .subscribe(userData => {
        console.log(userData)
      }, errorMessage => {
        this.error = errorMessage
      });
  }
}
