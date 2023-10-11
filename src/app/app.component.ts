import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from './web.service';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Urnik';

  p: any;

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


  @ViewChild('paymentRef', {static: true}) paymentRef!: ElementRef

  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private web: WebService
    ) { }

  ngOnInit() {

    this.id = localStorage.getItem("id")
    this.name = localStorage.getItem("name")
    this.mail = localStorage.getItem("mail")
    this.kdo = localStorage.getItem("kdo")

    this.p = Globals.plac
    

    if (this.id == null) {
      this.router.navigateByUrl("google")
    } else {

      this.preglejPlacilo()
    }
    
    
  
    

  }

  preglejPlacilo() {
    this.web.post("placilo", {mail: this.mail}).subscribe((res) => {
      if (res != null) {
        window.placal  = true;
        if (this.kdo) this.router.navigateByUrl("home")
        else this.router.navigateByUrl("login")
      }
      else this.router.navigateByUrl("placilo")
      
    })
  }



  naLogin() {
    this.router.navigateByUrl('login')
    this.opened = false;
  }

  naUrnik() {
    this.router.navigateByUrl('urnikVseh')
    this.opened = false;
  }

  home() {
    this.router.navigateByUrl('home')
    this.opened = false;
  }

  logout() {
    localStorage.removeItem("mail")
    localStorage.removeItem("id")
    localStorage.removeItem("name")
    localStorage.removeItem("kdo")

    window.location.reload()
  }
}
