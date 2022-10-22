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

  // inyectamos en el constructor el servicio. 

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
  }

  //Enviamos la data al servicio que se encarga de llevar la info a la BD mediante las funciones en el Back
 iniciar(form): void{

  this.authService.login(form.value).subscribe(res =>{
    this.router.navigateByUrl('register')
  });
    
  }
}
