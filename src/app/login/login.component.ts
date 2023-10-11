
import { Component, ElementRef, ViewChild } from '@angular/core';
import { WebService } from '../web.service';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private web: WebService,
    private router: Router,
    private authService: SocialAuthService
  ) {}

  user: any;
  loggedIn: any;

  b = [1,2,3,4,5,6,67,7]

  text = "Ste profesor ali dijak?"

  izbran = ""
  vsiProfesorji: any[] = []
  vsiRazredi: any[] = []
  res: any

  ok = false;

  izbira = ""

  ngOnInit() {

    if (window.placal != true) this.router.navigateByUrl("/").then(() => window.location.reload())

    this.web.get('vsiProf').subscribe(r => {
      this.res = r;
      for (var i = 0; i < this.res.length; i++) {
        var a = this.res[i].profesor
        this.vsiProfesorji.push(a)
      }
      Globals.vsiProfesorji = this.vsiProfesorji;
    })

    this.web.get('vsiRazredi').subscribe(r => {
      this.res = r;
      for (var i = 0; i < this.res.length; i++) {
        var a = this.res[i].razred
        this.vsiRazredi.push(a)
        Globals.vsiRazredi = this.vsiRazredi;
      }
    })
    
  }


  izberi(a: any) {
    this.izbira = a;

    if (this.izbira == 'prof') {
      this.text = "Izberite kdo ste"
    } else {
      this.text = "Izberite vaš razred"
    }
    this.ok = true;
  }


  izberi2() {
    console.log(this.izbran)
  }

  shrani() {
    localStorage.setItem('kaj', this.izbira);
    localStorage.setItem('kdo', this.izbran)
    this.router.navigateByUrl('home').then(() =>
      this.reload()
    )
  }

  reload() {
    window.location.reload()
  }


}
