import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from '../services/accounts.service';
import { AuthService } from '../services/auth.service';
import { WhiteSpaceValidator } from '../validators/white-space.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AccountsService]
})
export class LoginComponent implements OnInit {
  @ViewChild('passwordtoggler') passwordHandler;
  @ViewChild('iconEye') iconEyeHandler;
  loginForms: FormGroup;
  constructor(
    private accountserv: AccountsService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForms = new FormGroup({
      email_username: new FormControl('', [
        Validators.required,
        WhiteSpaceValidator.noWhiteSpace,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/
        ),
        Validators.minLength(8),
        Validators.maxLength(30),
      ]),
    });
  }
  onSubmit() {
    if (this.loginForms.status == 'VALID') {
      this.accountserv.uploadLogInData(this.loginForms.value);
    } else {
      console.log(this.loginForms);
      alert('Failed');
    }
  }
  togglePasswordtoShow() {
    let passChecker = this.passwordHandler.nativeElement.type;
    if (passChecker == 'password') {
      this.passwordHandler.nativeElement.type = 'text';
      this.iconEyeHandler.nativeElement.className = 'fa fa-eye';
    } else {
      this.passwordHandler.nativeElement.type = 'password';
      this.iconEyeHandler.nativeElement.className = 'fa fa-eye-slash';
    }
  }
}
