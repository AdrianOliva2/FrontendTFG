import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/classes/user';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public formGroup: FormGroup;
  public userName: FormControl;
  public email: FormControl;
  public password: FormControl;
  public confirmPassword: FormControl;
  public phone: FormControl;
  public department: FormControl;

  constructor(private sessionService: SessionService) {
    this.userName = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
    this.confirmPassword = new FormControl('', [Validators.required]);
    this.phone = new FormControl('', [Validators.required]);
    this.department = new FormControl('', [Validators.required]);

    this.formGroup = new FormGroup({
      userName: this.userName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      phone: this.phone,
      department: this.department
    });
  }

  ngOnInit(): void {
  }

  public signUp(): void {
    this.sessionService.signUp(new User("", this.userName.value, this.email.value, this.phone.value, this.department.value), this.password.value);
  }

}
