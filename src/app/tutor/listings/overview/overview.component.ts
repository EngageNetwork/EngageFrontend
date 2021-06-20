import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import moment from 'moment';

import { SlateService } from '@app/_services';

@Component({
	templateUrl: './overview.component.html',
	styleUrls: ['./overview.component.scss']
})

export class OverviewComponent implements OnInit {
	listings: any[];
	interval: any;
	isLoading: boolean;
	
	constructor(
		private snackBar: MatSnackBar,
		private slateService: SlateService,
		private title: Title
	) { }
		
	ngOnInit() {
		this.title.setTitle('Active Listings | Engage Network');
		
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

		this.slateService.getMyListings()
		.pipe(first())
		.subscribe(listings => {
			listings.forEach(function(item) {
				item.startDateTime = moment(item.startDateTime).format("LT MMMM Do[,] YYYY");
				item.endDateTime = moment(item.endDateTime).format("LT MMMM Do[,] YYYY");
			});
			
			this.listings = listings;
			if (isInitial) this.isLoading = false;
		});
	}
	
	deleteListing(id: string) {
		const listing = this.listings.find(x => x._id === id);
		if (confirm(`Are you sure you want to delete this listing? This action cannot be reversed.`)) {
			listing.isDeleting = true;
			this.slateService.delete(id)
			.pipe(first())
			.subscribe({
				next: () => {
					// Display success message to user
					this.snackBar.open('Listing deleted successfully', 'Close', { duration: 10000 });
					this.listings = this.listings.filter(x => x._id !== id);
				},
				error: error => {
					// Display error to user
					this.snackBar.open(error, 'Close', { duration: 10000 });
					listing.isDeleting = false;
				}
			});
		}
	}
}
	