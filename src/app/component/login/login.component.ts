import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserI } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
  }

  //metodo login

 
 
 iniciar(form): void{

  this.authService.login(form.value).subscribe(res =>{
    this.router.navigateByUrl('register')
  });
    
  }
}
