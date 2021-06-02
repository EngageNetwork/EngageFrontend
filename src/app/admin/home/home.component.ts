import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AccountService } from '@app/_services';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
    account = this.accountService.accountValue;

    constructor(private accountService: AccountService, private title: Title) { }

    ngOnInit() {
      this.title.setTitle('Home | Admin');
    }
}
