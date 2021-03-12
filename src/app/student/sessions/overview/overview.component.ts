import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({ templateUrl: './overview.component.html' })

export class OverviewComponent {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Student Session Menu')
  }

}
