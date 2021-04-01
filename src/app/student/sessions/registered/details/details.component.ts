import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivationEnd } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';

import { SlateService } from '@app/_services';

@Component({
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
	id: string;
	session: any;
	
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private snackBar: MatSnackBar,
		private slateService: SlateService,
		private title: Title
	) { }
	
	ngOnInit(): void {
		this.title.setTitle('Session Details');
		
		this.id = this.route.snapshot.params['id'];
		
		this.slateService.getSessionById(this.id)
		.pipe(first())
		.subscribe(session => {
			session.startDateTime = moment(session.startDateTime).format('LT MMMM Do[,] YYYY');
			session.endDateTime = moment(session.endDateTime).format('LT MMMM Do[,] YYYY')

			this.session = session;
		});
	}
	
	markCompleted() {
		const session = this.session;
		if (!session.markedCompletedStudent) {
			if (confirm(`Mark session with ${session.accountDetails.firstName} ${session.accountDetails.lastName} as complete?`)) {
				session.isMarkingComplete = true;
				this.slateService.markComplete(this.id)
				.pipe(first())
				.subscribe({
					next: () => {
						// Display success message to user
						this.snackBar.open('Session marked as complete successfully', 'Close', { duration: 10000 });
						this.router.navigate(['../../'], { relativeTo: this.route });
					},
					error: error => {
						// Display error to user
						this.snackBar.open(error, 'Close', { duration: 10000 });
						session.isMarkingComplete = false;
					}
				})
			}
		}
		if (!!session.markedCompletedStudent) {
			if (confirm(`Unmark session with ${session.accountDetails.firstName} ${session.accountDetails.lastName} as complete?`)) {
				session.isMarkingComplete = true;
				this.slateService.markComplete(this.id)
				.pipe(first())
				.subscribe({
					next: () => {
						// Display success message to user
						this.snackBar.open('Session unmarked as complete', 'Close', { duration: 10000 });
						this.router.navigate(['../../'], { relativeTo: this.route });
					},
					error: error => {
						// Display error to user
						this.snackBar.open(error, 'Close', { duration: 10000 });
						session.isMarkingComplete = false;
					}
				})
			}
		}
	}

	cancelSession() {
		const session = this.session;
		if (confirm(`Cancel session with ${session.accountDetails.firstName} ${session.accountDetails.lastName}?`)) {
			session.isRemoving = true;
			this.slateService.cancel(this.id)
			.pipe(first())
			.subscribe({
				next: () => {
					// Display success message to user
					this.snackBar.open('Session cancelled successfully', 'Close', { duration: 10000 });
					this.router.navigate(['../../'], { relativeTo: this.route });
				},
				error: error => {
					// Display error to user
					this.snackBar.open(error, 'Close', { duration: 10000 });
					session.isRemoving = false;
				}
			})
		}
	}
}
