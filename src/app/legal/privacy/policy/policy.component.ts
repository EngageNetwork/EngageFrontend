import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {
  panelOpenState = false;

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Legal - Privacy Policy');
  }

}
