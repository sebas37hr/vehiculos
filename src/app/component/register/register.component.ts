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

  // inyectamos en el contructor el servicio
  constructor( private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  //enviamos la data del formulario al servicio, que inyecta al bakc y crea los datos en la BD
register(form):void{
this.authService.regiter(form.value).subscribe(res =>{
  console.log('usar register');
});
}

 //enviamos la data del formulario al servicio, que inyecta al bakc y crea los datos en la BD
registerVehi(frmRegisterV):void{
  this.authService.registerVehi(frmRegisterV.value).subscribe(res =>{
    console.log('regustro vehiculo', frmRegisterV.value);
  });
}
  
  

}
