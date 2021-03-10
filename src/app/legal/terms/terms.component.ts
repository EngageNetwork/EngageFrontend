import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})

export class TermsComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Legal - Terms of Service');
  }

}
