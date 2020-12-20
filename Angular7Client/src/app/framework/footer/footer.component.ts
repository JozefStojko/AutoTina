import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  mailto(emailAddress: string, emailSubject: any) {
    return `mailto:` + emailAddress + `?subject=` + emailSubject;
  }

}
