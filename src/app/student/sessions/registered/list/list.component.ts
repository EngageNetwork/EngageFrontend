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
	sessions: any[];
	interval: any;
	
	constructor(
		private snackBar: MatSnackBar,
		private slateService: SlateService,
		private title: Title
		) { }
		
		ngOnInit(): void {
			this.title.setTitle('My Sessions | Engage Network');
			
			this.fetchData();
			this.interval = setInterval(() => {
				this.fetchData();
			}, 30000);
		}

		fetchData() {
			this.slateService.getMySessions()
			.pipe(first())
			.subscribe(sessions => {
				sessions.forEach(function(item) {
					item.startDateTime = moment(item.startDateTime).format("LT MMMM Do[,] YYYY");
					item.endDateTime = moment(item.endDateTime).format("LT MMMM Do[,] YYYY");
				});

				this.sessions = sessions;
			});
		}
		
		cancelSession(id: string) {
			const session = this.sessions.find(x => x._id === id);
			if (confirm(`Cancel session with ${session.accountDetails.firstName} ${session.accountDetails.lastName}?`)) {
				session.isRemoving = true;
				this.slateService.cancel(id)
				.pipe(first())
				.subscribe({
					next: () => {
						// Display success message to user
						this.snackBar.open('Session cancelled successfully', 'Close', { duration: 10000 });
						this.sessions = this.sessions.filter(x => x._id !== id);
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
	