import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public formGroup: FormGroup;
  public email: FormControl;
  public password: FormControl;
  public incorrectCredentials?: string;

  constructor(private sessionService: SessionService, private router: Router) {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
    this.formGroup = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  ngOnInit(): void {
  }

  public signIn(): void {
    this.sessionService.signIn(this.email.value, this.password.value).then(
      (result) => {
        if (result) {
          this.router.navigate(["/"]);
        }
      }
    )/*.catch(
      (error) => {
        console.log(error);
        this.incorrectCredentials = "Incorrect email or password";
      }
    )*/;
  }

}
