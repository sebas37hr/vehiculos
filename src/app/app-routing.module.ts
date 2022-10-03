import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { PrincipalaComponent } from './component/principala/principala.component';

const routes: Routes = [
  {path: '', redirectTo: '/principala', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path :'login', component:LoginComponent},
  {path: 'principala', component: PrincipalaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
