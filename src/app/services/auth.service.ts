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
export class AuthService {
  AUTH_SERVER: String = 'http://localhost:3000';
  authSubject = new BehaviorSubject(false);
  private token: string;

  constructor(private httpClient: HttpClient) {}

  //metodo register User
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
//metodo Login 
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
 registerVehi(vehiculo: VehiculoI) {
  return this.httpClient.post(`${this.AUTH_SERVER}/registerVehi`, vehiculo)

}


//mostrar vehiculos
getVehiculo(){
  return this.httpClient.get(`${this.AUTH_SERVER}/getVehiculo`).subscribe(data =>{
    console.log(data);
  });
}

}


