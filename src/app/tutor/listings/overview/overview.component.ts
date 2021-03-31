import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';

import { SlateService } from '@app/_services';

@Component({
	templateUrl: './overview.component.html',
	styleUrls: ['./overview.component.scss']
})

export class OverviewComponent implements OnInit {
	listings: any[];
	interval: any;
	
	constructor(
		private snackBar: MatSnackBar,
		private slateService: SlateService,
		private title: Title
	) { }
		
	ngOnInit() {
		this.title.setTitle('Listings Overview')
		
		this.fetchData();
		this.interval = setInterval(() => {
			this.fetchData();
		}, 60000);
	}

	fetchData() {
		this.slateService.getMyListings()
		.pipe(first())
		.subscribe(listings => {
			listings.forEach(function(item) {
				item.startDateTime = moment(item.startDateTime).format("LT MMMM Do[,] YYYY");
				item.endDateTime = moment(item.endDateTime).format("LT MMMM Do[,] YYYY");
			});
			
			this.listings = listings;
		});
	}
	
	deleteListing(id: string) {
		const listing = this.listings.find(x => x.id === id);
		if (confirm(`Are you sure you want to delete this listing? This action cannot be reversed.`)) {
			listing.isDeleting = true;
			this.slateService.delete(id)
			.pipe(first())
			.subscribe({
				next: () => {
					// Display success message to user
					this.snackBar.open('Listing deleted successfully', 'Close', { duration: 10000 });
					this.listings = this.listings.filter(x => x.id !== id);
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
	