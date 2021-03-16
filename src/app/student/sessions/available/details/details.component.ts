import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivationEnd } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';

import { AccountService, SlateService } from '@app/_services';

@Component({ templateUrl: './details.component.html' })

export class DetailsComponent implements OnInit {
	id: string;
	listing: any;
	
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private snackBar: MatSnackBar,
		private accountService: AccountService, // Ignore "unused" warnings
		private slateService: SlateService,
		private title: Title
	) { }
	
	ngOnInit(): void {
		this.title.setTitle('Listing Details');
		
		this.id = this.route.snapshot.params['id'];
		
		this.slateService.getListingById(this.id)
		.pipe(first())
		.subscribe(listing => {
			listing.startDateTime = moment(listing.startDateTime).format('LT MMMM Do[,] YYYY');
			listing.endDateTime = moment(listing.endDateTime).format('LT MMMM Do[,] YYYY');

			this.accountService.getByIdPublic(listing.account)
			.pipe(first())
			.subscribe(account => {
				listing.tutorName = [account.firstName, account.lastName].join(' ');
			});

			this.listing = listing;
		});
	}
	
	registerSession(id: string) {
		const listing = this.listing;
		if (confirm(`Sign up for session?`)) {
			listing.isRegistering = true;
			this.slateService.register(id)
			.pipe(first())
			.subscribe({
				next: () => {
					// Display success message to user
					this.snackBar.open('Registration successful', 'Close', { duration: 10000 });
					this.router.navigate(['../../'], { relativeTo: this.route });
				},
				error: error => {
					// Display error to user
					this.snackBar.open(error, 'Close', { duration: 10000 });
					listing.isRegistering = false;
				}
			});
		}
	}
}
	