import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerData: any;
  public successMsg: String;
  public errorMsg: String;


  constructor(private auth: AuthService, private router: Router) {

    this.registerData = {
      name: '',
      email: '',
      password: ''
    }

    this.successMsg = '';
    this.errorMsg = '';

  }

  ngOnInit(): void {
  }

  registerUser() {
    if (
      !this.registerData.name ||
      !this.registerData.email ||
      !this.registerData.password
    ) {
      console.log('Data is incomplete');
      this.errorMsg = 'Data is incomplete';
      this.closeAlert();
      this.registerData = {}

    } else {
      this.auth.registerUser(this.registerData).subscribe(
        (res) => {
          console.log(res);
          this.successMsg = 'Register user successful';
          this.closeAlert();
          this.registerData = {};

        },
        (err) => {
          console.log(err);
          this.errorMsg = err.error.text;
        }
      )

    }
  }

  closeAlert() {
    setTimeout(() => {
      this.successMsg = '';
      this.errorMsg = '';
    }, 3000);
  }

  closeX() {
    this.successMsg = '';
    this.errorMsg = '';
  }

}
