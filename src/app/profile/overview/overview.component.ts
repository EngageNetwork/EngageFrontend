import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AccountService } from '@app/_services';

@Component({ templateUrl: 'overview.component.html' })

export class OverviewComponent {
  account = this.accountService.accountValue;

  constructor(private accountService: AccountService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Profile Overview');
  }
}
