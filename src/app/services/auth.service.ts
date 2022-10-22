// El auth.services.ts, se ecuentra el servicio y conexion de nuestro backend con nuestro frontend, 
// donde se pasarán los metodos principales. 


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from '../models/user';
import { JwtResponseI } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { VehiculoI } from '../models/vehiculo';

@Injectable({
  providedIn: 'root',
})

// creamos la ruta de nuestro backend.
export class AuthService {
  AUTH_SERVER: String = 'http://localhost:3000';
  authSubject = new BehaviorSubject(false);
  private token: string;

  constructor(private httpClient: HttpClient) {}

  //metodo register User, donde recibimos los datos de nuestro frontend
  //capturados desde los forms diseñados y llevamos a la ruta donde está el metodo en Back que realiza 
  // el proceso de registro. 
  regiter(user: UserI): Observable<JwtResponseI> {
    return this.httpClient
      .post<JwtResponseI>(`${this.AUTH_SERVER}/register`, user)
      .pipe(
        tap((res: JwtResponseI) => {
          if (res) {
            //llamar metodo guardar Token
            this.saveToken(res.dataUser.accesToken, res.dataUser.expireIn);
          }
        })
      );
  }
//metodo Login, se reciben los datos del front.
// se envian al Back con la ruta de login, donde está el metodo y validaciones de inicio de sesion. 
  login(user: UserI): Observable<JwtResponseI> {
    return this.httpClient
      .post<JwtResponseI>(`${this.AUTH_SERVER}/login`, user).pipe(
        tap((res: JwtResponseI) => {
          if (res) {
            //llamar metodo guardar Token
            this.saveToken(res.dataUser.accesToken, res.dataUser.expireIn);
          }
        })
      );
  }

 

//metodo close sesion
// el metodo borra el acces Token que genera la base de datos y mantiene la sesion activa. 
logout(): void{
  this.token='';
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem("EXPIRES_IN");
}

//guardar el token 
private saveToken(token:string, expireIn:string):void{
  localStorage.setItem("ACCESS_TOKEN", token);
  localStorage.setItem("EXPIRES_IN", token);
  this.token = token
}

//obtener token 
private getToken():string{
  if(!this.token){
    this.token=localStorage.getItem("ACCESS_TOKEN");
  }
  return  this.token;
}

 // metodo registrar vehiculo 
 // se envian los datos recibidos desde el Front Al Back en la ruta de registrar vehiculos donde está
 // el metodo que guarda los datos de vehiculos en la base de datos en la coeleccion de vehiculos. 
 registerVehi(vehiculo: VehiculoI) {
  return this.httpClient.post(`${this.AUTH_SERVER}/registerVehi`, vehiculo)

}


//mostrar vehiculos
// trae los datos que se generan en la consulta de GetVehiculos en el controller. 
getVehiculo(){
  return this.httpClient.get(`${this.AUTH_SERVER}/getVehiculo`).subscribe(data =>{
    console.log(data);
  });
}

}


