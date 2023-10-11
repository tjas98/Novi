import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css']
})
export class GoogleComponent {

  opened = false;

  user: any;
  loggedIn: any;
  slika: any;
  paidFor: any;

  id: any;
  mail: any;
  name: any;
  kdo: any;

  jePlacal: any;

  constructor(
    private authService: SocialAuthService,
    private web: WebService,
    private router: Router
    ){}

  ngOnInit()  {

  

  this.authService.authState.subscribe((user) => {
    this.user = user;
    this.loggedIn = (user != null);

    if (this.loggedIn) {
      console.log(user)
      localStorage.setItem('id', user.id)
      localStorage.setItem("mail", user.email)
      localStorage.setItem("name", user.name)

      this.mail = user.email
    }

    this.preglejPlacilo() 
  });
  }

  preglejPlacilo() {
    this.web.post("placilo", {mail: this.mail}).subscribe((res) => {
      if (res != null) {
        window.placal = true;
        if (this.kdo) this.router.navigateByUrl("home")
        else this.router.navigateByUrl("login")
      }
      else this.router.navigateByUrl("placilo")
      
    })
  }
}
 