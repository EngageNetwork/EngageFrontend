import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Feather from 'feather-icons';

import { AccountService } from '@app/_services';
import { Account, Role } from '@app/_models';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent {
	public isNavbarCollapsed = true;

	title = 'ConnectionWebApp';
	
	Role = Role;
	account: Account;
	
	constructor(
		private router: Router,
		private snackBar: MatSnackBar,
		private accountService: AccountService
	) {
		this.accountService.account.subscribe(a => this.account = a);
	}

	ngAfterViewInit() {
		Feather.replace();
	}
	
	logout() {
		this.accountService.logout();
		this.router.navigate(['/']);
		this.snackBar.open('You have been logged out', 'Close', { duration: 10000 });
	}
}
