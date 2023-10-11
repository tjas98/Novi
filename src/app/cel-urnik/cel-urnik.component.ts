import { Component } from '@angular/core';
import { Globals } from 'src/globals';
import { WebService } from '../web.service';

@Component({
  selector: 'app-cel-urnik',
  templateUrl: './cel-urnik.component.html',
  styleUrls: ['./cel-urnik.component.css']
})
export class CelUrnikComponent {
  router: any;
  constructor(
    private web: WebService
  ){}

  dni = ['Pon', 'Tor', 'Sre', 'Čet', 'Pet']
  urnik: any;
  urnikProf: any;
  dnevi = ['pon', 'tor', 'sre', 'cet', 'pet']
  day: any;
  dan: any;

  ngOnInit() {

    if (window.placal != true) this.router.navigateByUrl("/").then(() => window.location.reload())

    const d = new Date();
    this.day = d.getDay()-1;
    this.najdiDan(d.getDay())
    
    if (Globals.urnik == undefined) this.pridobiUrnik()
    else {
      this.urnik = Globals.urnik;
      this.urnikProf = Globals.urnik.urnikProf;
    }
    
  }


  pridobiUrnik() {
    this.web.get('potrjen').subscribe(r => {
      this.urnik = r;
      this.urnikProf = this.urnik.urnikProf;
      console.log(this.urnik)
    })
  }

  zamenjajDan(i: any) {
    this.day = i;
    console.log(this.day)
    this.najdiDan(i+1)
  }

  najdiDan(i: any) {
    if (i == 1) this.dan = 'pon'
    if (i == 2) this.dan = 'tor'
    if (i == 3) this.dan = 'sre'
    if (i == 4) this.dan = 'cet'
    if (i == 5) this.dan = 'pet'
  }
}
