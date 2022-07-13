import { Injectable } from '@angular/core';

import { FormDataDb } from '../data/formDataDb';
import { FormData } from '../data/formData';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  MYFORMDB = FormDataDb;
  formdata: FormData;


  resetPasswordValide;
  
  // old passwords
  oldPasswordTrackingNumber;

  constructor() {}

  // SIGNUP DATA
  uploadSignUpData(signupForms) {
    let i = 0;
    // for (let i = 0; i < this.MYFORMDB.length; i++) { 
    let test = false;
    while(i < this.MYFORMDB.length) {
        if (signupForms.email === this.MYFORMDB[i].email && signupForms.username === this.MYFORMDB[i].username) {
        alert('Email and username is in use, try another');
        test = true;
        break
      }
      
      else if (signupForms.email === this.MYFORMDB[i].email) 
      {
       alert('Email is already used');
       test = true;
       break
      } 
      
      else if (signupForms.username === this.MYFORMDB[i].username) {
        alert('Username already Taken');
        test = true;
        break
      }
      
      i++;
    }
    if(test === false) {
      alert('Success');
      FormDataDb.push(signupForms);
      console.log(FormDataDb);
    }
  }
  
  // LOGIN DATA
  uploadLogInData(loginForms) {
    let checker = false;
    for(let i = 0; i < this.MYFORMDB.length; i++) {
      if (loginForms.email_username == this.MYFORMDB[i].email || loginForms.email_username == this.MYFORMDB[i].username) 
      {
        if (loginForms.password == this.MYFORMDB[i].userData.password ) {
          alert('Record Found. You can Logged In Now');
          checker = true
          break
        } 
        else {
          alert('Password is incorrect');
          checker = true;
          break
        } 
      }
    }
    if(checker == false) {
      console.log('NOT FOUND')
    }
}

  // FORGET PASSWORD DATA
  uploadForgetPasswordData(forgetPasswordForms) {
      console.log(forgetPasswordForms)
      let checker2 = false;

      for (let i = 0; i < this.MYFORMDB.length; i++) {
        if(forgetPasswordForms.email === this.MYFORMDB[i].email) {
          console.log('this.MYFORMDB[i].email ' + this.MYFORMDB[i].email)
          console.log('Proceeding..')
          this.oldPasswordTrackingNumber = i;
          checker2 = true;
          break;
        }
      }
      if(checker2 == false) {
        console.log('Email Not Found..')
      }

      this.resetPasswordValide = checker2;
  }


  // RESET PASSWORD DATA
  uploadResetPasswordData(resetpasswordForms) {
    if(this.resetPasswordValide == true) {
      // new password
      let newPassword = resetpasswordForms.password;
      let newConfirmPassword = resetpasswordForms.confirmpassword;
      this.passwordUpdated(newPassword, newConfirmPassword)
    }
    else {
      console.log(`Sorry you cannot reset the password for this email. As their is no such account`); 
    }
  }

  passwordUpdated(newPassword, newConfirmPassword) {
    this.MYFORMDB[this.oldPasswordTrackingNumber].userData.password = newPassword;
    this.MYFORMDB[this.oldPasswordTrackingNumber].userData.confirmpassword = newConfirmPassword;
    console.log('Updated: ' + JSON.stringify(this.MYFORMDB))
  }
}
