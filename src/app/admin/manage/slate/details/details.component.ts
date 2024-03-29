import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import moment from 'moment';

import { SlateService } from '@app/_services';

@Component({
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
	id: string;
	slate: any;
	isoCreated: string;
	isoUpdated: string;
	isoStartDateTime: string;
	isoEndDateTime: string;
	isoRegisterDate: string;
	isoDeleteDate: string;
	
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private snackBar: MatSnackBar,
		private slateService: SlateService,
		private title: Title
	) { }
	
	ngOnInit(): void {
		this.title.setTitle('Slate Details | Admin');
		
		this.id = this.route.snapshot.params['id'];
		
		this.slateService.getSlateById(this.id)
		.pipe(first())
		.subscribe(slate => {
			this.isoCreated = slate.createdAt;
			this.isoUpdated = slate.updatedAt;
			slate.createdAt = moment(slate.createdAt).format('LT MMMM Do[,] YYYY');
			slate.updatedAt = moment(slate.updatedAt).format('LT MMMM Do[,] YYYY');
			
			this.isoStartDateTime = slate.startDateTime;
			this.isoEndDateTime = slate.endDateTime;
			slate.startDateTime = moment(slate.startDateTime).format('LT MMMM Do[,] YYYY');
			slate.endDateTime = moment(slate.endDateTime).format('LT MMMM Do[,] YYYY');
			
			if (!!slate.registered) {
				this.isoRegisterDate = slate.registerDate;
				slate.registerDate = moment(slate.registerDate).format('LT MMMM Do[,] YYYY');
			}
			
			if (slate.deleted) {
				this.isoDeleteDate = slate.deleteDate;
				slate.deleteDate = moment(slate.deleteDate).format('LT MMMM Do[,] YYYY');
			};
			
			this.slate = slate;
		});
	}
}
