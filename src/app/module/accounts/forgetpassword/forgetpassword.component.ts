import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';

import { AccountsService } from '../services/accounts.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
})
export class ForgetpasswordComponent implements OnInit {

  @ViewChild('iconEye') iconEyeHandler;
  @ViewChild('iconEye2') iconEyeHandler2;
  @ViewChild('passwordtoggler') passwordHandler;
  @ViewChild('passwordtoggler2') passwordHandler2;

  forgetpasswordForms: FormGroup;
  resetpasswordForms: FormGroup;
  borderStyle;
  submitted: boolean = false;
  constructor(private accountserv: AccountsService, private router: Router) {}

  ngOnInit(): void {
    // forget password form
    this.forgetpasswordForms = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    // reset password form
    this.resetpasswordForms = new FormGroup({
      password: new FormControl('', [ 
        Validators.required,
        Validators.pattern(
          /^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/
        ),
        Validators.minLength(8),
        Validators.maxLength(30),
      ]),
      confirmpassword: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/
        ),
        Validators.minLength(8),
        Validators.maxLength(30),
      ]),
    },
        {
          validators: this.passwordMatchValidator,
        })
  }
  onSubmit() {
    if (this.forgetpasswordForms.status == 'VALID') {
      this.submitted = !this.submitted;
      this.accountserv.uploadForgetPasswordData(this.forgetpasswordForms.value);

    } else {
      alert('Failed');
    }
  }

  onSubmit2() {
    if (this.resetpasswordForms.status == 'VALID') {
      this.accountserv.uploadResetPasswordData(this.resetpasswordForms.value);
      console.log(this.resetpasswordForms.value)
      this.router.navigate(['/login']);
    } else {
      alert('Failed');
    }
  }

  // Confirm password validator
  passwordMatchValidator(formGrp: FormGroup) {
    return formGrp.controls['password'].value ===
      formGrp.controls['confirmpassword'].value
      ? null
      : { mismatch: true };
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

  togglePasswordtoShow2() {
    let passChecker = this.passwordHandler2.nativeElement.type;
    if (passChecker == 'password') {
      this.passwordHandler2.nativeElement.type = 'text';
      this.iconEyeHandler2.nativeElement.className = 'fa fa-eye';
    } else {
      this.passwordHandler2.nativeElement.type = 'password';
      this.iconEyeHandler2.nativeElement.className = 'fa fa-eye-slash';
    }
}
}
