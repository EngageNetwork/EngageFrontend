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
	
	constructor(
		private snackBar: MatSnackBar,
		private slateService: SlateService,
		private title: Title
	) { }
	
	ngOnInit() {
		this.title.setTitle('Past Sessions | Engage Network');

		this.fetchData();
	}
	
	fetchData() {
		this.slateService.getMyFinishedListings()
		.pipe(first())
		.subscribe(listings => {
			listings.forEach(function(item) {
				item.startDateTime = moment(item.startDateTime).format("LT MMMM Do[,] YYYY");
				item.endDateTime = moment(item.endDateTime).format("LT MMMM Do[,] YYYY");
			});
			
			this.listings = listings;
		});
	}
}
