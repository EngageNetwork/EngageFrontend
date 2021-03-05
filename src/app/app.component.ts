import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '@app/_services';
import { AccountService } from '@app/_services';
import { Account, Alert, Role } from '@app/_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ConnectionWebApp';

  Role = Role;
  account: Account;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private accountService: AccountService
  ) {
    this.accountService.account.subscribe(a => this.account = a);
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/']);
    this.alertService.success('You have been logged out');
  }
}
