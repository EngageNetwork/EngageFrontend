import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

import { SlateService } from '@app/_services';

@Component({ templateUrl: './overview.component.html' })

export class OverviewComponent implements OnInit {
	listings: any[];
	
	constructor(
		private slateService: SlateService,
		private title: Title
	) { }
		
	ngOnInit() {
		this.title.setTitle('My Listing Overview')
		
		this.slateService.getMyListings()
		.pipe(first())
		.subscribe(listings => this.listings = listings);
	}
	
	deleteListing(id: string) {
		const listing = this.listings.find(x => x.id === id);
		if (confirm(`Are you sure you want to delete this listing? This action cannot be reversed.`)) {
			listing.isDeleting = true;
			this.slateService.delete(id)
			.pipe(first())
			.subscribe(() => {
				this.listings = this.listings.filter(x => x.id !== id);
			});
		}
	}	
}
	