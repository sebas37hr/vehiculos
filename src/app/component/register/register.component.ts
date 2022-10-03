import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserI } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

register(form):void{
this.authService.regiter(form.value).subscribe(res =>{
  console.log('usar register');
})
}
  
  

}
