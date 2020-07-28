import { HardcodedAuthenticationService } from './../service/hardcoded-authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'admin'
  password = 'admin'
  errorMessage = 'Invalid Credentials'
  invalidLogin = false

  //Router
  //Angular.giveMeRouter
  //Dependency Injection
  constructor(private router: Router,
    private hardcodedAuthenticationService: HardcodedAuthenticationService,
    private authService : AuthService
    ) { }

  ngOnInit() {
  }

  handleLogin() {
    this.authService.authenticate(this.username, this.password).subscribe(
      (response) => {
        this.authService.token = response.jwt;
        this.router.navigate(['welcome', this.username])
        this.invalidLogin = false        
      },(error)=>{
        console.log(error);
        this.invalidLogin = true
        this.authService.logout();
      });    
  }
}
