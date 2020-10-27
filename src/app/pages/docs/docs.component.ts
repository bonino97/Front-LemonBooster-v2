import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public navigateToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
  }

}
