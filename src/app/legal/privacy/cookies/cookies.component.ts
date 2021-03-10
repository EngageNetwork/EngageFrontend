import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss']
})

export class CookiesComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Legal - Use of Cookies');
  }

}
