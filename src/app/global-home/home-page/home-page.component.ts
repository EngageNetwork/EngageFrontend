import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AccountService } from '@app/_services';
import { Account, Role } from '@app/_models';

@Component({
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
	account: Account;

	constructor(
		private router: Router,
		private title: Title,
		private accountService: AccountService
	) { }
	
	ngOnInit() {
		this.title.setTitle('Engage Network');
		
		this.accountService.account.subscribe(a => this.account = a);

		if (!!this.account) {
			const role = this.accountService.accountValue.role;
			if (role == Role.Admin) {
				this.router.navigate(['/admin/home']);
			} else if (role == Role.Tutor) {
				this.router.navigate(['/tutor/home']);
			} else if (role == Role.Student) {
				this.router.navigate(['/student/home']);
			}
		}
	}
}
