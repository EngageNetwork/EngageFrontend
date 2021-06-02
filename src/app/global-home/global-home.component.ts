import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './global-home.component.html',
  styleUrls: ['./global-home.component.scss']
})

export class GlobalHomeComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Engage Network');
  }
}
