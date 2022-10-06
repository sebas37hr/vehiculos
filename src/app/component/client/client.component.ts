import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { send } from 'process';






@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  public datavehiculo: any[] = [];

  constructor( private getservice : AuthService, private router: Router ) { }

  ngOnInit(): void {
  }

  getVehiculos() {
    //datavehiculo = this.getservice.getVehiculo();
    
  }


}
