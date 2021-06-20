import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import moment from 'moment';

import { SlateService } from '@app/_services';

@Component({
	selector: 'app-overview',
	templateUrl: './overview.component.html',
	styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
	slates: any[];
	interval: any;
	
	constructor(
		private slateService: SlateService,
		private title: Title
	) {}
	
	ngOnInit(): void {
		this.title.setTitle('Slate Management | Admin');

		this.fetchData();
		this.interval = setInterval(() => {
			this.fetchData();
		}, 30000);
	}
	
	fetchData() {
		this.slateService.getAllSlates()
		.pipe(first())
		.subscribe(slates => {
			slates.forEach(function(item) {
				item.startDateTime = moment(item.startDateTime).format("LT MMMM Do[,] YYYY");
				item.endDateTime = moment(item.endDateTime).format("LT MMMM Do[,] YYYY");
			})

			this.slates = slates;
		});
	}
}
