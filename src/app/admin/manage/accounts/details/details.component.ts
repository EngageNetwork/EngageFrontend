import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import moment from 'moment';

import { AccountService } from '@app/_services';
import { Role } from '@app/_models';

@Component({
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
	id: string;
	account: any;
	isoCreated: string;
	isoUpdated: string;
	isoVerified: string;
	numOfApprovedSubjects: number;

	Role = Role;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private snackBar: MatSnackBar,
		private accountService: AccountService,
		private title: Title
	) { }
	
	ngOnInit() {
		this.title.setTitle('User Details | Admin');
		
		this.id = this.route.snapshot.params['id'];

		this.fetchData();
	}

	fetchData() {
		this.accountService.getById(this.id)
		.pipe(first())
		.subscribe(account => {
			this.isoCreated = account.createdAt;
			this.isoUpdated = account.updatedAt;
			this.isoVerified = account.verified;
			account.createdAt = moment(account.createdAt).format('LT MMMM Do[,] YYYY');
			account.updatedAt = moment(account.updatedAt).format('LT MMMM Do[,] YYYY');
			account.verified = moment(account.verified).format('LT MMMM Do[,] YYYY');

			this.numOfApprovedSubjects = Object.keys(account.approvedSubjects).length;

			this.account = account
		});
	}
	
	approveSubject(subject) {
		const account = this.account;
		if (confirm(`Are you sure you want to approve this user to teach ${subject}?`)) {
			account.isApproving = true;
			this.accountService.approveTutor(this.id, { subject: subject })
			.pipe(first())
			.subscribe({
				next: () => {
					// Display success message to user
					this.snackBar.open(`User approved to teach ${subject}`, 'Close', { duration: 10000 });
					account.isApproving = false;
					this.fetchData();
				},
				error: error => {
					// Display error to user
					this.snackBar.open(error, 'Close', { duration: 10000 });
					account.isApproving = false;
				}
			});
		}
	}

	revokeSubject(subject) {
		const account = this.account;
		if (confirm(`Are you sure you want to revoke this user's ability to teach ${subject}?`)) {
			account.isApproving = true;
			this.accountService.approveTutor(this.id, { subject: subject })
			.pipe(first())
			.subscribe({
				next: () => {
					// Display success message to user
					this.snackBar.open(`User ability to teach ${subject} revoked`, 'Close', { duration: 10000 });
					account.isApproving = false;
					this.fetchData();
				},
				error: error => {
					// Display error to user
					this.snackBar.open(error, 'Close', { duration: 10000 });
					account.isApproving = false;
				}
			});
		}
	}
}
