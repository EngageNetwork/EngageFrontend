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
	sessions: any[];
	isLoading: boolean;
	
	constructor(
		private snackBar: MatSnackBar,
		private slateService: SlateService,
		private title: Title
		) { }
		
		ngOnInit(): void {
			this.title.setTitle('Past Sessions | Engage Network');
			
			this.fetchData(true);
		}

		fetchData(isInitial: boolean) {
			if (isInitial) this.isLoading = true;

			this.slateService.getMyFinishedSessions()
			.pipe(first())
			.subscribe(sessions => {
				sessions.forEach(function(item) {
					item.startDateTime = moment(item.startDateTime).format("LT MMMM Do[,] YYYY");
					item.endDateTime = moment(item.endDateTime).format("LT MMMM Do[,] YYYY");
				});

				this.sessions = sessions;
				if (isInitial) this.isLoading = false;
			});
		}
	}
	