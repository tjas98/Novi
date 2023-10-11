import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PlaciloComponent } from './placilo/placilo.component';
import { HomeComponent } from './home/home.component';
import { GoogleComponent } from './google/google.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "urnik",
    pathMatch: "full"
  }, 
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'placilo',
    component: PlaciloComponent
  },
  {
    path: "home", 
    component: HomeComponent
  },
  {
    path: "google", 
    component: GoogleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
