import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

import { AccountService } from '@app/_services';

@Component({ templateUrl: 'overview.component.html' })

export class OverviewComponent implements OnInit {
	accounts: any[];
	
	constructor(
		private accountService: AccountService,
		private title: Title
	) {}
	
	ngOnInit() {
		this.title.setTitle('Account Management | Admin');
		
		this.accountService.getAll()
		.pipe(first())
		.subscribe(accounts => this.accounts = accounts);
	}
	
	deleteAccount(id: string, acnt) {
		const account = this.accounts.find(x => x.id === id);
		if (confirm(`Are you sure you want to delete the account with email: "${acnt.email}"? This action cannot be reversed.`)) {
			account.isDeleting = true;
			this.accountService.delete(id)
			.pipe(first())
			.subscribe(() => {
				this.accounts = this.accounts.filter(x => x.id !== id)
			});
		}
	}
}
