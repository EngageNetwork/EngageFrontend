import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';

import { AccountService, SlateService } from '@app/_services';

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
		private accountService: AccountService, // Ignore "unused" warnings
		private slateService: SlateService,
		private title: Title
		) { }
		
		ngOnInit(): void {
			this.title.setTitle('Slate Details');
			
			this.id = this.route.snapshot.params['id'];
			
			this.slateService.getSlateById(this.id)
			.pipe(first())
			.subscribe(slate => {
				this.isoCreated = slate.created;
				this.isoUpdated = slate.updated;
				slate.created = moment(slate.created).format('LT MMMM Do[,] YYYY');
				slate.updated = moment(slate.updated).format('LT MMMM Do[,] YYYY');
				
				this.isoStartDateTime = slate.startDateTime;
				this.isoEndDateTime = slate.endDateTime;
				slate.startDateTime = moment(slate.startDateTime).format('LT MMMM Do[,] YYYY');
				slate.endDateTime = moment(slate.endDateTime).format('LT MMMM Do[,] YYYY');
				
				this.isoRegisterDate = slate.registerDate;
				slate.registerDate = moment(slate.registerDate).format('LT MMMM Do[,] YYYY');

				this.isoDeleteDate = slate.deleteDate;
				slate.deleteDate = moment(slate.deleteDate).format('LT MMMM Do[,] YYYY');

				this.accountService.getById(slate.account)
				.pipe(first())
				.subscribe(account => {
					slate.tutorName = [account.firstName, account.lastName].join(' ');
				});
				
				if (!!slate.registered) {
					this.accountService.getById(slate.registered)
					.pipe(first())
					.subscribe(account => {
						slate.studentName = [account.firstName, account.lastName].join(' ');
					});
				}
				
				this.slate = slate;
				console.log(this.slate.markedCompletedTutor)
			});
		}
	}
	