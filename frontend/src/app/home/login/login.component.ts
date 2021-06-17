import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginData: any;
  public errorMsg: String;

  constructor( private auth: AuthService, private router: Router) {
    this.loginData = {};
    this.errorMsg = '';
   }

  ngOnInit(): void {
  }

  login(){
    if(!this.loginData.email || !this.loginData.password) {
      console.log('Data incomplete');
      this.errorMsg = 'Data incomplete';
      this.closeAlert();
      this.loginData={}
      
    }else{
    this.auth.login( this.loginData ).subscribe(
      (res:any)=>{
        console.log(res);
        localStorage.setItem('token', res.jwtToken );
        this.router.navigate(['/listTask'])
        

      },
      (err)=>{
        console.log(err);
        this.errorMsg = err.error.text;
        this.loginData = {};
        this.closeX();
        

      }
    )
    }
  }

  closeAlert() {
    setTimeout(() => {
      this.errorMsg = '';
    }, 3000);
  }

  closeX() {
    this.errorMsg = '';
  }


}
