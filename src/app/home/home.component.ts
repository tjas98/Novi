import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { Router } from '@angular/router';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  prva = [7 * 60 + 55, 8*60 + 45];
  druga =  [8 * 60 + 45, 9*60 + 35];
  odmor = [9*60 + 35, 9*60+50];
  tretja = [9*60 +50, 10*60+40]
  cetrta = [10*60 + 40, 11*60 + 30]
  odmor_2 = [11*60 + 30, 11*60+40]
  peta = [11*60 + 40, 12*60 + 30]
  sesta = [12*60 + 30, 13*60 + 20]
  odmor_3 = [13*60 + 20, 13*60 + 35]
  sedma = [13*60 + 35, 14*60 + 25]

  trajanjeUr = [['7.55', '8.45'], ['8.45', '9.35'], ['9.50', '10.40'], ['10.40', '11.30'], ['11.40', '12.30'],
                ['12.30', '13.20'], ['13.35', '14.25']];


  text: any;
  ura: any;

  urnik: any;
  res: any;
  dan: any;

  kdo: any;
  kaj: any;

  ure: any;

  vsiProfesorji: any[] = [];
  vsiRazredi: any[] = [];

  loaded = false;

  dni = ['Pon', 'Tor', 'Sre', 'Čet', 'Pet']

  day: any;

  opened = false;

  constructor(
    private web: WebService,
    private router: Router
  ) {}

  ngOnInit() {

    console.log(window.placal)
    if (window.placal != true) this.router.navigateByUrl("/").then(() => window.location.reload())

    

    this.kaj = localStorage.getItem('kaj')
    this.kdo = localStorage.getItem('kdo')

    if (this.kdo == null) this.router.navigateByUrl('login')

    this.pridobiPodatke()

    const d = new Date();
    this.day = d.getDay();

    this.najdiDan()

    var date = new Date(); 
    var now = date.getHours() * 60 + date.getMinutes();

    this.najdiUro(now)
    setInterval(() => {
      var date = new Date(); 
      var now = date.getHours() * 60 + date.getMinutes();
      const d = new Date();
      this.day = d.getDay();
      this.najdiUro(now)
      this.najdiDan()
    }, 6000)


    setInterval(() => {
      this.pridobiUrnik();
    }, 10000)
  }

  najdiDan() {
    if (this.day == 1) this.dan = 'pon'
    if (this.day == 2) this.dan = 'tor'
    if (this.day == 3) this.dan = 'sre'
    if (this.day == 4) this.dan = 'cet'
    if (this.day == 5) this.dan = 'pet'
  }

  najdiZaProfesorja(ur: any) {
    let index = ur.urnikProf.findIndex((x: any) => x.profesor === this.kdo);
    this.urnik = ur.urnikProf[index]
    this.loaded = true;
  }

  najdiZaRazred(ur: any) {
    let index = ur.predmeti.findIndex((x: any) => x.razred === this.kdo);
    this.urnik = ur.predmeti[index]
    this.loaded = true;
  }

  pridobiUrnik() {
    this.web.get('potrjen').subscribe(r => {
      this.res = r;
      Globals.urnik = this.res
      if (this.kaj == 'prof') this.najdiZaProfesorja(this.res)
      if (this.kaj == 'dijak') this.najdiZaRazred(this.res)
    })
  }

  pridobiPodatke() {

    this.web.get('ure').subscribe(r => {
      this.ure = r
      this.ure = r
    })

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
      }
      Globals.vsiRazredi = this.vsiRazredi;
    })

    this.pridobiUrnik()

  }

  najdiUro(d: any) {
    if (d >= this.prva[0] && d <= this.prva[1]) {
      this.text = "V teku je prva ura"
      this.ura = 0;
    }
    if (d >= this.druga[0] && d <= this.druga[1]) {
      this.text = "V teku je druga ura"
      this.ura = 1;
    }
    if (d >= this.odmor[0] && d <= this.odmor[1]) {
      this.text = "V teku je odmor"
      this.ura = -1;
    }
    if (d >= this.tretja[0] && d <= this.tretja[1]) {
      this.text = "V teku je tretja ura"
      this.ura = 2;
    }
    if (d >= this.cetrta[0] && d <= this.cetrta[1]) {
      this.text = "V teku je četrta ura"
      this.ura = 3;
    }
    if (d >= this.odmor_2[0] && d <= this.odmor_2[1]) {
      this.text = "V teku je odmor"
      this.ura = -2;
    }
    if (d >= this.peta[0] && d <= this.peta[1]) {
      this.text = "V teku je peta ura"
      this.ura = 4;
    }
    if (d >= this.sesta[0] && d <= this.sesta[1]) {
      this.text = "V teku je šesta ura"
      this.ura = 5;
    }
    if (d >= this.odmor_3[0] && d <= this.odmor_3[1]) {
      this.text = "V teku je odmor"
      this.ura = -3;
    }
    if (d >= this.sedma[0] && d <= this.sedma[1]) {
      this.text = "V teku je sedma ura"
      this.ura = 6;
    }
  }
}
