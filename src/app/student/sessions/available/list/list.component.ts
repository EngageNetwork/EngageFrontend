import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import moment from 'moment';

import { SlateService } from '@app/_services';

@Component({
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
	listings: any[];
	interval: any;
	isLoading: boolean;
	
	constructor(
		private snackBar: MatSnackBar,
		private slateService: SlateService,
		private title: Title
	) { }
	
	ngOnInit(): void {
		this.title.setTitle('Available Sessions | Engage Network');

		this.fetchData(true);
		this.interval = setInterval(() => {
			this.fetchData(false);
		}, 30000);
	}

	ngOnDestroy(): void {
		if (this.interval) {
			clearInterval(this.interval);
		}
	}
	
	fetchData(isInitial: boolean) {
		if (isInitial) this.isLoading = true;

		this.slateService.getAllListings()
		.pipe(first())
		.subscribe(listings => {
			listings.forEach(function(item: any) {
				item.startDateTime = moment(item.startDateTime).format('LT MMMM Do[,] YYYY');
				item.endDateTime = moment(item.endDateTime).format('LT MMMM Do[,] YYYY');

				if (!!item.accountDetails?.contentRatings?.overallContentRating) {
					item.accountDetails.contentRatings.overallContentRating = Math.round(item.accountDetails.contentRatings.overallContentRating);
				}
				if (!!item.accountDetails?.behaviourRating) {
					item.accountDetails.behaviourRating = Math.round(item.accountDetails.behaviourRating);
				}
			})

			this.listings = listings;
			if (isInitial) this.isLoading = false;
		});
	}

	registerSession(id: string) {
		const listing = this.listings.find(x => x._id === id);
		if (confirm(`Sign up for session?`)) {
			listing.isRegistering = true;
			this.slateService.register(id)
			.pipe(first())
			.subscribe({
				next: () => {
					// Display success message to user
					this.snackBar.open('Registration successful', 'Close', { duration: 10000 });
					this.listings = this.listings.filter(x => x._id !== id);
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
	